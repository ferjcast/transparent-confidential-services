/**
 * Generates a 16-byte random attestation challenge, encoded as a Base64 string.
 * Uses the Web Crypto API available in modern browsers.
 *
 * Example:
 *   const challenge = generateAttestationChallenge();
 *   // → e.g. "3q2+7wAAAAAAAAAAAAAAAAAA=="
 *
 * @returns A Base64 string representing 16 random bytes.
 */
export function generateChallenge(): string {
    const byteLength = 64;
    const randomBytes = crypto.getRandomValues(new Uint8Array(byteLength));
    return bytesToBase64(randomBytes);
}

/**
 * Encode a Uint8Array into a Base64 string.
 *
 * @param bytes - The data to encode.
 * @returns The Base64-encoded string.
 */
function bytesToBase64(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
