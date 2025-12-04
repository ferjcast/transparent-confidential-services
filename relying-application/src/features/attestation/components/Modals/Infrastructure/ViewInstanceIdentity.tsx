import * as changeCase from 'change-case';
import { JsonEditor, githubDarkTheme } from 'json-edit-react';

import { ArtifactType, Instance } from '../../../types/attestation';
import { ModalHeader } from '../ModalHeader';

type Props = {
    instanceData?: Instance;
    instanceName: string | undefined;
    artifactType: ArtifactType;
};

/**
 * Provides detailed evidence of the confidential VM instance state.
 * Exposes runtime claims such as configuration and state data, fulfilling transparency requirement T3.
 * Supports traceability and reproducibility of the backend codebase, fulfilling verifiability requirement V3.
 */
export function ViewInstanceIdentity({
    instanceData,
    instanceName,
    artifactType,
}: Props) {
    return (
        <div className="text-slate-800">
            <div className="flex flex-col max-h-[70vh] space-y-4">
                <ModalHeader
                    title={`${changeCase.sentenceCase(artifactType)} - ${instanceName}`}
                />
                <div className="flex-1 overflow-y-auto">
                    {instanceData ? (
                        <JsonEditor
                            data={instanceData}
                            viewOnly
                            maxWidth={'100%'}
                            theme={githubDarkTheme}
                        />
                    ) : (
                        <p className="font-medium text-xl flex items-center justify-center rounded-xl bg-orange-800/20 px-4 py-2 text-orange-900">
                            No instance data available
                        </p>
                    )}
                </div>

                {/* DOWNLOAD */}
                {/* <div className="flex justify-end">
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                        onClick={() => {
                            console.log('Download'); // TODO: Add download logic.
                        }}
                    >
                        DOWNLOAD
                    </button>
                </div> */}
            </div>
        </div>
    );
}
