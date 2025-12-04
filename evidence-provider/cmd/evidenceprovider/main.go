package main

import (
	"fmt"
	"log"
	"net/http"

	transport "github.com/MrEttore/Attestify/evidenceprovider/internal/transport/http"
)

func main() {
	router := transport.NewRouter()
	handler := transport.WithCORS(router)

	go func() {
		log.Println("📊 pprof at :6060/debug/pprof/")
		_ = http.ListenAndServe(":6060", nil)
	}()

	port := 8080
	log.Printf("Evidence Provider running on :%d", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), handler); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
