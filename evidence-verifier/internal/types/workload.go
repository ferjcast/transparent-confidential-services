package types

import "time"

// ### Request Types ###

// VerifyWorkloadsRequest represents the JSON request payload for verifying workloads.
// It contains a reference image and the evidence gathered from running containers and local images.
//
//	{
//	  "referenceImage": {
//	     "namespace": "sanctuairy",
//	      "repository": "llm-core",
//	      "tag": "latest",
//	  }
//	  "evidence": {...}
//	}
type VerifyWorkloadsRequest struct {
	IssuedChallenge string           `json:"issuedChallenge" validate:"required"`
	ReferenceImage  ReferenceImage   `json:"referenceImage" validate:"required"`
	Evidence        WorkloadEvidence `json:"evidence" validate:"required"`
}

// ReferenceImage identifies a container image in a registry by its namespace, repository, and tag.
type ReferenceImage struct {
	Namespace  string `json:"namespace" validate:"required"`
	Repository string `json:"repository" validate:"required"`
	Tag        string `json:"tag" validate:"required"`
}

// WorkloadEvidence holds evidence about running containers and available local images
// to be used for workload verification.
type WorkloadEvidence struct {
	ContainerEvidence []ContainerEvidence `json:"containers" validate:"required,dive"`
	ImageEvidence     []ImageEvidence     `json:"images" validate:"required,dive"`
	ReportData        string              `json:"reportData" validate:"required"`
}

// ContainerEvidence describes information about a running container, including its ID,
// name, image reference, digest, current state, start time, and optional labels.
type ContainerEvidence struct {
	ID          string            `json:"id" validate:"required"`
	Name        string            `json:"name" validate:"required"`
	Image       string            `json:"image" validate:"required"`
	ImageDigest string            `json:"imageDigest" validate:"required"`
	State       string            `json:"state" validate:"required"`
	StartedAt   string            `json:"startedAt" validate:"required"`
	Labels      map[string]string `json:"labels,omitempty" validate:"required"`
}

// ImageEvidence describes information about a workload image, including its ID, tags,
// digests, creation time, size, and optional labels.
type ImageEvidence struct {
	ID          string            `json:"id" validate:"required"`
	RepoTags    []string          `json:"repoTags,omitempty" validate:"required"`
	RepoDigests []string          `json:"repoDigests,omitempty" validate:"required"`
	Created     string            `json:"created" validate:"required"`
	Size        int64             `json:"size" validate:"required"`
	Labels      map[string]string `json:"labels,omitempty" validate:"required"`
}

// ### Response Types ###

// VerifyWorkloadsResponse is the JSON envelope returned by the VerifyWorkloads handler.
// Status will be "success" or "error". Data holds the verification result, and Message
// contains an optional human-readable error when Status == "error".
type VerifyWorkloadsResponse struct {
	Status  string             `json:"status"`
	Data    VerificationReport `json:"data"`
	Message string             `json:"message,omitempty"`
}

// ### Reference Metadata Types ###

// WorkloadReferenceMetadata holds metadata and manifest information for a referenced
// workload image fetched from a registry.
type WorkloadReferenceMetadata struct {
	Metadata TagMetadata `json:"metadata"`
	Manifest ManifestV2  `json:"manifest"`
}

// TagMetadata models the JSON returned when fetching a single tag from a Docker registry.
// It includes details like creator, ID, associated images, timestamps, and digest.
type TagMetadata struct {
	Creator             int        `json:"creator"`
	ID                  int        `json:"id"`
	Images              []TagImage `json:"images"`
	LastUpdated         time.Time  `json:"last_updated"`
	LastUpdater         int        `json:"last_updater"`
	LastUpdaterUsername string     `json:"last_updater_username"`
	Name                string     `json:"name"`
	Repository          int        `json:"repository"`
	FullSize            int64      `json:"full_size"`
	V2                  bool       `json:"v2"`
	TagStatus           string     `json:"tag_status"`
	TagLastPulled       time.Time  `json:"tag_last_pulled"`
	TagLastPushed       time.Time  `json:"tag_last_pushed"`
	MediaType           string     `json:"media_type"`
	ContentType         string     `json:"content_type"`
	Digest              string     `json:"digest"`
}

// ManifestV2 defines the structure of a Docker image manifest V2 as returned by
// the registry-1.docker.io/v2 API. It includes the schema version, media type,
// and configuration object reference.
type ManifestV2 struct {
	SchemaVersion int    `json:"schemaVersion"`
	MediaType     string `json:"mediaType"`
	Config        struct {
		MediaType string `json:"mediaType"`
		Size      int64  `json:"size"`
		Digest    string `json:"digest"`
	} `json:"config"`
	// TODO: Layers omitted for brevity. Add layers?
}

// TagImage holds the per-architecture image details inside each tag metadata entry,
// including architecture, features, OS, size, status, and pull/push timestamps.
type TagImage struct {
	Architecture string    `json:"architecture"`
	Features     string    `json:"features"`
	Variant      *string   `json:"variant"`
	Digest       string    `json:"digest"`
	OS           string    `json:"os"`
	OSFeatures   string    `json:"os_features"`
	OSVersion    *string   `json:"os_version"`
	Size         int64     `json:"size"`
	Status       string    `json:"status"`
	LastPulled   time.Time `json:"last_pulled"`
	LastPushed   time.Time `json:"last_pushed"`
}

// TokenResponse defines the response struct from the Docker Hub’s OAuth token provider.
// It contains the access token, its expiry, and the issuance timestamp.
type TokenResponse struct {
	Token       string    `json:"token"`
	AccessToken string    `json:"access_token"`
	ExpiresIn   int       `json:"expires_in"`
	IssuedAt    time.Time `json:"issued_at"`
}
