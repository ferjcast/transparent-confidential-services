import { BadgeAlert, BadgeCheck, BadgeHelp } from 'lucide-react';
import { useSelector } from 'react-redux';

import { getChallenge, getVerification } from '../../attestationSlice';
import {
    ArtifactType,
    ChallengeFreshnessStatus,
    TrustStatus,
    VerificationStatus,
} from '../../types/attestation';
import { computeTrustStatus } from '../../utils/computeVerification';

type Props = {
    forArtifact: ArtifactType;
    size?: 'sm' | 'md';
    emphasized?: boolean;
};

export function TrustStatusBadge({
    forArtifact,
    size = 'sm',
    emphasized = false,
}: Props) {
    const verification = useSelector(getVerification);
    const challenge = useSelector(getChallenge);
    const trustStatus = computeTrustStatus(
        forArtifact,
        verification,
        challenge,
    );

    return (
        <div
            className={`flex items-center py-0.5 px-1 rounded-md gap-1 ${size === 'sm' ? 'text-xs' : ''} ${size === 'md' ? 'text-sm' : ''} ${emphasized ? 'font-semibold' : 'opacity-75 font-medium'} ${
                trustStatus === TrustStatus.TRUSTED ||
                trustStatus === VerificationStatus.PASSED ||
                trustStatus === ChallengeFreshnessStatus.FRESH
                    ? 'text-green-700'
                    : trustStatus === TrustStatus.UNTRUSTED ||
                        trustStatus === VerificationStatus.FAILED ||
                        trustStatus === ChallengeFreshnessStatus.STALE
                      ? 'text-red-700'
                      : 'text-amber-600'
            }`}
        >
            <span>
                {(trustStatus === TrustStatus.TRUSTED ||
                    trustStatus === VerificationStatus.PASSED ||
                    trustStatus === ChallengeFreshnessStatus.FRESH) && (
                    <BadgeCheck size={size === 'sm' ? 15 : 20} />
                )}
                {(trustStatus === TrustStatus.UNTRUSTED ||
                    trustStatus === VerificationStatus.FAILED ||
                    trustStatus === ChallengeFreshnessStatus.STALE) && (
                    <BadgeAlert size={size === 'sm' ? 15 : 20} />
                )}
                {(trustStatus === TrustStatus.UNKNOWN ||
                    trustStatus === VerificationStatus.PENDING ||
                    trustStatus === ChallengeFreshnessStatus.UNKNOWN) && (
                    <BadgeHelp size={size === 'sm' ? 15 : 20} />
                )}
            </span>
            <p className="capitalize">{trustStatus}</p>
        </div>
    );
}
