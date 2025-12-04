package handler

import (
	"encoding/json"
	"github.com/MrEttore/Attestify/evidenceprovider/internal/service/attestationquote"
	"github.com/MrEttore/Attestify/evidenceprovider/internal/service/challenge"
	"github.com/MrEttore/Attestify/evidenceprovider/internal/types"
	"github.com/MrEttore/Attestify/evidenceprovider/internal/util"
	"net/http"
)

// GetTdxQuote handles HTTP requests to fetch an Intel TDX attestation quote.
// It validates the incoming request, decodes the challenge, fetches the attestation evidence,
// and returns the quote data in the response.
//
// Parameters:
//   - w: http.ResponseWriter used to send the HTTP response.
//   - r: *http.Request containing the incoming HTTP request.
//
// Workflow:
//  1. Parse and validate the request body.
//  2. Decode and validate the base64-encoded challenge.
//  3. Fetch the attestation evidence using the decoded challenge.
//  4. Parse the evidence into a structured format.
//  5. Send the response with the attestation quote.
func GetTdxQuote(w http.ResponseWriter, r *http.Request) {

	// ## REQUEST ##
	var reqBody types.GetTdxQuoteRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		util.RespondWithError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	// ### BUSINESS LOGIC ###
	decodedChallenge, err := challenge.DecodeAndValidate(reqBody.Challenge)
	if err != nil {
		util.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	quoteStr, err := attestationquote.FetchEvidence(decodedChallenge)
	if err != nil {
		util.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	var quoteData map[string]any
	err = json.Unmarshal([]byte(quoteStr), &quoteData)
	if err != nil {
		util.RespondWithError(w, http.StatusBadRequest, "Failed to parse quote data")
		return
	}

	// ## RESPONSE ##
	resBody := types.GetTdxQuoteResponse{
		Status: "success",
		Data:   types.AttestationQuoteEvidence{Quote: quoteData},
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resBody); err != nil {
		util.RespondWithError(w, http.StatusInternalServerError, err.Error())
	}
}
