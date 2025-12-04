import { HardDrive, Info, Server } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import { getEvidence, getVerification } from '../../../attestationSlice';
import { ArtifactType, TrustStatus } from '../../../types/attestation';
import { computeTrustStatus } from '../../../utils/computeVerification';
import { ViewInstanceDisk, ViewInstanceIdentity } from '../../Modals';
import { TrustStatusBadge } from '../../TrustStatusBadge';
import { InstanceAttribute } from './InstanceAttribute';

export function InfrastructureSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const infrastructure = useSelector(getEvidence)?.infrastructure;
    const verification = useSelector(getVerification);

    const confidentialTechnology =
        infrastructure?.instance?.confidentialInstanceConfig
            ?.confidentialInstanceType ?? 'Unknown';
    const cpuPlatform = infrastructure?.instance?.cpuPlatform ?? 'Unknown';
    const summaryWithConfidentialTechnology = {
        ...infrastructure?.summary,
        confidentialTechnology,
        cpuPlatform,
    };
    const instanceProperties = summaryWithConfidentialTechnology
        ? Object.entries(summaryWithConfidentialTechnology)
        : [];

    const trustStatus = computeTrustStatus(
        ArtifactType.INFRASTRUCTURE_EVIDENCE,
        verification,
    );

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="flex h-full flex-col text-slate-100">
                <div className="flex h-full flex-col space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
                        <h3 className="text-lg font-semibold text-white xl:text-xl">
                            VM instance
                        </h3>
                        <TrustStatusBadge
                            forArtifact={ArtifactType.INFRASTRUCTURE_EVIDENCE}
                            size="md"
                            emphasized={verification ? true : false}
                        />
                    </div>

                    {infrastructure ? (
                        <div
                            className={`flex flex-1 flex-col justify-between rounded-xl border p-3 shadow-inner ${trustStatus === TrustStatus.TRUSTED ? 'border-emerald-400/30 bg-emerald-500/10' : trustStatus === TrustStatus.UNTRUSTED ? 'border-red-400/30 bg-red-500/10' : 'border-amber-400/30 bg-amber-500/10'}`}
                        >
                            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                                {instanceProperties.map(([key, value]) => (
                                    <InstanceAttribute
                                        key={key}
                                        name={key}
                                        value={value}
                                    />
                                ))}
                            </div>
                            <div className="mt-4 flex flex-wrap justify-end gap-2 text-xs font-semibold uppercase tracking-wide">
                                <button
                                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-teal-200/30 px-3 py-1 text-teal-50 transition-all duration-300 hover:bg-teal-500/20"
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_INSTANCE_DISK,
                                        )
                                    }
                                >
                                    <HardDrive size={15} />
                                    Inspect disk
                                </button>
                                <button
                                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-teal-200/30 px-3 py-1 text-teal-50 transition-all duration-300 hover:bg-teal-500/20"
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_INSTANCE_IDENTITY,
                                        )
                                    }
                                >
                                    <Server size={15} />
                                    Inspect VM
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 px-3 py-4 text-sm text-slate-300">
                            <p className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-semibold">
                                <Info size={15} />
                                Gather infrastructure evidence to view VM
                                information
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.VIEW_INSTANCE_IDENTITY &&
                    infrastructure && (
                        <ViewInstanceIdentity
                            instanceData={infrastructure.instance}
                            instanceName={infrastructure.instance?.name}
                            artifactType={ArtifactType.INSTANCE_IDENTITY}
                        />
                    )}
                {modalType === ModalType.VIEW_INSTANCE_DISK &&
                    infrastructure && (
                        <ViewInstanceDisk
                            diskData={infrastructure.disk}
                            diskName={infrastructure.disk?.name}
                            artifactType={ArtifactType.INSTANCE_DISK}
                        />
                    )}
            </Modal>
        </>
    );
}
