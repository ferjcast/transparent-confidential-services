import * as changeCase from 'change-case';

type Props = {
    name: string;
    value: string;
};

export function InstanceAttribute({ name, value }: Props) {
    return (
        <div className="flex flex-col gap-1 text-sm text-slate-100 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-slate-200">
                {changeCase.sentenceCase(name)}:
            </p>
            <p className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2 py-1 font-semibold text-white backdrop-blur-sm">
                {value ?? 'Unknown'}
            </p>
        </div>
    );
}
