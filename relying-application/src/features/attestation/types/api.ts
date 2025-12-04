import {
    Infrastructure,
    Quote,
    VerificationResult,
    Workloads,
} from './attestation';

// Requests

export type VerifyTdxQuoteRequest = {
    issuedChallenge: string;
    baselineManifestUrl: string;
    quote: Quote;
};

export type VerifyInfrastructureRequest = {
    issuedChallenge: string;
    baselineManifestUrl: string;
    evidence: Infrastructure;
};

export type VerifyWorkloadsRequest = {
    issuedChallenge: string;
    referenceImage: {
        namespace: string;
        repository: string;
        tag: string;
    };
    evidence: Workloads;
};

// ...

// Responses

export type VerifyTdxQuoteResponse = {
    status: 'success' | 'error';
    data: VerificationResult;
};
