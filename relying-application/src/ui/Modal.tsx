import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export function Modal({ isOpen, onClose, children }: Props) {
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative w-[min(92vw,900px)] max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-700/60 bg-slate-900/95 p-6 text-slate-100 shadow-2xl">
                <button
                    className="absolute right-4 top-4 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-800/70 text-slate-200 transition-colors duration-200 hover:bg-teal-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>,
        document.body,
    );
}
