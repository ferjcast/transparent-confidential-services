type InfoButtonProps = {
    onClick: () => void;
    ariaLabel?: string;
    className?: string;
};

export function InfoButton({ onClick, ariaLabel, className }: InfoButtonProps) {
    return (
        <button
            type="button"
            aria-label={ariaLabel ?? 'Open contextual information'}
            onClick={onClick}
            className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-transparent bg-slate-800/70 text-sm font-semibold text-white transition-colors duration-200  hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${className ?? ''}`}
        >
            ?
        </button>
    );
}
