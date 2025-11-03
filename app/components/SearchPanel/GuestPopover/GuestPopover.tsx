'use client';

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setGuests } from "@/lib/redux/slices/booking/booking";
import { forwardRef, useImperativeHandle, useState } from "react";

const GuestsPopover = forwardRef((_, ref) => {
  const dispatch = useAppDispatch();
  const { adults, children, rooms } = useAppSelector(s => s.booking);

  const [localAdults, setLocalAdults] = useState(adults);
  const [localChildren, setLocalChildren] = useState(children);
  const [localRooms, setLocalRooms] = useState(rooms);

  // Автоматически сохраняем изменения в Redux
  const saveState = () => {
    dispatch(setGuests({ adults: localAdults, children: localChildren, rooms: localRooms }));
  };

  useImperativeHandle(ref, () => ({
    save() {
      saveState();
    }
  }));

  return (
    <div>
      <div>
        <span>Взрослые</span>
        <div>
          <button type="button" onClick={() => { setLocalAdults(Math.max(1, localAdults - 1)); saveState(); }}>-</button>
          <span>{localAdults}</span>
          <button type="button" onClick={() => { setLocalAdults(localAdults + 1); saveState(); }}>+</button>
        </div>
      </div>

      <div>
        <span>Дети</span>
        <div>
          <button type="button" onClick={() => { setLocalChildren(Math.max(0, localChildren - 1)); saveState(); }}>-</button>
          <span>{localChildren}</span>
          <button type="button" onClick={() => { setLocalChildren(localChildren + 1); saveState(); }}>+</button>
        </div>
      </div>

      <div>
        <span>Номера</span>
        <div>
          <button type="button" onClick={() => { setLocalRooms(Math.max(1, localRooms - 1)); saveState(); }}>-</button>
          <span>{localRooms}</span>
          <button type="button" onClick={() => { setLocalRooms(localRooms + 1); saveState(); }}>+</button>
        </div>
      </div>
    </div>
  );
});

GuestsPopover.displayName = "GuestsPopover";
export default GuestsPopover;
