package infrastructure

import (
	"fmt"
	"github.com/MrEttore/Attestify/evidenceverifier/internal/service/challenge"
	"github.com/MrEttore/Attestify/evidenceverifier/internal/service/manifest"
	"github.com/MrEttore/Attestify/evidenceverifier/internal/types"
)

func Verify(issuedChallenge, manifestUrl string, infrastructureEvidence types.InfrastructureEvidence) (types.VerificationReport, error) {

	// 1. Verify the challenge issued by the Relying Party.
	if err := challenge.Verify(issuedChallenge, infrastructureEvidence.ReportData); err != nil {
		return types.VerificationReport{
			IsVerified: false,
			Message:    err.Error(),
		}, nil
	}

	// 2. Verify the infrastructure evidence against the Reference Value Provider's manifest.
	if err := manifest.VerifyInfrastructureValues(manifestUrl, infrastructureEvidence); err != nil {
		return types.VerificationReport{
			IsVerified: false,
			Message:    fmt.Sprintf("manifest verification failed: %v", err),
		}, nil
	}

	return types.VerificationReport{
		IsVerified:                    true,
		Message:                       "infrastructure successfully verified",
		VerifiedBootDiskSourceImage:   infrastructureEvidence.Disk.SourceImage,
		VerifiedBootDiskSourceImageID: infrastructureEvidence.Disk.SourceImageId,
	}, nil
}
