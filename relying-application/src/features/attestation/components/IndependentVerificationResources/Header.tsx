import { useState } from 'react';

import { ModalType } from '../../../../types/ui';
import { InfoButton, Modal } from '../../../../ui';
import { InfoIndependentVerificationResource } from '../Modals';

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold lg:text-3xl">
                        Resources for Independent Verification
                    </h2>
                    <InfoButton
                        ariaLabel="See independent verification resources"
                        className="h-8 w-8"
                        onClick={() =>
                            handleSelectModal(
                                ModalType.INFO_INDEPENDENT_VERIFICATION_RESOURCE,
                            )
                        }
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType ===
                    ModalType.INFO_INDEPENDENT_VERIFICATION_RESOURCE && (
                    <InfoIndependentVerificationResource />
                )}
            </Modal>
        </>
    );
}
