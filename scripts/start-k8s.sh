#!/bin/bash

set -e

echo "======================================"
echo "Starting Food Ordering App (Kubernetes)"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

NGROK_LOG="$PROJECT_ROOT/ngrok.log"
NGROK_PID_FILE="$PROJECT_ROOT/ngrok.pid"
TUNNEL_LOG="$PROJECT_ROOT/minikube-tunnel.log"
TUNNEL_PID_FILE="$PROJECT_ROOT/minikube-tunnel.pid"

AWS_REGION="us-west-1"
AWS_ACCOUNT_ID="673436240700"
ECR_SECRET_NAME="ecr-secret"
ECR_SERVER="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
JENKINS_IMAGE="jenkins/jenkins:lts"

echo ""
echo "1. Checking required tools..."
for cmd in docker kubectl minikube ngrok curl aws; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "❌ $cmd is not installed. Please install it first."
    exit 1
  fi
done
echo "✅ Required tools found"

echo ""
echo "2. Checking Docker..."
if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker Desktop first."
  exit 1
fi
echo "✅ Docker is running"

echo ""
echo "3. Checking AWS access..."
if ! aws sts get-caller-identity >/dev/null 2>&1; then
  echo "❌ AWS CLI is not configured or credentials are invalid."
  echo "Run: aws configure"
  exit 1
fi
echo "✅ AWS CLI is working"

echo ""
echo "4. Starting Minikube..."
if minikube status | grep -q "host: Running"; then
  echo "✅ Minikube already running"
else
  minikube start
  echo "✅ Minikube started"
fi

echo ""
echo "5. Enabling NGINX ingress addon..."
minikube addons enable ingress || true
echo "✅ Ingress enabled"

echo ""
echo "6. Waiting for ingress controller to be ready..."
kubectl wait \
  --namespace ingress-nginx \
  --for=condition=Ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=180s

sleep 10
echo "✅ Ingress controller is ready"

echo ""
echo "7. Starting Minikube tunnel..."

if [ -f "$TUNNEL_PID_FILE" ]; then
  OLD_TUNNEL_PID=$(cat "$TUNNEL_PID_FILE")
  if ps -p "$OLD_TUNNEL_PID" >/dev/null 2>&1; then
    echo "ℹ️ Stopping old Minikube tunnel process (PID: $OLD_TUNNEL_PID)"
    kill "$OLD_TUNNEL_PID" || true
    sleep 2
  fi
  rm -f "$TUNNEL_PID_FILE"
fi

nohup minikube tunnel > "$TUNNEL_LOG" 2>&1 &
TUNNEL_PID=$!
echo "$TUNNEL_PID" > "$TUNNEL_PID_FILE"
sleep 10
echo "✅ Minikube tunnel started in background (PID: $TUNNEL_PID)"

echo ""
echo "8. Refreshing ECR pull secret to avoid ImagePullBackOff..."
kubectl delete secret "$ECR_SECRET_NAME" --ignore-not-found >/dev/null 2>&1 || true

kubectl create secret docker-registry "$ECR_SECRET_NAME" \
  --docker-server="$ECR_SERVER" \
  --docker-username=AWS \
  --docker-password="$(aws ecr get-login-password --region "$AWS_REGION")"

echo "✅ ECR secret refreshed: $ECR_SECRET_NAME"

echo ""
echo "9. Applying Kubernetes manifests..."
if kubectl apply -f infra/k8s/; then
  echo "✅ Kubernetes resources applied"
else
  echo "⚠️ First apply failed, waiting a bit and retrying once..."
  sleep 15
  kubectl apply -f infra/k8s/
  echo "✅ Kubernetes resources applied on retry"
fi

echo ""
echo "10. Restarting backend and frontend deployments..."
kubectl rollout restart deployment backend
kubectl rollout restart deployment frontend
echo "✅ Deployments restarted"

echo ""
echo "11. Waiting for backend and frontend rollout..."
kubectl rollout status deployment/backend --timeout=180s || true
kubectl rollout status deployment/frontend --timeout=180s || true

echo ""
echo "12. Checking Kubernetes status..."
kubectl get pods
echo ""
kubectl get svc
echo ""
kubectl get ingress

echo ""
echo "13. Refreshing Jenkins kubeconfig..."
bash ./scripts/refresh-jenkins-kubeconfig.sh

echo ""
echo "14. Pulling Jenkins image..."
docker pull "$JENKINS_IMAGE"
echo "✅ Jenkins image ready"

