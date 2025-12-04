import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoIndependentVerificationResource() {
    return (
        <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
            <ModalHeader
                title=" About the Independent Verification"
                icon={<Info className="h-5 w-5" />}
            />
            <p>
                This section gathers the public artifacts backing the
                attestation results. Before you move sensitive data through the
                sharing feature, you can download the same container images,
                baseline manifests, and verifier tooling that enforce the
                service&apos;s confidentiality posture. Replaying these assets
                lets you (or any auditor) reproduce the trust decision and
                confirm that the environment processing your data is still the
                one described in policy.
            </p>
        </div>
    );
}
