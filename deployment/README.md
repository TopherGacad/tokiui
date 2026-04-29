# VPS Deployment

## Server requirements

- Ubuntu 22.04+
- Node.js 20 (via nvm)
- pnpm 9+
- Caddy 2

## 1. Install Caddy

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy
```

## 2. Create site directory

```bash
sudo mkdir -p /var/www/tokiui
sudo chown $USER:$USER /var/www/tokiui
cd /var/www/tokiui
git clone https://github.com/USERNAME/tokiui.git .
pnpm install
pnpm --filter @tokiui/docs build
```

## 3. Configure Caddy

Copy `deployment/Caddyfile.example` to `/etc/caddy/Caddyfile`, update the domain, then:

```bash
sudo systemctl reload caddy
```

Caddy automatically provisions HTTPS via Let's Encrypt.

## 4. Add GitHub Secrets

In your GitHub repo: **Settings → Secrets and variables → Actions**

| Secret | Value |
|---|---|
| `SERVER_HOST` | Your VPS IP or domain |
| `SERVER_USER` | SSH user (e.g., `ubuntu`) |
| `SSH_PRIVATE_KEY` | Contents of your private SSH key |
| `NPM_TOKEN` | npm access token for publishing |

Generate an SSH key pair (`ssh-keygen -t ed25519`), add the public key to `~/.ssh/authorized_keys` on the server, and paste the private key as the `SSH_PRIVATE_KEY` secret.
