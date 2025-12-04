export type AttestationState = {
    attestationSteps: AttestationSteps;
    challenge?: Challenge;
    evidence?: Evidence;
    verification?: Verification;
};

export type Challenge = { value?: string; isFresh?: boolean };

export type Evidence = {
    quote?: Quote;
    infrastructure?: Infrastructure;
    workloads?: Workloads;
};

export type Verification = {
    quote?: VerificationResult;
    infrastructure?: VerificationResult;
    workloads?: VerificationResult;
};

export type Quote = {
    [key: string]: unknown;
    tdQuoteBody: {
        [key: string]: unknown;
        reportData: string;
    };
};

export type Infrastructure = {
    summary: InfrastructureSummary;
    instance: Instance;
    disk: Disk;
    reportData: string;
};

export type InfrastructureSummary = {
    provider: string;
    instanceId: string;
    name: string;
    zone: string;
    machineType: string;
    status: string;
    projectId?: string;
    Subscription?: string;
};

/**
 * Complete Instance interface at:
 * https://cloud.google.com/compute/docs/reference/rest/v1/instances
 */
export type Instance = {
    [key: string]: unknown;
    name: string;
    confidentialInstanceConfig: {
        enableConfidentialCompute?: boolean;
        confidentialInstanceType?: string;
    };
    cpuPlatform: string;
};

/**
 * Complete Disk interface at:
 * https://cloud.google.com/compute/docs/reference/rest/v1/disks
 */
export type Disk = {
    [key: string]: unknown;
    name: string;
};

export type Workloads = {
    containers: Container[];
    images: Image[];
    reportData: string;
};

export type Container = {
    id: string;
    name: string;
    image: string;
    imageDigest: string;
    state: string;
    startedAt: string;
    labels?: { [key: string]: string };
};

export type Image = {
    id: string;
    repoTags: string[];
    repoDigests: string[];
    created: string;
    size: number;
    labels?: { [key: string]: string };
};

export type AttestationSteps = {
    generateChallenge: {
        status: AttestationStepStatus;
        error?: string;
    };
    gatherEvidence: {
        status: AttestationStepStatus;
        error?: string;
    };
    verifyEvidence: {
        status: AttestationStepStatus;
        error?: string;
    };
};

export type AttestationStepStatus = 'pending' | 'active' | 'done' | 'error';

export type UpdateStepPayload = {
    step: keyof AttestationSteps;
    status: 'pending' | 'active' | 'done' | 'error';
};

export enum TrustStatus {
    TRUSTED = 'trusted',
    UNTRUSTED = 'untrusted',
    UNKNOWN = 'unknown',
}

export enum VerificationStatus {
    PASSED = 'passed',
    FAILED = 'failed',
    PENDING = 'pending',
}

export enum ChallengeFreshnessStatus {
    FRESH = 'fresh',
    STALE = 'stale',
    UNKNOWN = 'unknown',
}

export enum ChallengeGenerationMode {
    AUTOMATIC = 'automatic',
    MANUAL = 'manual',
}

export enum ArtifactType {
    CHALLENGE = 'challenge',
    QUOTE_EVIDENCE = 'quote',
    WORKLOAD_EVIDENCE = 'workload',
    INFRASTRUCTURE_EVIDENCE = 'infrastructure',
    INSTANCE_DISK = 'instanceDisk',
    INSTANCE_IDENTITY = 'instanceIdentity',
    CONTAINER = 'container',
    QUOTE_VERIFICATION = 'quoteVerification',
    WORKLOAD_VERIFICATION = 'workloadVerification',
    INFRASTRUCTURE_VERIFICATION = 'infrastructureVerification',
}

export enum VerificationType {
    QUOTE = 'quote',
    WORKLOAD = 'workload',
    INFRASTRUCTURE = 'infrastructure',
}

export type AttestationStepArtifact = {
    name: ArtifactType;
    value:
        | Challenge
        | Quote
        | Infrastructure
        | Workloads
        | VerificationResult
        | undefined;
    action: () => void;
    trustStatus?: TrustStatus;
    verificationStatus?: VerificationStatus;
};

export type AttestationStepAction = {
    name: string;
    fn: () => void;
};

export type VerificationResult = {
    isVerified: boolean;
    message: string;
    timestamp: string;
    verifiedBootDiskSourceImage?: string;
    verifiedBootDiskSourceImageID?: string;
    goldenImageDigest?: string;
    providedImageDigest?: string;
    referenceImage?: string;
};
