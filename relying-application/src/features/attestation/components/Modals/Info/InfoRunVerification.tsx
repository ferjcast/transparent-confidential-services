import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoRunVerification() {
    return (
        <div className="text-slate-100">
            <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
                <ModalHeader
                    title="What Happens During Verification"
                    icon={<Info className="h-5 w-5" />}
                />

                <div className="flex-1 space-y-3">
                    <p>
                        Clicking the{' '}
                        <span className="font-semibold">START ATTESTATION</span>{' '}
                        button runs remote attestation so you can double check
                        the confidential service before submitting any data
                        through the sharing workflow.
                    </p>

                    <p>This is how the process works:</p>

                    <ol className="list-decimal list-inside space-y-2 pl-1">
                        <li>
                            <span className="font-semibold">
                                📤 Challenge Creation:
                            </span>{' '}
                            A random 64-byte challenge is generated to uniquely
                            identify your verification session and prevent
                            replay attacks.
                        </li>
                        <li>
                            <span className="font-semibold">
                                📡 Evidence Collection:
                            </span>{' '}
                            The confidential execution environment responds with
                            signed evidence about the workloads and
                            infrastructure that will handle your shared data.
                        </li>
                        <li>
                            <span className="font-semibold">
                                🔐 Evidence Verification:
                            </span>{' '}
                            An external verifier service checks the backend's
                            authenticity and integrity by comparing the evidence
                            against known-good reference values.
                        </li>
                        <li>
                            <span className="font-semibold">
                                📬 Result Delivery:
                            </span>{' '}
                            A signed attestation result is returned and
                            displayed here, helping you decide whether it is
                            safe to send your dataset now or investigate
                            further.
                        </li>
                    </ol>

                    <p>
                        <span className="font-semibold">Why this matters:</span>
                        <br />
                        It empowers you to independently verify that the
                        confidential execution environment and the AI model
                        handling your uploaded information are authentic,
                        secure, and behaving as claimed.
                    </p>
                </div>
            </div>
        </div>
    );
}
