import { Navigate, Route, Routes } from 'react-router-dom';

import { AttestationPage } from './features/attestation';
import { DataSharingPage } from './features/data-sharing';
import { AppLayout, OverviewPage } from './ui';

export function App() {
    return (
        <div className="font-quicksand flex h-full w-full">
            <Routes>
                <Route path="/" element={<Navigate to="/app" replace />} />
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<OverviewPage />} />
                    <Route path="data-sharing" element={<DataSharingPage />} />
                    <Route path="attestation" element={<AttestationPage />} />
                </Route>
            </Routes>
        </div>
    );
}
