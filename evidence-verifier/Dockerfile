# Build stage
FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN go build -o evidenceverifier ./cmd/evidenceverifier

# Final image
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/evidenceverifier .

EXPOSE 8081

CMD ["./evidenceverifier"]