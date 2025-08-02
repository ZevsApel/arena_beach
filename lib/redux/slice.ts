import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './slices/uiSlice';
import emailReducer from './slices/emailSLice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        email: emailReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;