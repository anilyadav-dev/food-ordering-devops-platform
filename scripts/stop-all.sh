#!/bin/bash

set -e

echo "======================================"
echo "Stopping Everything"
echo "======================================"

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

bash ./scripts/stop-docker.sh || true
echo ""
bash ./scripts/stop-k8s.sh || true

echo ""
echo "======================================"
echo "Everything stopped successfully ✅"
echo "======================================"