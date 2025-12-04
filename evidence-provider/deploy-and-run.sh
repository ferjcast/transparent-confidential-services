#!/usr/bin/env bash
set -euo pipefail

# Load env vars
if [[ -f .deploy.env ]]; then
  source .deploy.env
else
  echo "❌ .deploy.env not found!" >&2
  exit 1
fi

# Set gcloud zone
if [[ -n "${REMOTE_ZONE:-}" ]]; then
  echo "🌍 Setting gcloud compute zone to $REMOTE_ZONE..."
  gcloud config set compute/zone "$REMOTE_ZONE" >/dev/null
fi

# Config
REMOTE_DIR="/home/$REMOTE_USER"
BIN_NAME="evidenceprovider"

# Cross‐compile for Linux/amd64
echo "🛠️ Building $BIN_NAME for linux/amd64..."
env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 \
    go build -ldflags="-s -w" \
    -o "$BIN_NAME" \
    cmd/evidenceprovider/main.go
echo "✅  Build complete: $BIN_NAME"

# Remote cleanup: stop old, delete old
echo "🛑 Stopping any running evidence provider on port 8080 and removing old binary..."
gcloud compute ssh "$REMOTE_HOST" --command="
  set -e
  # kill any process listening on 8080
  sudo lsof -ti:8080 | xargs -r sudo kill -9

  # remove old binary if it exists
  rm -f '$REMOTE_DIR/$BIN_NAME'
"
echo "✅  Remote cleanup complete."

# Copy to remote
echo "📑 Copying new $BIN_NAME to $REMOTE_HOST:$REMOTE_DIR..."
gcloud compute scp "$BIN_NAME" "$REMOTE_HOST":"$REMOTE_DIR/$BIN_NAME"
echo "✅  Copy finished."

# Restart remote process
echo "🔄 Starting new evidence provider..."
gcloud compute ssh "$REMOTE_HOST" --command="
  set -e
  chmod +x '$REMOTE_DIR/$BIN_NAME'
  sudo nohup '$REMOTE_DIR/$BIN_NAME' > '$REMOTE_DIR/out.log' 2>&1 &
"
echo "✅  Remote restart complete."
echo "🎉 Deployment complete!"
