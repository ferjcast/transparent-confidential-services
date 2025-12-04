import axios from 'axios';

import { Infrastructure, Quote, Workloads } from '../types/attestation';

const ATTESTER_URL: string = import.meta.env.VITE_ATTESTER_URL;
console.info(`ATTESTER_URL: ${ATTESTER_URL}`);

/**
 * Function that communicates with a third-party evidence provider service. It retrieves an attestation quote from a TDX TEE.
 *
 * @param challenge
 * @returns a valid TDX attestation quote.
 */
export async function fetchTdxQuote(challenge: string): Promise<Quote> {
    try {
        const { data } = await axios.post(
            `${ATTESTER_URL}/evidence/tdx-quote`,
            { challenge: challenge },
            { timeout: 3000 },
        );

        const quote: Quote = data.data.quote;
        return quote;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out - Quote not available');
        }
        throw new Error('Error retrieving the quote');
    }
}

export async function fetchInfrastructure(
    challenge: string,
): Promise<Infrastructure> {
    try {
        const { data } = await axios.post(
            `${ATTESTER_URL}/evidence/infrastructure`,
            { challenge: challenge },
            { timeout: 3000 },
        );

        const infrastructure: Infrastructure = data.data;
        return infrastructure;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out – Instance not available');
        }
        throw new Error('Error retrieving the infrastructure');
    }
}

export async function fetchWorkloads(challenge: string): Promise<Workloads> {
    try {
        const { data } = await axios.post(
            `${ATTESTER_URL}/evidence/workload`,
            { challenge: challenge },
            { timeout: 3000 },
        );

        const workloads: Workloads = data.data;
        return workloads;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            throw new Error('Request timed out – Workloads not available');
        }
        throw new Error('Error retrieving workloads');
    }
}
