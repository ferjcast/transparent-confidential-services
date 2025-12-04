# Nginx Sticky Sessions Demo

A demo project comparing two nginx-only approaches to sticky session handling:

1. **IP Hash Sticky** - requests from same IP always go to same server
2. **Cookie-Based Sticky** - nginx sets/reads cookie to route to same server

## Project Structure

```
.
├── app/
│   ├── app.py                 # Flask application
│   ├── Dockerfile
│   └── requirements.txt
├── nginx/
│   ├── nginx.conf             # Nginx config with ip_hash
│   └── nginx-cookie.conf      # Nginx config with cookie-based routing
├── docker-compose.yml         # Option 1: ip_hash sticky sessions
├── docker-compose.cookie.yml  # Option 2: Cookie-based sticky sessions
└── README.md
```

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `/` | Returns server ID, visit count, servers seen |
| `/health` | Health check endpoint |
| `/reset` | Clears the session |

---

## Option 1: IP Hash Sticky Sessions

Uses nginx `ip_hash` directive to route requests from the same client IP to the same backend server.

### Start

```bash
docker-compose up --build
```

### Test

```bash
rm -f cookies.txt
for i in {1..5}; do
  curl -s -b cookies.txt -c cookies.txt http://localhost:8080 | jq -r '"server: \(.server_id) | visits: \(.visit_count) | seen: \(.servers_seen | join(","))"'
done
```

### Expected Output

```
server: server-1 | visits: 1 | seen: server-1
server: server-1 | visits: 2 | seen: server-1
server: server-1 | visits: 3 | seen: server-1
server: server-1 | visits: 4 | seen: server-1
server: server-1 | visits: 5 | seen: server-1
```

### Stop

```bash
docker-compose down
```

---

## Option 2: Cookie-Based Sticky Sessions

Uses nginx `map` directive to read a `SERVERID` cookie and route to the matching server. Nginx sets the cookie on first request.

**Privacy benefit:** No IP tracking. Routing is based purely on a cookie value.

### Start

```bash
docker-compose -f docker-compose.cookie.yml up --build
```

### Test

```bash
rm -f cookies.txt
for i in {1..5}; do
  curl -s -b cookies.txt -c cookies.txt http://localhost:8080 | jq -r '"server: \(.server_id) | visits: \(.visit_count) | seen: \(.servers_seen | join(","))"'
done
```

### Expected Output

```
server: server-2 | visits: 1 | seen: server-2
server: server-2 | visits: 2 | seen: server-2
server: server-2 | visits: 3 | seen: server-2
server: server-2 | visits: 4 | seen: server-2
server: server-2 | visits: 5 | seen: server-2
```

### Check the cookie

```bash
cat cookies.txt | grep SERVERID
```

You'll see something like `SERVERID=flask2` - this is what nginx uses to route.

### Stop

```bash
docker-compose -f docker-compose.cookie.yml down
```

---

## Comparison

| Aspect | ip_hash Sticky | Cookie Sticky |
|--------|----------------|---------------|
| Routing Based On | Client IP | Cookie value |
| Privacy | IP tracked by nginx | No IP tracking |
| First Request | Deterministic (IP hash) | Round-robin |
| Complexity | Simple | Medium |
| Use Case | Simple apps, internal tools | Privacy-focused apps |

---

## How It Works

### IP Hash Sticky Sessions
```
Client (IP: 1.2.3.4)  →  Nginx (ip_hash)  →  Always Server-1
                                              └── Local Session Store
```

### Cookie-Based Sticky Sessions
```
First request:
  Client  ──────────────────→  Nginx (round-robin)  →  Server-2
          ←─ Set-Cookie: SERVERID=flask2 ─────────────┘

Subsequent requests:
  Client  ── Cookie: SERVERID=flask2 ──→  Nginx (reads cookie)  →  Server-2
                                              └── Local Session Store
```

---

## Configuration

### Adding More Servers

1. Add new service in the docker-compose file:

```yaml
  flask4:
    build: ./app
    environment:
      - SERVER_ID=server-4
      - SECRET_KEY=shared-secret-key-123
    expose:
      - "5000"
    networks:
      - backend
```

2. Add server to the nginx config:

**For ip_hash (`nginx/nginx.conf`):**
```nginx
upstream flask_backend {
    ip_hash;
    server flask1:5000;
    server flask2:5000;
    server flask3:5000;
    server flask4:5000;  # new server
}
```

**For cookie-based (`nginx/nginx-cookie.conf`):**
```nginx
# Add to the map directives
map $cookie_SERVERID $backend_server {
    default         "";
    "flask1"        flask1:5000;
    "flask2"        flask2:5000;
    "flask3"        flask3:5000;
    "flask4"        flask4:5000;  # new server
}

map $upstream_addr $server_name_cookie {
    ~^flask1:5000     "flask1";
    ~^flask2:5000     "flask2";
    ~^flask3:5000     "flask3";
    ~^flask4:5000     "flask4";  # new server
    default           "";
}

upstream flask_backend {
    server flask1:5000;
    server flask2:5000;
    server flask3:5000;
    server flask4:5000;  # new server
}
```

3. Update nginx dependency in docker-compose:

```yaml
  nginx:
    depends_on:
      - flask1
      - flask2
      - flask3
      - flask4  # add here too
```

---

### Nginx Load Balancing Options

For the ip_hash setup, you can switch strategies in `nginx/nginx.conf`:

```nginx
upstream flask_backend {
    # Pick ONE of these strategies:

    # 1. Sticky sessions (same IP → same server)
    ip_hash;

    # 2. Round-robin (default, no directive needed)
    # requests cycle through servers in order

    # 3. Least connections (send to least busy server)
    least_conn;

    # 4. Weighted (server1 gets 3x traffic)
    # server flask1:5000 weight=3;
    # server flask2:5000 weight=1;

    server flask1:5000;
    server flask2:5000;
    server flask3:5000;
}
```

---

### Environment Variables

| Variable | Description |
|----------|-------------|
| `SERVER_ID` | Identifier shown in API responses |
| `SECRET_KEY` | Flask session signing key (must match across servers) |
