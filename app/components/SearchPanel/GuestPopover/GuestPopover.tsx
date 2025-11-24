"use client";

import { RootState } from "@/lib/redux/slice";
import { setAdults, setChildren, setRooms } from "@/lib/redux/slices/booking/booking";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";

const GuestsPopover = forwardRef((_, ref) => {
  const dispath = useDispatch();
  const booking = useSelector((state: RootState) => state.booking);

  const save = () => {}

  useImperativeHandle(ref, () => ({
    save,
  }));

  return (
    <div className="guests-popover">
      <div className="guests-row">
        <span>Взрослые</span>
        <button type="button" onClick={() => dispath(setAdults(Math.max(1, booking.adults - 1)))}>-</button>
        <span>{booking.adults}</span>
        <button type="button" onClick={() => dispath(setAdults(booking.adults + 1))}>+</button>
      </div>

      <div className="guests-row">
        <span>Дети</span>
        <button type="button" onClick={() => dispath(setChildren(Math.max(0, booking.children - 1)))}>-</button>
        <span>{booking.children}</span>
        <button type="button" onClick={() => dispath(setChildren(booking.children + 1))}>+</button>
      </div>

      <div className="guests-row">
        <span>Номера</span>
        <button type="button" onClick={() => dispath(setRooms(Math.max(1, booking.rooms - 1)))}>-</button>
        <span>{booking.rooms}</span>
        <button type="button" onClick={() => dispath(setRooms(booking.rooms + 1))}>+</button>
      </div>
    </div>
  );
});

GuestsPopover.displayName = 'GuestsPopover';
export default GuestsPopover;