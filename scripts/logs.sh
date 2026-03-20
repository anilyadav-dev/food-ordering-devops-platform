#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./scripts/logs.sh <container_name>"
  exit 1
fi

echo "Showing logs for container: $1"
docker logs -f "$1"
