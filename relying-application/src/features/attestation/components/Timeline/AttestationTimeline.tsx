import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../redux/store';
import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import {
    getAttestationSteps,
    getChallenge,
    getEvidence,
    getVerification,
    setChallengeFreshness,
} from '../../attestationSlice';
import {
    ArtifactType,
    Challenge,
    Evidence,
    Infrastructure,
    Quote,
    VerificationResult,
    Workloads,
} from '../../types/attestation';
import { computeChallengeFreshness } from '../../utils/computeChallengeFreshness';
import {
    FetchEvidence,
    GenerateChallenge,
    VerifyEvidence,
    ViewChallenge,
    ViewEvidence,
    ViewVerificationResult,
} from '../Modals';
import { AttestationStep } from './AttestationStep';
import { Header } from './Header';

/**
 * Visualizes the attestation flow for the Relying Party.
 * Exposes the attestation steps and their statuses to the user, fulfilling transparency requirements T1 and T2.
 * Ensures evidence integrity across intermediaries, fulfilling trust minimization requirement TM3.
 */
export function AttestationTimeline() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | undefined>(
        undefined,
    );
    const [selectedArtifactType, setSelectedArtifactType] = useState<
        ArtifactType | undefined
    >(undefined);

    const dispatch: AppDispatch = useDispatch();
    const { generateChallenge, gatherEvidence, verifyEvidence } =
        useSelector(getAttestationSteps);
    const challenge = useSelector(getChallenge) as Challenge;
    const evidence = useSelector(getEvidence) as Evidence;
    const verification = useSelector(getVerification);

    useEffect(() => {
        const isFresh = computeChallengeFreshness(
            challenge?.value as string,
            evidence,
        );
        if (isFresh) dispatch(setChallengeFreshness(true));
    }, [evidence, challenge, dispatch]);

    function handleSelectModal(
        modalType: ModalType,
        artifactType?: ArtifactType,
    ) {
        if (
            modalType === ModalType.VIEW_CHALLENGE &&
            artifactType === ArtifactType.CHALLENGE
        )
            setSelectedArtifactType(artifactType);
        if (
            modalType === ModalType.VIEW_EVIDENCE &&
            artifactType === ArtifactType.QUOTE_EVIDENCE
        )
            setSelectedArtifactType(artifactType);
        if (
            modalType === ModalType.VIEW_EVIDENCE &&
            artifactType === ArtifactType.WORKLOAD_EVIDENCE
        )
            setSelectedArtifactType(artifactType);
        if (
            modalType === ModalType.VIEW_EVIDENCE &&
            artifactType === ArtifactType.INFRASTRUCTURE_EVIDENCE
        )
            setSelectedArtifactType(artifactType);
        if (
            modalType === ModalType.VIEW_VERIFICATION_RESULT &&
            artifactType === ArtifactType.QUOTE_VERIFICATION
        )
            setSelectedArtifactType(artifactType);
        if (
            modalType === ModalType.VIEW_VERIFICATION_RESULT &&
            artifactType === ArtifactType.WORKLOAD_VERIFICATION
        )
            setSelectedArtifactType(artifactType);
        if (
            modalType === ModalType.VIEW_VERIFICATION_RESULT &&
            artifactType === ArtifactType.INFRASTRUCTURE_VERIFICATION
        )
            setSelectedArtifactType(artifactType);

        setModalType(modalType);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setModalType(undefined);
        setSelectedArtifactType(undefined);
    }

    function handleLoadArtifact(selectedArtifactType: ArtifactType) {
        switch (selectedArtifactType) {
            case ArtifactType.QUOTE_EVIDENCE:
                return evidence?.quote;
            case ArtifactType.INFRASTRUCTURE_EVIDENCE:
                return evidence?.infrastructure;
            case ArtifactType.WORKLOAD_EVIDENCE:
                return evidence?.workloads;
            case ArtifactType.QUOTE_VERIFICATION:
                return verification?.quote;
            case ArtifactType.WORKLOAD_VERIFICATION:
                return verification?.workloads;
            case ArtifactType.INFRASTRUCTURE_VERIFICATION:
                return verification?.infrastructure;
            default:
                console.error('Unknown evidence type:', selectedArtifactType);
                return;
        }
    }

    return (
        <>
            <div className="rounded-2xl bg-slate-900/60 p-6 text-slate-100">
                <div className="flex flex-col gap-6">
                    <Header />
                    <div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            <AttestationStep
                                name="Generate Challenge"
                                status={generateChallenge.status}
                                artifacts={[
                                    {
                                        name: ArtifactType.CHALLENGE,
                                        value: challenge,
                                        action: () =>
                                            handleSelectModal(
                                                ModalType.VIEW_CHALLENGE,
                                                ArtifactType.CHALLENGE,
                                            ),
                                    },
                                ]}
                                action={{
                                    name: 'Generate',
                                    fn: () =>
                                        handleSelectModal(
                                            ModalType.START_ATTESTATION,
                                        ),
                                }}
                            />
                            <AttestationStep
                                name="Gather Evidence"
                                status={gatherEvidence.status}
                                artifacts={[
                                    {
                                        name: ArtifactType.QUOTE_EVIDENCE,
                                        value: evidence?.quote,
                                        action: () =>
                                            handleSelectModal(
                                                ModalType.VIEW_EVIDENCE,
                                                ArtifactType.QUOTE_EVIDENCE,
                                            ),
                                    },
                                    {
                                        name: ArtifactType.WORKLOAD_EVIDENCE,
                                        value: evidence?.workloads,
                                        action: () =>
                                            handleSelectModal(
                                                ModalType.VIEW_EVIDENCE,
                                                ArtifactType.WORKLOAD_EVIDENCE,
                                            ),
                                    },
                                    {
                                        name: ArtifactType.INFRASTRUCTURE_EVIDENCE,
                                        value: evidence?.infrastructure,
                                        action: () =>
                                            handleSelectModal(
                                                ModalType.VIEW_EVIDENCE,
                                                ArtifactType.INFRASTRUCTURE_EVIDENCE,
                                            ),
                                    },
                                ]}
                                action={{
                                    name: 'Fetch',
                                    fn: () =>
                                        handleSelectModal(
                                            ModalType.FETCH_EVIDENCE,
                                        ),
                                }}
                            />
                            <AttestationStep
                                name="Verify Evidence"
                                status={verifyEvidence.status}
                                artifacts={[
                                    {
                                        name: ArtifactType.QUOTE_VERIFICATION,
                                        value: verification?.quote,
                                        action: () =>
                                            handleSelectModal(
                                                ModalType.VIEW_VERIFICATION_RESULT,
                                                ArtifactType.QUOTE_VERIFICATION,
                                            ),
                                    },
                                    {
                                        name: ArtifactType.WORKLOAD_VERIFICATION,
                                        value: verification?.workloads,
                                        action: () =>
                                            handleSelectModal(
                                                ModalType.VIEW_VERIFICATION_RESULT,
                                                ArtifactType.WORKLOAD_VERIFICATION,
                                            ),
                                    },
                                    {
                                        name: ArtifactType.INFRASTRUCTURE_VERIFICATION,
                                        value: verification?.infrastructure,
                                        action: () =>
                                            handleSelectModal(
                                                ModalType.VIEW_VERIFICATION_RESULT,
                                                ArtifactType.INFRASTRUCTURE_VERIFICATION,
                                            ),
                                    },
                                ]}
                                action={{
                                    name: 'Verify',
                                    fn: () =>
                                        handleSelectModal(
                                            ModalType.VERIFY_EVIDENCE,
                                        ),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {modalType === ModalType.START_ATTESTATION && (
                    <GenerateChallenge onClose={() => setIsModalOpen(false)} />
                )}
                {modalType === ModalType.VIEW_CHALLENGE &&
                    selectedArtifactType && (
                        <ViewChallenge
                            challenge={challenge}
                            artifactType={selectedArtifactType}
                        />
                    )}
                {modalType === ModalType.FETCH_EVIDENCE && <FetchEvidence />}
                {modalType === ModalType.VIEW_EVIDENCE &&
                    selectedArtifactType && (
                        <ViewEvidence
                            artifactType={selectedArtifactType}
                            evidence={
                                handleLoadArtifact(selectedArtifactType) as
                                    | Quote
                                    | Infrastructure
                                    | Workloads
                            }
                        />
                    )}
                {modalType === ModalType.VERIFY_EVIDENCE && <VerifyEvidence />}
                {modalType === ModalType.VIEW_VERIFICATION_RESULT &&
                    selectedArtifactType && (
                        <ViewVerificationResult
                            artifactType={selectedArtifactType}
                            verificationResult={
                                handleLoadArtifact(
                                    selectedArtifactType,
                                ) as VerificationResult
                            }
                        />
                    )}
            </Modal>
        </>
    );
}
