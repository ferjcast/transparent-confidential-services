package challenge

import (
	"encoding/base64"
	"errors"
)

// DecodeAndValidate decodes a base64-encoded challenge string and validates its length.
// It ensures the decoded challenge is exactly 64 bytes and returns it as a fixed-length array.
//
// Parameters:
//   - challenge: A string containing the base64-encoded challenge.
//
// Returns:
//   - [64]byte: A fixed-length array containing the decoded challenge.
//   - error: An error if the decoding fails or the challenge is not 64 bytes.
func DecodeAndValidate(challenge string) ([64]byte, error) {
	decodedChallenge, err := base64.StdEncoding.DecodeString(challenge)
	if err != nil {
		return [64]byte{}, errors.New("challenge must be a valid base64 string")
	}

	if len(decodedChallenge) != 64 {
		return [64]byte{}, errors.New("challenge must be exactly 64 bytes")
	}

	var userData [64]byte
	copy(userData[:], decodedChallenge)
	return userData, nil
}
