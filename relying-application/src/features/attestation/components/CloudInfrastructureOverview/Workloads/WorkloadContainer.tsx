import { Container as ContainerIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

import { ModalType } from '../../../../../types/ui';
import { getVerification } from '../../../attestationSlice';
import {
    ArtifactType,
    Container,
    TrustStatus,
} from '../../../types/attestation';
import { computeTrustStatus } from '../../../utils/computeVerification';
import { TrustStatusBadge } from '../../TrustStatusBadge';

type Props = {
    container: Container;
    onInspect: (modalType: ModalType, containerId?: string) => void;
};

export function WorkloadContainer({ container, onInspect }: Props) {
    const verification = useSelector(getVerification);
    const trustStatus = computeTrustStatus(
        ArtifactType.WORKLOAD_EVIDENCE,
        verification,
    );

    return (
        <div
            className={`flex min-w-0 flex-col gap-3 rounded-xl border px-4 py-3 shadow-inner md:flex-row md:items-center md:justify-between ${trustStatus === TrustStatus.TRUSTED ? 'border-emerald-400/30 bg-emerald-500/10' : trustStatus === TrustStatus.UNTRUSTED ? 'border-red-400/30 bg-red-500/10' : 'border-amber-400/30 bg-amber-500/10'}`}
        >
            <div className="flex items-start gap-3 text-sm text-slate-100 md:text-base">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-100">
                    <ContainerIcon className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-base font-semibold">
                        Name
                        <span className="ml-2 break-words font-medium text-white/90">
                            {container.name}
                        </span>
                    </p>
                    <p className="text-sm font-semibold text-slate-200/90">
                        Image
                        <span className="ml-2 break-words font-medium text-white/80">
                            {container.image}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
                <TrustStatusBadge
                    forArtifact={ArtifactType.WORKLOAD_EVIDENCE}
                    emphasized
                />
                <hr className="border-1 border-teal-800/10 h-full rounded-full" />
                <button
                    className="ml-0.5 flex items-center gap-2 rounded-full border border-teal-200/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-teal-500/20"
                    onClick={() =>
                        onInspect(ModalType.VIEW_CONTAINER, container.id)
                    }
                >
                    Inspect
                </button>
            </div>
        </div>
    );
}
