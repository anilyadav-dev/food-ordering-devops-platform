#!/bin/bash

echo "Checking local development tools..."

check_command() {
  if command -v "$1" >/dev/null 2>&1; then
    echo "✅ $1 is installed"
  else
    echo "❌ $1 is NOT installed"
  fi
}

check_command docker
check_command node
check_command npm
check_command kubectl
check_command kind

echo ""
echo "Setup check complete."
