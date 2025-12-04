import { Header } from './Header';
import { InfrastructureSummary } from './Infrastructure';
import { WorkloadsSummary } from './Workloads';

/**
 * Displays attestation results in a structured and user-friendly format.
 * Includes summaries of confidential infrastructure and workload integrity, fulfilling transparency requirement T2.
 * Exposes container image metadata, such as hashes and repository origins, fulfilling code integrity requirement CI2.
 */
export function CloudInfrastructureOverview() {
    return (
        <div className="rounded-2xl bg-slate-900/60 p-6 text-slate-100">
            <Header />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <InfrastructureSummary />
                <WorkloadsSummary />
            </div>
        </div>
    );
}
