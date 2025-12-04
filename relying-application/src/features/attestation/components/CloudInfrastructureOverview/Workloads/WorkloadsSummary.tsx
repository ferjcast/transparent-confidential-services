import { Info } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import { getEvidence } from '../../../attestationSlice';
import { ArtifactType } from '../../../types/attestation';
import { ViewContainer } from '../../Modals';
import { WorkloadContainer } from './WorkloadContainer';

export function WorkloadsSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [selectedContainer, setSelectedContainer] = useState<string | null>(
        null,
    );

    const workloads = useSelector(getEvidence)?.workloads;

    function handleSelectModal(modalType: ModalType, containerId?: string) {
        setModalType(modalType);
        if (modalType === ModalType.VIEW_CONTAINER && containerId)
            setSelectedContainer(containerId);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedContainer(null);
    }

    return (
        <>
            <div className="flex h-full min-h-0 flex-col overflow-hidden text-slate-100">
                <div className="flex flex-1 flex-col space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
                        <h3 className="text-lg font-semibold text-white xl:text-xl">
                            Running workloads:
                            <span className="ml-2 rounded-lg px-1.5 bg-teal-800/20 shadow-xs font-medium">
                                {workloads?.containers.length ?? '-'}
                            </span>
                        </h3>
                    </div>
                    {workloads ? (
                        <div className="flex flex-1 flex-col overflow-hidden">
                            <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pb-2 pr-1">
                                {workloads.containers.length > 0
                                    ? workloads.containers.map((container) => (
                                          <WorkloadContainer
                                              key={container.id}
                                              container={container}
                                              onInspect={handleSelectModal}
                                          />
                                      ))
                                    : '---'}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 px-3 py-4 text-sm text-slate-300">
                            <p className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-semibold">
                                <Info size={15} />
                                Gather workload evidence to view the running
                                containers
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {modalType === ModalType.VIEW_CONTAINER && workloads && (
                    <ViewContainer
                        container={workloads.containers.find(
                            (container) => container.id === selectedContainer,
                        )}
                        artifactType={ArtifactType.CONTAINER}
                    />
                )}
            </Modal>
        </>
    );
}