echo ""
echo "15. Starting Jenkins container..."
if docker ps -a --format '{{.Names}}' | grep -q '^jenkins$'; then
  echo "ℹ️ Recreating Jenkins container to refresh Kubernetes access..."
  docker rm -f jenkins >/dev/null 2>&1 || true
fi

docker run -d \
  --name jenkins \
  -p 8081:8080 \
  -p 50000:50000 \
  --add-host=host.docker.internal:host-gateway \
  -e KUBECONFIG=/var/jenkins_home/.kube/config \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$PROJECT_ROOT/.jenkins/.kube:/var/jenkins_home/.kube" \
  "$JENKINS_IMAGE"

echo "✅ Jenkins container created and started"

echo ""
echo "16. Waiting for Jenkins to be ready..."
for i in {1..30}; do
  if curl -s http://localhost:8081 >/dev/null 2>&1; then
    echo "✅ Jenkins is reachable"
    break
  fi
  echo "⏳ Waiting for Jenkins... ($i/30)"
  sleep 5
done

echo ""
echo "17. Ensuring kubectl exists inside Jenkins..."
if docker exec jenkins sh -c 'command -v kubectl >/dev/null 2>&1'; then
  echo "✅ kubectl already exists inside Jenkins"
else
  echo "ℹ️ kubectl not found. Installing inside Jenkins container..."
  docker exec -u root jenkins bash -lc '
    apt-get update &&
    apt-get install -y curl &&
    curl -fsSL https://dl.k8s.io/release/stable.txt -o /tmp/k8s_version &&
    K8S_VERSION=$(cat /tmp/k8s_version) &&
    curl -fsSL "https://dl.k8s.io/release/${K8S_VERSION}/bin/linux/amd64/kubectl" -o /usr/local/bin/kubectl &&
    chmod +x /usr/local/bin/kubectl &&
    rm -f /tmp/k8s_version
  '
  echo "✅ kubectl installed inside Jenkins"
fi

echo ""
echo "18. Starting ngrok for Jenkins on port 8081..."

if [ -f "$NGROK_PID_FILE" ]; then
  OLD_PID=$(cat "$NGROK_PID_FILE")
  if ps -p "$OLD_PID" >/dev/null 2>&1; then
    echo "ℹ️ Stopping old ngrok process (PID: $OLD_PID)"
    kill "$OLD_PID" || true
    sleep 2
  fi
  rm -f "$NGROK_PID_FILE"
fi

nohup ngrok http 8081 > "$NGROK_LOG" 2>&1 &
NGROK_PID=$!
echo "$NGROK_PID" > "$NGROK_PID_FILE"
echo "✅ ngrok started in background (PID: $NGROK_PID)"

echo ""
echo "19. Waiting for ngrok public URL..."
NGROK_URL=""
for i in {1..20}; do
  NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | sed -n 's/.*"public_url":"\(https:[^"]*\)".*/\1/p' | head -n 1)
  if [ -n "$NGROK_URL" ]; then
    break
  fi
  echo "⏳ Waiting for ngrok URL... ($i/20)"
  sleep 2
done

echo ""
echo "20. Verifying Jenkins cluster access..."
if docker exec jenkins kubectl get nodes >/dev/null 2>&1; then
  echo "✅ Jenkins can reach Kubernetes"
else
  echo "⚠️ Jenkins cluster access check failed"
fi

echo ""
echo "21. Final access info"
echo "--------------------------------------"
echo "K8s frontend:         http://foodapp.local"
echo "K8s backend:          http://foodapp.local/api"
echo "Mongo (K8s):          kubectl port-forward service/mongo 27018:27017"
echo "Compass (K8s):        mongodb://localhost:27018"
echo "Jenkins:              http://localhost:8081"
echo ""
echo "Hosts file entry needed:"
echo "127.0.0.1 foodapp.local"
echo ""

if [ -n "$NGROK_URL" ]; then
  echo "✅ ngrok public URL:   $NGROK_URL"
  echo "✅ Jenkins webhook:    $NGROK_URL/github-webhook/"
else
  echo "⚠️ Could not fetch ngrok public URL automatically."
  echo "Check manually with: http://127.0.0.1:4040"
  echo "Or run: cat $NGROK_LOG"
fi

echo ""
echo "Tunnel log file:      $TUNNEL_LOG"
echo "ngrok log file:       $NGROK_LOG"

echo ""
echo "Final pod status:"
kubectl get pods

echo ""
echo "Done. Kubernetes app startup complete."