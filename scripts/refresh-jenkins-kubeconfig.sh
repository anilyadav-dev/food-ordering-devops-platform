#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

mkdir -p .jenkins/.kube

kubectl config view --raw --minify --flatten > .jenkins/.kube/config

# Replace localhost with docker host
sed -i '' 's#https://127.0.0.1:#https://host.docker.internal:#g' .jenkins/.kube/config
sed -i '' 's#https://localhost:#https://host.docker.internal:#g' .jenkins/.kube/config

# 🚨 Disable TLS verification (important fix)
sed -i '' 's/certificate-authority-data:/#certificate-authority-data:/g' .jenkins/.kube/config
sed -i '' '/server:/a\
    insecure-skip-tls-verify: true
' .jenkins/.kube/config

echo "✅ Jenkins kubeconfig fixed (TLS disabled)"