package attestationquote

import (
	"encoding/json"
	"fmt"
	"github.com/MrEttore/Attestify/evidenceverifier/internal/service/challenge"
	"github.com/MrEttore/Attestify/evidenceverifier/internal/service/manifest"
	"github.com/MrEttore/Attestify/evidenceverifier/internal/types"

	"github.com/google/go-tdx-guest/proto/tdx"
	"github.com/google/go-tdx-guest/verify"
	"google.golang.org/protobuf/encoding/protojson"
)

// Verify parses the given JSON-encoded TDX quote and runs
// the attestation checks (including collateral fetch and revocation).
//
// It returns a VerificationResult indicating pass/fail.
func Verify(issuedChallenge, manifestUrl string, evidenceQuote types.Quote) (types.VerificationReport, error) {
	var quote tdx.QuoteV4
	quoteBytes, _ := json.Marshal(evidenceQuote)
	quoteStr := string(quoteBytes)

	if err := protojson.Unmarshal([]byte(quoteStr), &quote); err != nil {
		return types.VerificationReport{}, fmt.Errorf("failed to parse attestation quote: %w", err)
	}

	// 1. Verify the challenge issued by the Relying Party.
	err := challenge.Verify(issuedChallenge, evidenceQuote.TdQuoteBody.ReportData)
	if err != nil {
		return types.VerificationReport{
			IsVerified: false,
			Message:    err.Error(),
		}, nil
	}

	// 2. Verify the Attester's tdx quote evidence.
	opts := verify.Options{
		GetCollateral:    true,
		CheckRevocations: true,
	}

	if err := verify.TdxQuote(&quote, &opts); err != nil {
		return types.VerificationReport{
			IsVerified: false,
			Message:    fmt.Sprintf("failed to verify attestation quote: %v", err),
		}, nil
	}

	// 3. Verify the tdx quote evidence against the Reference Value Provider's manifest.
	if err := manifest.VerifyQuoteValues(manifestUrl, evidenceQuote.TdQuoteBody); err != nil {
		return types.VerificationReport{
			IsVerified: false,
			Message:    fmt.Sprintf("manifest verification failed: %v", err),
		}, nil
	}

	return types.VerificationReport{
		IsVerified: true,
		Message:    "tdx quote successfully verified",
	}, nil
}
