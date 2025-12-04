package util

import (
	"encoding/json"
	"github.com/MrEttore/Attestify/evidenceprovider/internal/types"
	"net/http"
)

func RespondWithError(w http.ResponseWriter, code int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(types.ErrorResponse{
		Status:  "error",
		Message: message,
	})
}
