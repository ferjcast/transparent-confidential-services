import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';

type OptionalUserState = RootState & {
    user?: {
        profilePicture?: string;
    };
};

export function ProfilePicture() {
    const profilePicture = useSelector((state: RootState) => {
        const userState = (state as OptionalUserState).user;
        return (
            userState?.profilePicture ??
            'https://placehold.co/160x160/134e4a/ffffff?text=CS'
        );
    });
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    return (
        <div className="relative mr-4 h-20 w-20">
            {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoaderCircle
                        size={30}
                        className="animate-spin text-teal-50"
                    />
                </div>
            )}
            <img
                className={`h-20 w-20 rounded-full border-2 border-white/30 object-cover shadow-lg transition-all duration-300 hover:border-white/60 ${
                    isImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
                src={profilePicture}
                alt=""
            />
        </div>
    );
}
