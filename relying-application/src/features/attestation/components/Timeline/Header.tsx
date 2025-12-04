import { CirclePlay, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../redux/store';
import { ModalType } from '../../../../types/ui';
import { InfoButton, Modal } from '../../../../ui';
import {
    getChallenge,
    resetAttestation,
    updateStep,
} from '../../attestationSlice';
import { InfoRunVerification } from '../Modals';

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const challenge = useSelector(getChallenge);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    function handleStartAttestation() {
        if (challenge) dispatch(resetAttestation());

        dispatch(
            updateStep({
                step: 'generateChallenge',
                status: 'active',
            }),
        );
    }

    return (
        <>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-semibold text-white lg:text-3xl">
                            Run attestation before you upload
                        </h2>
                        <InfoButton
                            ariaLabel="Learn how to run verification"
                            onClick={() =>
                                handleSelectModal(
                                    ModalType.INFO_RUN_VERIFICATION,
                                )
                            }
                        />
                    </div>
                    <p className="max-w-2xl text-sm text-slate-200/80 lg:text-base">
                        Kick off a fresh remote attestation to confirm the
                        environment that will process your shared records still
                        meets confidentiality requirements.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="flex cursor-pointer items-center gap-2 rounded-full bg-teal-600/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal-50 transition-colors duration-200 hover:bg-teal-600 lg:text-sm"
                        onClick={handleStartAttestation}
                    >
                        {!challenge ? (
                            <span className="flex items-center gap-2">
                                <CirclePlay className="h-5 w-5" />
                                Start Attestation
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <RotateCcw className="h-5 w-5" />
                                Start a new Attestation
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.INFO_RUN_VERIFICATION && (
                    <InfoRunVerification />
                )}
            </Modal>
        </>
    );
}
