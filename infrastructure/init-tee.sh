#!/bin/bash
set -euxo pipefail

# Install Docker (once)
if ! command -v docker >/dev/null 2>&1; then
    echo ">>> Installing Docker..."
    apt-get update
    apt-get install -y docker.io
    systemctl enable docker
else
    echo ">>> Docker already installed"
fi

# Install Go (once)
if [ ! -d /usr/local/go ]; then
    echo ">>> Installing Go..."
    curl -sSL https://go.dev/dl/go1.21.5.linux-amd64.tar.gz -o /tmp/go.tar.gz
    tar -C /usr/local -xzf /tmp/go.tar.gz
    echo 'export PATH=$PATH:/usr/local/go/bin' >/etc/profile.d/go.sh
    chmod +x /etc/profile.d/go.sh
else
    echo ">>> Go already present"
fi

# Write the llm-core systemd unit
cat <<'EOF' >/etc/systemd/system/llm-core.service
[Unit]
Description=LLM-Core Container
After=docker.service
Requires=docker.service

[Service]
Type=simple
TimeoutStartSec=300

# 1) Remove any prior llm-core container
ExecStartPre=/bin/sh -c '/usr/bin/docker rm -f llm-core || true'

# 2) Pull the latest image (full on first boot, delta thereafter)
ExecStartPre=/bin/sh -c '/usr/bin/docker pull sanctuairy/llm-core:latest'

# 3) Prune out all unused images (old layers)
ExecStartPre=/bin/sh -c '/usr/bin/docker image prune -f'

# 4) Run a clean container, auto-removed on exit
ExecStart=/usr/bin/docker run --rm \
  --name llm-core \
  -e OLLAMA_HOST=0.0.0.0 \
  -e PORT=11434 \
  -p 11434:11434 \
  sanctuairy/llm-core:latest

# Ensure no stray container after VM shutdown
ExecStopPost=/bin/sh -c '/usr/bin/docker rm -f llm-core || true'

Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

# Enable & start the service
systemctl daemon-reload
systemctl enable llm-core.service
systemctl restart llm-core.service

echo ">>> init-reference-tee.sh completed successfully"
