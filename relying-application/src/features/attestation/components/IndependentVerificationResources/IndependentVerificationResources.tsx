import { Header } from './Header';
import { VerificationResource } from './VerificationResource';

export default function IndependentVerificationResources() {
    return (
        <section>
            <div className="flex flex-col gap-6 rounded-2xl bg-slate-900/60 p-6 text-slate-100">
                <Header />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <VerificationResource
                        name="Inference workload container"
                        description="Container image that runs the confidential inference pipeline for the shared dataset."
                        resourceLink="https://hub.docker.com/r/confidential-service/llm-core/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name="Model management API container"
                        description="Supporting service responsible for loading, configuring, and monitoring the protected AI model."
                        resourceLink="https://hub.docker.com/r/confidential-service/llm-manager/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name="Client portal container"
                        description="Web interface that lets users trigger attestation and manage data sharing sessions."
                        resourceLink="https://hub.docker.com/r/confidential-service/frontend/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name="Gateway container"
                        description="Entry point routing encrypted requests from the data sharing feature into the confidential cluster."
                        resourceLink="https://hub.docker.com/r/confidential-service/api-gateway/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name="Independent verifier container"
                        description="Reference implementation you can run yourself to double check attestation evidence."
                        resourceLink="https://hub.docker.com/r/confidential-service/evidence-verifier/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name="Baseline manifest repository"
                        description="Policy-controlled measurements describing the trusted infrastructure that should process uploaded records."
                        resourceLink="https://github.com/example-org/confidential-service-baselines"
                        linkPlaceholder="View on GitHub"
                    />
                </div>
            </div>
        </section>
    );
}
