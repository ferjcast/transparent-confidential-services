package types

import (
	"google.golang.org/api/compute/v1"
)

// ### Request Types ###

// VerifyInfrastructureRequest represents the JSON request payload for verifying the infrastructure.
// It contains a reference image and the evidence gathered from running containers and local images.
//
//	{
//	  "issuedChallenge": "",
//	  "evidence": {...}
//	}
type VerifyInfrastructureRequest struct {
	IssuedChallenge     string                 `json:"issuedChallenge" validate:"required"`
	BaselineManifestUrl string                 `json:"baselineManifestUrl" validate:"required,url"`
	Evidence            InfrastructureEvidence `json:"evidence" validate:"required"`
}

type InfrastructureEvidence struct {
	Summary    *InfrastructureSummary `json:"summary" validate:"required"`
	Instance   *compute.Instance      `json:"instance" validate:"required"`
	Disk       *compute.Disk          `json:"disk" validate:"required"`
	ReportData string                 `json:"reportData" validate:"required"`
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

// ### Response Types ###

// VerifyInfrastructureResponse struct is the JSON envelope returned by the VerifyWorkloads handler.
// Status will be "success" or "error". Data holds the verification result, and Message
// contains an optional human-readable error when Status == "error".
type VerifyInfrastructureResponse struct {
	Status  string             `json:"status"`
	Data    VerificationReport `json:"data"`
	Message string             `json:"message,omitempty"`
}
