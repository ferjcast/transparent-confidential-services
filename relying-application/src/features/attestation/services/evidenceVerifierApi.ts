import axios from 'axios';

import {
    VerifyInfrastructureRequest,
    VerifyTdxQuoteRequest,
    VerifyWorkloadsRequest,
} from '../types/api';
import { VerificationResult } from '../types/attestation';

const VERIFIER_URL: string = import.meta.env.VITE_VERIFIER_URL;
console.info(`VERIFIER_URL: ${VERIFIER_URL}`);

export async function verifyTdxQuote({
    issuedChallenge,
    baselineManifestUrl,
    quote,
}: VerifyTdxQuoteRequest): Promise<VerificationResult> {
    const { data } = await axios.post(
        `${VERIFIER_URL}/verify/tdx-quote`,
        {
            issuedChallenge,
            baselineManifestUrl,
            quote,
        },
        { timeout: 3000 },
    );

    const verificationResult: VerificationResult = data.data;
    return verificationResult;
}

export async function verifyInfrastructure({
    issuedChallenge,
    baselineManifestUrl,
    evidence,
}: VerifyInfrastructureRequest): Promise<VerificationResult> {
    const { data } = await axios.post(
        `${VERIFIER_URL}/verify/infrastructure`,
        { issuedChallenge, baselineManifestUrl, evidence },
        { timeout: 3000 },
    );

    const verificationResult: VerificationResult = data.data;
    return verificationResult;
}

export async function verifyWorkloads({
    issuedChallenge,
    referenceImage,
    evidence,
}: VerifyWorkloadsRequest): Promise<VerificationResult> {
    const { data } = await axios.post(
        `${VERIFIER_URL}/verify/workloads`,
        { issuedChallenge, referenceImage, evidence },
        { timeout: 3000 },
    );

    const verificationResult: VerificationResult = data.data;
    return verificationResult;
}
