#!/bin/bash

set -e

echo "======================================"
echo "Starting Food Ordering App (Docker)"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

NGROK_LOG="$PROJECT_ROOT/ngrok.log"
NGROK_PID_FILE="$PROJECT_ROOT/ngrok.pid"

echo ""
echo "1. Checking required tools..."
for cmd in docker docker-compose ngrok curl; do
  if ! command -v "${cmd%%-*}" >/dev/null 2>&1 && ! command -v "$cmd" >/dev/null 2>&1; then
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
echo "3. Starting Docker app containers..."
docker compose up -d --build
echo "✅ Mongo, Backend, Frontend, NGINX started"

echo ""
echo "4. Checking Docker container status..."
docker ps

echo ""
echo "5. Starting Jenkins container..."
if docker ps -a --format '{{.Names}}' | grep -q '^jenkins$'; then
  if docker ps --format '{{.Names}}' | grep -q '^jenkins$'; then
    echo "✅ Jenkins already running"
  else
    docker start jenkins
    echo "✅ Jenkins container started"
  fi
else
  docker run -d \
    --name jenkins \
    -p 8081:8080 \
    -p 50000:50000 \
    jenkins/jenkins:lts
  echo "✅ Jenkins container created and started"
fi

echo ""
echo "6. Waiting for Jenkins to be ready..."
for i in {1..30}; do
  if curl -s http://localhost:8081 >/dev/null 2>&1; then
    echo "✅ Jenkins is reachable"
    break
  fi
  echo "⏳ Waiting for Jenkins... ($i/30)"
  sleep 5
done

echo ""
echo "7. Starting ngrok for Jenkins on port 8081..."

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
echo "8. Waiting for ngrok public URL..."
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
echo "9. Final access info"
echo "--------------------------------------"
echo "Docker app via NGINX: http://localhost"
echo "Frontend direct:      http://localhost:5173"
echo "Backend direct:       http://localhost:8080"
echo "Mongo (Docker):       mongodb://localhost:27017"
echo "Jenkins:              http://localhost:8081"

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
echo "Done. Docker app startup complete."