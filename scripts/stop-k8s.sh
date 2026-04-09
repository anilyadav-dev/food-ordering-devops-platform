#!/bin/bash

set -e

echo "======================================"
echo "Stopping Food Ordering App (Kubernetes)"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

NGROK_PID_FILE="$PROJECT_ROOT/ngrok.pid"

echo ""
echo "1. Deleting Kubernetes app resources..."
kubectl delete -f infra/k8s/ --ignore-not-found || true
echo "✅ Kubernetes app resources deleted"

echo ""
echo "2. Stopping Minikube..."
minikube stop || true
echo "✅ Minikube stopped"

echo ""
echo "3. Stopping Jenkins container..."
if docker ps -a --format '{{.Names}}' | grep -q '^jenkins$'; then
  docker rm -f jenkins >/dev/null 2>&1 || true
  echo "✅ Jenkins removed"
else
  echo "ℹ️ Jenkins not found"
fi

echo ""
echo "4. Stopping ngrok..."
if [ -f "$NGROK_PID_FILE" ]; then
  NGROK_PID=$(cat "$NGROK_PID_FILE")

  if ps -p "$NGROK_PID" >/dev/null 2>&1; then
    kill "$NGROK_PID" || true
    echo "✅ ngrok stopped (PID: $NGROK_PID)"
  else
    echo "ℹ️ ngrok process not running"
  fi

  rm -f "$NGROK_PID_FILE"
else
  echo "ℹ️ No ngrok PID file found"
fi

echo ""
echo "5. Final cleanup check..."

echo "Minikube status:"
minikube status || true

echo ""
echo "======================================"
echo "Kubernetes app stopped successfully ✅"
echo "======================================"