import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
    activeMenuItemId: string | null;
}

const initialState: MenuState = {
    activeMenuItemId: typeof window !== 'undefined' ? sessionStorage.getItem('activeMenuItemId') || null : null,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setActiveMenuItem(state, action: PayloadAction<string>) {
            state.activeMenuItemId = action.payload;
            typeof window !== 'undefined' && sessionStorage.setItem('activeMenuItemId', action.payload);
            console.log(state.activeMenuItemId);
        },
    },
});

export const { setActiveMenuItem } = menuSlice.actions;
export default menuSlice.reducer;