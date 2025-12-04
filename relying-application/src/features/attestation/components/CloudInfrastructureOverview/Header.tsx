import { useState } from 'react';

import { ModalType } from '../../../../types/ui';
import { InfoButton, Modal } from '../../../../ui';
import { InfoCloudInfrastructureOverview } from '../Modals';

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold text-white lg:text-3xl">
                        Cloud Infrastructure Overview
                    </h2>
                    <InfoButton
                        ariaLabel="Understand the infrastructure overview"
                        onClick={() =>
                            handleSelectModal(
                                ModalType.INFO_CLOUD_INFRASTRUCTURE_OVERVIEW,
                            )
                        }
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.INFO_CLOUD_INFRASTRUCTURE_OVERVIEW && (
                    <InfoCloudInfrastructureOverview />
                )}
            </Modal>
        </>
    );
}
