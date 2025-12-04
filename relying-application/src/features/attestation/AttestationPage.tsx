import { AttestationHeader } from './components/AttestationHeader';
import { CloudInfrastructureOverview } from './components/CloudInfrastructureOverview';
import IndependentVerificationResources from './components/IndependentVerificationResources/IndependentVerificationResources';
import { AttestationTimeline } from './components/Timeline';

export function AttestationPage() {
    return (
        <main className="flex flex-1 min-h-0 flex-col bg-slate-900 text-slate-100 text-[15px]">
            <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col gap-6 px-2 py-4 sm:px-4 lg:px-5">
                <AttestationHeader />
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <div className="flex flex-col gap-5 pb-6">
                        <AttestationTimeline />
                        <CloudInfrastructureOverview />
                        <IndependentVerificationResources />
                    </div>
                </div>
            </div>
        </main>
    );
}
