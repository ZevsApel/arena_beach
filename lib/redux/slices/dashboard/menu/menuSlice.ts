import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
    activeMenuItemId: string | null;
}

const initialState: MenuState = {
    activeMenuItemId: null
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setActiveMenuItem(state, action: PayloadAction<string>) {
            state.activeMenuItemId = action.payload;
        },
    },
});

export const { setActiveMenuItem } = menuSlice.actions;
export default menuSlice.reducer;