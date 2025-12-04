import * as changeCase from 'change-case';
import { JsonEditor, githubDarkTheme } from 'json-edit-react';

import { ArtifactType, Challenge } from '../../../types/attestation';
import { ModalHeader } from '../ModalHeader';

type Props = {
    challenge: Challenge;
    artifactType: ArtifactType;
};

/**
 * Displays the cryptographic challenge issued by the Relying Party.
 * Enables service-agnostic verification, fulfilling verifiability requirement V2.
 * Ensures session specificity and freshness of the attestation process, fulfilling trust minimization requirement TM1.
 */
export function ViewChallenge({ challenge, artifactType }: Props) {
    return (
        <div className="text-slate-100">
            <div className="flex flex-col max-h-[70vh] space-y-4">
                <ModalHeader title={changeCase.sentenceCase(artifactType)} />
                <p className="text-lg font-normal flex gap-1 p-2">
                    A unique 64-byte challenge was generated to ensure that this
                    attestation session is fresh and specific to your request.
                    This challenge will be embedded into the attestation
                    evidence gathered in the next step, making it
                    cryptographically bound to this session. The confidential
                    execution environment must prove it received and used this
                    exact challenge - it is your cryptographic fingerprint on
                    the verification process.
                </p>

                <div className="flex-1 overflow-y-auto rounded-md">
                    <JsonEditor
                        data={challenge}
                        viewOnly
                        maxWidth={'100%'}
                        theme={githubDarkTheme}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-teal-600/70 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-teal-500"
                        onClick={() => {
                            console.log('Download'); // TODO: Add download logic.
                        }}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}
