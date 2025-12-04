import { configureStore } from '@reduxjs/toolkit';

import { attestationSlice } from '../features/attestation';

export const store = configureStore({
    reducer: {
        attestation: attestationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
