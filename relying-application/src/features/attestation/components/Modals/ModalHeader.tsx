type Props = {
    title?: string;
    icon?: React.ReactNode;
};

export function ModalHeader({ title, icon }: Props) {
    return (
        <div className="flex w-fit items-center gap-3 rounded-lg bg-slate-800/60 px-3 py-2">
            {icon && (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 text-teal-300">
                    {icon}
                </span>
            )}
            {title && (
                <h2 className="text-lg font-semibold text-slate-100">
                    {title}
                </h2>
            )}
        </div>
    );
}
