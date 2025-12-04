export enum ModalType {
    // Attestation Header
    INFO_ATTESTATION_PAGE = 'infoAttestationPage',

    // Attestation Timeline
    INFO_RUN_VERIFICATION = 'infoRunVerification',
    START_ATTESTATION = 'startAttestation',
    VIEW_CHALLENGE = 'viewChallenge',
    FETCH_EVIDENCE = 'fetchEvidence',
    VIEW_EVIDENCE = 'viewEvidence',
    VERIFY_EVIDENCE = 'verifyEvidence',
    VIEW_VERIFICATION_RESULT = 'viewVerificationResult',

    // Backend Summary
    INFO_CLOUD_INFRASTRUCTURE_OVERVIEW = 'infoCloudInfrastructureOverview',
    VIEW_INSTANCE_IDENTITY = 'viewInstanceIdentity',
    VIEW_INSTANCE_DISK = 'viewInstanceDisk',
    VIEW_CONTAINER = 'viewContainer',

    // Independent Verification Resources
    INFO_INDEPENDENT_VERIFICATION_RESOURCE = 'infoIndependentVerificationResource',
}
