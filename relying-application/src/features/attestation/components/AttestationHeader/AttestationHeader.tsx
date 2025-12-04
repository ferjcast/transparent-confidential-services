import { useState } from 'react';

import { ModalType } from '../../../../types/ui';
import { InfoButton, Modal } from '../../../../ui';
import { InfoAttestationPage } from '../Modals';

export function AttestationHeader() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <header className="flex flex-col gap-3 text-slate-100">
                <h3 className="text-xl font-semibold leading-tight lg:text-2xl">
                    Check the service before sharing data
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 sm:text-sm">
                    <p className="min-w-[220px] flex-1 leading-relaxed">
                        Use this verification workspace to confirm that the
                        confidential service still protects uploaded datasets
                        before you push sensitive records through the data
                        sharing flow.
                    </p>
                    <InfoButton
                        ariaLabel="Open attestation workspace guidance"
                        onClick={() =>
                            handleSelectModal(ModalType.INFO_ATTESTATION_PAGE)
                        }
                    />
                </div>
            </header>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.INFO_ATTESTATION_PAGE && (
                    <InfoAttestationPage />
                )}
            </Modal>
        </>
    );
}
