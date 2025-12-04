import { Link } from 'react-router-dom';

type Props = {
    furtherStyles?: string;
    linkTo?: string;
};

export function Logo({ furtherStyles, linkTo }: Props) {
    return (
        <Link
            to={linkTo ? linkTo : ''}
            className={`flex items-center justify-center rounded-xl bg-teal-900/80 text-teal-50 shadow-md transition-transform duration-300 hover:-translate-y-0.5 ${furtherStyles ?? ''} ${!linkTo ? 'cursor-default' : ''}`}
        >
            <p className="text-xl font-semibold tracking-wide lg:text-2xl">
                Confidential Data Hub
            </p>
        </Link>
    );
}
