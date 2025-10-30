import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NullableDate = string | null;

interface BookingState {
  checkIn: NullableDate;
  checkOut: NullableDate;
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
  name: "booking",
  initialState,
  reducers: {
    setDates(state, action: PayloadAction<{ checkIn: NullableDate; checkOut: NullableDate }>) {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
    setGuests(state, action: PayloadAction<{ adults: number; children: number; rooms: number }>) {
      state.adults = action.payload.adults;
      state.children = action.payload.children;
      state.rooms = action.payload.rooms;
    },
    resetBooking(state) {
      state.checkIn = null;
      state.checkOut = null;
      state.adults = 2;
      state.children = 0;
      state.rooms = 1;
    },
  },
});

export const { setDates, setGuests, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
