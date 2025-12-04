import * as changeCase from 'change-case';
import {
    Circle,
    CircleDot,
    CircleDotDashed,
    CirclePlus,
    CircleX,
} from 'lucide-react';

import '../../../../types/ui';
import {
    AttestationStepAction,
    AttestationStepArtifact,
    AttestationStepStatus,
} from '../../types/attestation';
import { TrustStatusBadge } from '../TrustStatusBadge';

type Props = {
    name: string;
    status: AttestationStepStatus;
    artifacts: AttestationStepArtifact[];
    action?: AttestationStepAction;
};

export function AttestationStep({ name, status, artifacts, action }: Props) {
    return (
        <div
            className={`flex min-w-0 flex-col gap-3 rounded-xl border px-4 py-4 text-sm sm:text-base ${status === 'pending' ? 'border-white/10 bg-white/5 text-slate-100' : ''} ${status === 'active' ? 'border-teal-400/40 bg-teal-500/10 text-teal-50 shadow-lg' : ''} ${status === 'done' ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100 shadow-md' : ''} ${status === 'error' ? 'border-red-400/40 bg-red-500/10 text-red-200 shadow-md' : ''}`}
        >
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-lg">
                    {status === 'pending' && <Circle className="h-5 w-5" />}
                    {status === 'active' && (
                        <CircleDotDashed
                            className="h-5 w-5 animate-pulse"
                            style={{ animationDuration: '3s' }}
                        />
                    )}
                    {status === 'done' && <CircleDot className="h-5 w-5" />}
                    {status === 'error' && <CircleX className="h-5 w-5" />}
                    <p className="text-base font-semibold sm:text-lg">{name}</p>
                </div>
                {action && status === 'active' && (
                    <button
                        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-teal-200/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-50 transition-all duration-300 hover:bg-teal-500/20"
                        onClick={action.fn}
                    >
                        <CirclePlus size={20} />
                        {action.name}
                    </button>
                )}
            </div>

            {artifacts && (
                <div className="divide-y-1 divide-white/10">
                    {artifacts.map((artifact) => (
                        <div
                            key={artifact.name}
                            className={`flex flex-wrap items-center justify-between gap-3 py-2 text-sm sm:text-base ${!artifact.value ? 'opacity-75 font-medium' : 'font-semibold'}`}
                        >
                            <p className="text-slate-100">
                                {changeCase.sentenceCase(artifact.name)}
                            </p>
                            <div className="flex items-center">
                                <TrustStatusBadge
                                    forArtifact={artifact.name}
                                    size="sm"
                                    emphasized={artifact.value ? true : false}
                                />
                                <hr className="border-1 border-teal-800/10 h-full rounded-full" />
                                <button
                                    className={`ml-0.5 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${!artifact.value ? 'cursor-not-allowed border-white/10 text-slate-400/60' : 'cursor-pointer border-teal-200/30 text-teal-100 hover:bg-teal-500/10'}`}
                                    type="button"
                                    onClick={artifact.action}
                                    disabled={!artifact.value ? true : false}
                                >
                                    Inspect
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
