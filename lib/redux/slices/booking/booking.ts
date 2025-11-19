import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
    checkIn: string | null;
    checkOut: string | null;
    adults: number;
    children: number;
    rooms: number;
}

const initialState: BookingState = {
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    rooms: 1,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setDates(state, action: PayloadAction<{ checkIn: string; checkOut: string }>) {
            state.checkIn = action.payload.checkIn;
            state.checkOut = action.payload.checkOut;
        },
        setAdults(state, action: PayloadAction<number>) {
            state.adults = action.payload;
        },
        setChildren(state, action: PayloadAction<number>) {
            state.children = action.payload;
        },
        setRooms(state, action: PayloadAction<number>) {
            state.rooms = action.payload;
        },
        resetBooking(state) {
            state.checkIn = null;
            state.checkOut = null;
            state.adults = 2;
            state.children = 0;
            state.rooms = 1;
        }
    },
});

export const { setDates, setAdults, setChildren, setRooms, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
