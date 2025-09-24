import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './slices/uiSlice';
import emailReducer from './slices/emailSLice';
import menuReducer from './slices/dashboard/menu/menuSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        email: emailReducer,
        menuItem: menuReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;