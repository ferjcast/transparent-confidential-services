import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoCloudInfrastructureOverview() {
    return (
        <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
            <ModalHeader
                title=" About the Cloud Infrastructure Overview"
                icon={<Info className="h-5 w-5" />}
            />
            <p>
                When you share data, these are the virtual machines, disks, and
                workloads that will host the processing. The overview exposes
                how each component is configured, which confidential computing
                features are active, and what images are currently deployed. It
                is the checklist you can review to confirm the environment is
                still aligned with the controls promised by the data sharing
                workflow.
            </p>
        </div>
    );
}
