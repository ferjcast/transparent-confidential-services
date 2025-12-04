package types

import (
	"google.golang.org/api/compute/v1"
)

// ### Request Types ###

type GetInfrastructureSummaryRequest struct {
	Challenge string `json:"challenge"`
}

// ### Response Types ###

type GetInfrastructureSummaryResponse struct {
	Status  string                 `json:"status"`
	Data    InfrastructureEvidence `json:"data,omitempty"`
	Message string                 `json:"message,omitempty"`
}

type InfrastructureEvidence struct {
	Summary    *InfrastructureSummary `json:"summary"`
	Instance   *compute.Instance      `json:"instance"`
	Disk       *compute.Disk          `json:"disk"`
	ReportData string                 `json:"reportData"`
}

type InfrastructureSummary struct {
	Provider     string `json:"provider"`
	InstanceID   string `json:"instanceId"`
	Name         string `json:"name"`
	Zone         string `json:"zone,omitempty"`
	Region       string `json:"region,omitempty"`
	MachineType  string `json:"machineType,omitempty"`
	Status       string `json:"status,omitempty"`
	ProjectID    string `json:"projectId,omitempty"`      // GCP only
	Subscription string `json:"subscriptionId,omitempty"` // Azure only
}
