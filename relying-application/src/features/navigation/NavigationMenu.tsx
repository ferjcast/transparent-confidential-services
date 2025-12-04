import { navigationItems } from '../../config/navigation';
import { NavigationMenuItem } from './NavigationMenuItem';

export function NavigationMenu() {
    return (
        <nav className="flex flex-1 flex-col px-6 pb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-teal-200/60">
                Navigation
            </h2>
            <ul className="flex flex-col gap-3">
                {navigationItems.map((item) => (
                    <NavigationMenuItem
                        key={item.name}
                        icon={item.icon}
                        name={item.name}
                        to={item.to}
                    />
                ))}
            </ul>
        </nav>
    );
}
