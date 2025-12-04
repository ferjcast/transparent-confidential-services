import { CheckCircle2, UploadCloud } from 'lucide-react';
import { ChangeEvent, DragEvent, useCallback, useMemo, useState } from 'react';

export function DataSharingPage() {
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const handleDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback(
        (event: DragEvent<HTMLLabelElement>) => {
            event.preventDefault();
            setIsDragActive(false);
        },
        [],
    );

    const handleDrop = useCallback((event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragActive(false);
        const file = event.dataTransfer.files?.[0];
        if (file) setSelectedFile(file.name);
    }, []);

    const handleFileInput = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) setSelectedFile(file.name);
        },
        [],
    );

    const dropzoneClasses = useMemo(
        () =>
            `group flex w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 transition-colors duration-200 ${
                isDragActive
                    ? 'border-teal-300/80 bg-teal-500/10'
                    : 'border-slate-700/70 bg-slate-900/40 hover:border-teal-300/60 hover:bg-slate-900/60'
            }`,
        [isDragActive],
    );

    return (
        <main className="flex flex-1 flex-col items-center justify-center bg-slate-950 px-4 py-12">
            <div className="flex max-w-3xl flex-col items-center gap-6 rounded-3xl bg-white/5 px-8 py-12 text-center text-slate-100 shadow-2xl backdrop-blur-md md:px-10">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-teal-200/70">
                    Secure data workflows
                </p>
                <p className="text-4xl font-semibold leading-tight md:text-5xl">
                    Data Sharing
                </p>
                <p className="text-base text-slate-300/90 md:text-lg">
                    This showcase represents the step where you would upload
                    confidential records for processing inside a Trusted
                    Execution Environment. Run the attestation checks first,
                    then come back here to transmit your data with confidence.
                </p>

                <div className="mt-4 w-full max-w-xl space-y-4 text-left">
                    <label
                        className={dropzoneClasses}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <UploadCloud className="mb-4 h-12 w-12 text-teal-200 transition-colors duration-200 group-hover:text-teal-100" />
                        <span className="text-lg font-semibold text-slate-100">
                            Drag &amp; drop your dataset here
                        </span>
                        <span className="mt-2 text-sm text-slate-300">
                            or{' '}
                            <span className="text-teal-200">
                                browse your files
                            </span>
                        </span>
                        <span className="mt-3 text-xs text-slate-500">
                            Simulation only: files never leave this demo.
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileInput}
                        />
                    </label>

                    {selectedFile && (
                        <div className="flex items-center gap-3 rounded-2xl border border-teal-400/40 bg-teal-500/10 px-4 py-3 text-sm text-teal-100">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                            <div>
                                <p className="font-semibold">
                                    Ready for secure transfer
                                </p>
                                <p className="text-xs text-teal-200/80">
                                    {selectedFile}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
