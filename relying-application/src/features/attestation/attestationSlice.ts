import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../redux/store';
import {
    AttestationState,
    Infrastructure,
    Quote,
    UpdateStepPayload,
    VerificationResult,
    Workloads,
} from './types/attestation';

const initialState: AttestationState = {
    attestationSteps: {
        generateChallenge: {
            status: 'pending',
        },
        gatherEvidence: {
            status: 'pending',
        },
        verifyEvidence: {
            status: 'pending',
        },
    },
};

const attestationSlice = createSlice({
    name: 'attestation',
    initialState,
    reducers: {
        setChallengeValue(state, action: PayloadAction<string>) {
            if (!state.challenge) state.challenge = {};
            state.challenge.value = action.payload;
        },
        setChallengeFreshness(state, action: PayloadAction<boolean>) {
            if (!state.challenge) state.challenge = {};
            state.challenge.isFresh = action.payload;
        },
        setEvidenceQuote(state, action: PayloadAction<Quote>) {
            if (!state.evidence) state.evidence = {};
            state.evidence.quote = action.payload;
        },
        setEvidenceInfrastructure(
            state,
            action: PayloadAction<Infrastructure>,
        ) {
            if (!state.evidence) state.evidence = {};
            state.evidence.infrastructure = action.payload;
        },
        setEvidenceWorkloads(state, action: PayloadAction<Workloads>) {
            if (!state.evidence) state.evidence = {};
            state.evidence.workloads = action.payload;
        },
        setVerificationQuote(state, action: PayloadAction<VerificationResult>) {
            if (!state.verification) state.verification = {};
            state.verification.quote = action.payload;
        },
        setVerificationInfrastructure(
            state,
            action: PayloadAction<VerificationResult>,
        ) {
            if (!state.verification) state.verification = {};
            state.verification.infrastructure = action.payload;
        },
        setVerificationWorkloads(
            state,
            action: PayloadAction<VerificationResult>,
        ) {
            if (!state.verification) state.verification = {};
            state.verification.workloads = action.payload;
        },
        updateStep(state, action: PayloadAction<UpdateStepPayload>) {
            const { step, status } = action.payload;
            state.attestationSteps[step].status = status;
        },
        resetAttestation(state) {
            state.attestationSteps = {
                generateChallenge: { status: 'pending' },
                gatherEvidence: { status: 'pending' },
                verifyEvidence: { status: 'pending' },
            };
            state.evidence = undefined;
            state.evidence = undefined;
            state.verification = undefined;
        },
    },
});

export const getAttestationSteps = (state: RootState) =>
    state.attestation.attestationSteps;
export const getChallenge = (state: RootState) => state.attestation.challenge;
export const getEvidence = (state: RootState) => state.attestation.evidence;
export const getVerification = (state: RootState) =>
    state.attestation.verification;

export const {
    setChallengeValue,
    setChallengeFreshness,
    setEvidenceQuote,
    setEvidenceInfrastructure,
    setEvidenceWorkloads,
    setVerificationQuote,
    setVerificationInfrastructure,
    setVerificationWorkloads,
    updateStep,
    resetAttestation,
} = attestationSlice.actions;
export default attestationSlice.reducer;
