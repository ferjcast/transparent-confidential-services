import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoAttestationPage() {
    return (
        <div className="text-slate-100">
            <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
                <ModalHeader
                    title="Why verify before sharing data?"
                    icon={<Info className="h-5 w-5" />}
                />

                <div className="flex-1 space-y-3">
                    <p>
                        The data sharing workflow lets you move sensitive
                        records into a confidential computing pipeline. Before
                        you press upload, this page gives you a chance to
                        confirm that the service handling those records is still
                        operating inside a trusted execution environment.
                    </p>

                    <p>
                        Remote attestation produces cryptographic proof about
                        three things that matter for your data:
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            The AI workloads that will process your data match
                            the approved container images.
                        </li>
                        <li>
                            The cloud infrastructure is running with
                            confidential computing protections enabled.
                        </li>
                        <li>
                            Verification results from an independent checker are
                            consistent with the latest policy baselines.
                        </li>
                    </ul>

                    <p>
                        Each section below exposes the raw evidence, the
                        verification decisions, and helpful context so you can
                        make an informed call on whether the service is safe to
                        use right now.
                    </p>

                    <p>
                        After you are comfortable with the attestation evidence,
                        return to the data sharing page and continue with the
                        transfer.
                    </p>
                </div>
            </div>
        </div>
    );
}
