package types

import "time"

// BaselineManifest represents the golden reference values for a Confidential VM.
type BaselineManifest struct {
	// Metadata
	Version   string    `json:"version"`
	CreatedAt time.Time `json:"createdAt"`
	Author    string    `json:"author"`

	// Infrastructure-specific fields
	SourceImage   string `json:"sourceImage"`
	SourceImageID string `json:"sourceImageId"`

	// TDX-specific fields
	MrTd         string `json:"mrTd"`
	MrSeam       string `json:"mrSeam"`
	TdAttributes string `json:"tdAttributes"`
	Xfam         string `json:"xfam"`
	TeeTcbSvn    string `json:"teeTcbSvn"`
}
