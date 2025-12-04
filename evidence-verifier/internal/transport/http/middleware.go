package http

import (
	"github.com/rs/cors"
	"net/http"
)

func WithCORS(h http.Handler) http.Handler {
	return cors.AllowAll().Handler(h)
}
