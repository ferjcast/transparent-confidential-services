import { ChangeEvent } from 'react';

type Props = {
    label?: string;
    width?: string;
    borderWith?: string;
    borderColor?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export function InputField({
    label,
    width,
    borderWith,
    borderColor,
    value,
    onChange,
    placeholder,
}: Props) {
    return (
        <>
            {label && (
                <label className="text-sm font-medium block">{label}</label>
            )}
            <input
                className={`${width ? width : 'w-auto'} ${borderWith ? borderWith : 'border-1'} rounded-md ${borderColor ? borderColor : 'border-teal-900/80'} px-2 p-1 text-sm focus:outline-teal-900/80`}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                // disabled={}
            />
        </>
    );
}
