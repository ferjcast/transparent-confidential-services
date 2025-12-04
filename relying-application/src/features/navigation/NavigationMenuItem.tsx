import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    icon: JSX.ElementType;
    name: string;
    to: string;
};

export function NavigationMenuItem({ icon: Icon, name, to }: Props) {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-teal-500/20 text-white' : 'text-slate-200 hover:bg-slate-800/50 hover:text-white'}`
                }
            >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate text-base">{name}</span>
            </NavLink>
        </li>
    );
}
