package types

// ### Request Types ###

type GetWorkloadsRequest struct {
	Challenge string `json:"challenge"`
}

// ### Response Types ###

type GetWorkloadsResponse struct {
	Status  string           `json:"status"`
	Data    WorkloadEvidence `json:"data"`
	Message string           `json:"message,omitempty"`
}

type WorkloadEvidence struct {
	Containers []ContainerEvidence `json:"containers"`
	Images     []ImageEvidence     `json:"images"`
	ReportData string              `json:"reportData"`
}

type ContainerEvidence struct {
	ID          string            `json:"id"`
	Name        string            `json:"name"`
	Image       string            `json:"image"`
	ImageDigest string            `json:"imageDigest"`
	State       string            `json:"state"`
	StartedAt   string            `json:"startedAt"`
	Labels      map[string]string `json:"labels,omitempty"`
}

type ImageEvidence struct {
	ID          string            `json:"id"`
	RepoTags    []string          `json:"repoTags,omitempty"`
	RepoDigests []string          `json:"repoDigests,omitempty"`
	Created     string            `json:"created"`
	Size        int64             `json:"size"`
	Labels      map[string]string `json:"labels,omitempty"`
}
