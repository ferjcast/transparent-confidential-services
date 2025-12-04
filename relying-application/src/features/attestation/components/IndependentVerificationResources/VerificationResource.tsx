import { Link2 } from 'lucide-react';

type Props = {
    name: string;
    description?: string;
    resourceLink: string;
    linkPlaceholder: string;
};

export function VerificationResource({
    name,
    description,
    resourceLink,
    linkPlaceholder,
}: Props) {
    return (
        <div className="flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">{name}</h3>
                {description && (
                    <p className="text-sm text-slate-200/80">{description}</p>
                )}
            </div>
            <a
                className="mt-auto inline-flex items-center gap-2 self-start rounded-full border border-teal-200/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal-50 transition-colors duration-300 hover:bg-teal-500/20"
                href={resourceLink}
                target="_blank"
                rel="noreferrer"
            >
                <Link2 />
                {linkPlaceholder}
            </a>
        </div>
    );
}
