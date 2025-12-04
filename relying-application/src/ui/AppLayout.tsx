import { Outlet } from 'react-router-dom';

import { Navigation } from '../features/navigation';

export function AppLayout() {
    return (
        <div className="flex w-full min-h-screen bg-slate-950">
            <Navigation />
            <div className="flex flex-1 min-h-0 overflow-hidden bg-slate-900">
                <Outlet />
            </div>
        </div>
    );
}
