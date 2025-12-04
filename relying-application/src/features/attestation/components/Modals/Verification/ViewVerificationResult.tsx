import * as changeCase from 'change-case';
import { JsonEditor, githubDarkTheme } from 'json-edit-react';

import { ArtifactType, VerificationResult } from '../../../types/attestation';
import { ModalHeader } from '../ModalHeader';

type Props = {
    artifactType: ArtifactType;
    verificationResult: VerificationResult;
};

export function ViewVerificationResult({
    verificationResult,
    artifactType,
}: Props) {
    return (
        <div className="text-slate-100">
            <div className="flex flex-col max-h-[70vh] space-y-4">
                <ModalHeader title={changeCase.sentenceCase(artifactType)} />

                <div className="flex-1 overflow-y-auto rounded-md">
                    <JsonEditor
                        data={verificationResult}
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
