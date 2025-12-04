import {
    ArtifactType,
    Challenge,
    ChallengeFreshnessStatus,
    TrustStatus,
    Verification,
    VerificationStatus,
} from '../types/attestation';

export function computeTrustStatus(
    artifact: ArtifactType,
    verification: Verification | undefined,
    challenge?: Challenge | undefined,
) {
    switch (artifact) {
        case ArtifactType.CHALLENGE: {
            if (!challenge?.isFresh) return ChallengeFreshnessStatus.UNKNOWN;
            return challenge.isFresh
                ? ChallengeFreshnessStatus.FRESH
                : ChallengeFreshnessStatus.STALE;
        }
        case ArtifactType.QUOTE_EVIDENCE: {
            if (!verification?.quote) return TrustStatus.UNKNOWN;
            return verification.quote.isVerified
                ? TrustStatus.TRUSTED
                : TrustStatus.UNTRUSTED;
        }
        case ArtifactType.QUOTE_VERIFICATION: {
            if (!verification?.quote) return VerificationStatus.PENDING;
            return verification.quote.isVerified
                ? VerificationStatus.PASSED
                : VerificationStatus.FAILED;
        }
        case ArtifactType.WORKLOAD_EVIDENCE: {
            if (!verification?.workloads) return TrustStatus.UNKNOWN;
            return verification.workloads.isVerified
                ? TrustStatus.TRUSTED
                : TrustStatus.UNTRUSTED;
        }
        case ArtifactType.WORKLOAD_VERIFICATION: {
            if (!verification?.workloads) return VerificationStatus.PENDING;
            return verification.workloads.isVerified
                ? VerificationStatus.PASSED
                : VerificationStatus.FAILED;
        }
        case ArtifactType.INFRASTRUCTURE_EVIDENCE: {
            if (!verification?.infrastructure) return TrustStatus.UNKNOWN;
            return verification.infrastructure.isVerified
                ? TrustStatus.TRUSTED
                : TrustStatus.UNTRUSTED;
        }
        case ArtifactType.INFRASTRUCTURE_VERIFICATION: {
            if (!verification?.infrastructure)
                return VerificationStatus.PENDING;
            return verification.infrastructure.isVerified
                ? VerificationStatus.PASSED
                : VerificationStatus.FAILED;
        }
        default:
            return TrustStatus.UNKNOWN;
    }
}

export function computeVerificationStatus(
    artifact: 'quote' | 'workloads' | 'infrastructure',
    verification: Verification | undefined,
) {
    if (!verification?.[artifact]?.isVerified)
        return VerificationStatus.PENDING;

    return verification?.[artifact]?.isVerified
        ? VerificationStatus.PASSED
        : VerificationStatus.FAILED;
}
