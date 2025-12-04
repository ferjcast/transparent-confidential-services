package challenge

import "fmt"

// Verify checks if the issued challenge matches the reported data to ensure the freshness of the attestation request.
//
// issuedChallenge: the challenge that was issued by the Relying Party to the Attester.
// reportData: the data reported by the Attester in response to the challenge.
func Verify(issuedChallenge, reportData string) error {
	if issuedChallenge == reportData {
		return nil
	}

	return fmt.Errorf("challenge mismatch: the reportData field does not match the issued challenge (nonce) by the Relying Party. The provided evidence is not valid for attestation")
}
