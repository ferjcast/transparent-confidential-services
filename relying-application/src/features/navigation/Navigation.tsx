import { Logo } from '../../ui';
import { NavigationMenu } from './NavigationMenu';

export function Navigation() {
    return (
        <aside className="flex min-h-screen w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-teal-50 shadow-2xl lg:w-64 xl:w-72">
            <div className="px-6 pb-6 pt-8">
                <Logo
                    furtherStyles="rounded-2xl bg-teal-900/80 px-4 py-4 text-center shadow-lg"
                    linkTo="/app"
                />
            </div>
            <NavigationMenu />
        </aside>
    );
}
