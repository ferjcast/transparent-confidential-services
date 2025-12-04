package workload

import (
	"context"
	"fmt"
	"github.com/MrEttore/Attestify/evidenceprovider/internal/types"
	"github.com/MrEttore/Attestify/evidenceprovider/internal/util"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

// FetchEvidence gathers evidence from running containers and their associated images.
func FetchEvidence(ctx context.Context, challenge string) (types.WorkloadEvidence, error) {

	cli, err := client.NewClientWithOpts(
		client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return types.WorkloadEvidence{}, fmt.Errorf("failed to create a new client: %w", err)
	}

	containerList, err := cli.ContainerList(ctx, container.ListOptions{})
	if err != nil {
		return types.WorkloadEvidence{}, fmt.Errorf("failed to list containers: %w", err)
	}

	var containerEvidence []types.ContainerEvidence
	var imagesSeen = make(map[string]struct{})
	var imageEvidence []types.ImageEvidence

	for _, c := range containerList {
		ci, _ := cli.ContainerInspect(ctx, c.ID)
		containerEvidence = append(containerEvidence, types.ContainerEvidence{
			ID:          c.ID,
			Name:        util.TrimLeadingSlash(ci.Name),
			Image:       ci.Config.Image,
			ImageDigest: ci.Image,
			State:       ci.State.Status,
			StartedAt:   ci.State.StartedAt,
			Labels:      ci.Config.Labels,
		})

		if _, done := imagesSeen[ci.Image]; !done {
			imagesSeen[ci.Image] = struct{}{}
			ii, err := cli.ImageInspect(ctx, ci.Image)
			if err != nil {
				return types.WorkloadEvidence{}, fmt.Errorf("failed to inspect image %s: %w", ci.Image, err)
			}
			imageEvidence = append(imageEvidence, types.ImageEvidence{
				ID:          ii.ID,
				RepoTags:    ii.RepoTags,
				RepoDigests: ii.RepoDigests,
				Created:     ii.Created,
				Size:        ii.Size,
				Labels:      ii.Config.Labels,
			})
		}
	}

	return types.WorkloadEvidence{
		Containers: containerEvidence,
		Images:     imageEvidence,
		ReportData: challenge,
	}, nil
}
