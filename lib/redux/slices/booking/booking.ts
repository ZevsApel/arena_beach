import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Room {
  adults: number;
  children: number;
}

export interface BookingState {
  checkIn: string | null;
  checkOut: string | null;
  rooms: Room[];
}

const initialState: BookingState = {
  checkIn: null,
  checkOut: null,
  rooms: [
    { adults: 2, children: 0 } // первый номер по умолчанию
  ]
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setDates(
      state,
      action: PayloadAction<{ checkIn: string; checkOut: string }>
    ) {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },

    addRoom(state) {
      state.rooms.push({ adults: 2, children: 0 });
    },

    removeRoom(state, action: PayloadAction<number>) {
      if (state.rooms.length > 1) {
        state.rooms.splice(action.payload, 1);
      }
    },

    setAdults(
      state,
      action: PayloadAction<{ roomIndex: number; adults: number }>
    ) {
      const room = state.rooms[action.payload.roomIndex];
      if (room) room.adults = action.payload.adults;
    },

    setChildren(
      state,
      action: PayloadAction<{ roomIndex: number; children: number }>
    ) {
      const room = state.rooms[action.payload.roomIndex];
      if (room) room.children = action.payload.children;
    },

    resetBooking(state) {
      state.checkIn = null;
      state.checkOut = null;
      state.rooms = [{ adults: 2, children: 0 }];
    }
  }
});

export const {
  setDates,
  addRoom,
  removeRoom,
  setAdults,
  setChildren,
  resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;
