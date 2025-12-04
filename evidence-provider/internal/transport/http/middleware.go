package http

import (
	"github.com/rs/cors"
	"net/http"
)

func WithCORS(h http.Handler) http.Handler {
	c := cors.New(cors.Options{
		// TODO: Allow all origins?
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS", "DELETE", "PUT"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})
	return c.Handler(h)
}
