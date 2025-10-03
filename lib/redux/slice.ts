import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './slices/uiSlice';
import emailReducer from './slices/emailSLice';
import menuReducer from './slices/dashboard/menu/menuSlice';
import modalReducer from './slices/modal/modalSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        email: emailReducer,
        menuItem: menuReducer,
        modal: modalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;