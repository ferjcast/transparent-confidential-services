import { Evidence } from '../types/attestation';

export function computeChallengeFreshness(
    challenge: string,
    evidence: Evidence,
) {
    if (!challenge || !evidence) return false;

    let isFresh: boolean;

    const evidenceKeys = ['quote', 'infrastructure', 'workloads'] as const;

    for (const key of evidenceKeys) {
        if (!evidence[key]) continue;

        switch (key) {
            case 'quote':
                isFresh = evidence[key].tdQuoteBody.reportData === challenge;
                break;
            case 'infrastructure':
                isFresh = evidence[key]?.reportData === challenge;
                break;
            case 'workloads':
                isFresh = evidence[key]?.reportData === challenge;
                break;
            default:
                isFresh = false;
                break;
        }

        return isFresh;
    }
}
