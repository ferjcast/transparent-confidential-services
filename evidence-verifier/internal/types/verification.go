package types

import "time"

// VerificationReport contains details about a single verification attempt.
type VerificationReport struct {
	IsVerified bool   `json:"isVerified"`
	Message    string `json:"message"`

	// Optional fields for workload verification
	GoldenImageDigest   string `json:"goldenImageDigest,omitempty"`
	ProvidedImageDigest string `json:"providedImageDigest,omitempty"`
	ReferenceImage      string `json:"referenceImage,omitempty"`

	// Optional fields for infrastructure verification
	VerifiedBootDiskSourceImage   string `json:"verifiedBootDiskSourceImage,omitempty"`
	VerifiedBootDiskSourceImageID string `json:"verifiedBootDiskSourceImageID,omitempty"`

	Timestamp time.Time `json:"timestamp"`
}

// Verification is an internal representation of the verification result.
type Verification struct {
	IsVerified                    bool
	VerificationMessage           string
	VerifiedImage                 string
	VerifiedWorkload              ContainerEvidence
	VerifiedBootDiskSourceImage   string
	VerifiedBootDiskSourceImageID string
}
