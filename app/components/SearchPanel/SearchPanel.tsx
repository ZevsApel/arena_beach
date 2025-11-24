"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/slice";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { resetBooking } from "@/lib/redux/slices/booking/booking";
import DatePicker from "./DatePicker/DatePicker";
import GuestsPopover from "./GuestPopover/GuestPopover";

const BookingForm = () => {
  const booking = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [editingGuests, setEditingGuests] = useState(false);

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const guestsRef = useRef<{ save: () => void } | null>(null);

  useOutsideClick(popoverRef as React.RefObject<HTMLElement>, () => {
    guestsRef.current?.save();
    setEditingGuests(false);
  });

  const formatDisplay = () => {
    const inDate = booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : '';
    const outDate = booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : '';

    return (
      <div className="panel-form">
        <div className="panel-choose-date">
          {inDate && outDate ? `${inDate} - ${outDate}` : 'Выбрать даты'}
        </div>
        <div className="panel-number-of-people">
          <div className="number-of-people">
            {booking.rooms} ном., {booking.adults} взр., {booking.children} дет.
          </div>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    setEditingGuests(true);
  }

  const handleReset = () => {
    dispatch(resetBooking());
  }

  const handleConfirm = () => {
    guestsRef.current?.save();
    setOpen(false);
    setEditingGuests(false);
    router.push('/rooms');
  }

  return (
    <div className="search-panel-block">
      <button type="button" onClick={() => setOpen(true)}>
        {formatDisplay()}
      </button>

      {open && (
        <div ref={popoverRef} className="choose-popover">
            {!editingGuests && <DatePicker />}
            {editingGuests && <GuestsPopover ref={guestsRef} />}

            <div className="modal-buttons">
                {!editingGuests && (
                  <>
                    <button type='button' onClick={handleContinue}>Продолжить</button>
                    <button type="button" onClick={handleReset}>Очистить</button>
                  </>
                )}
                {editingGuests && (
                  <>
                    <button type="button" onClick={handleConfirm}>Подтвердить</button>
                    <button type="button" onClick={handleReset}>Очистить</button>
                  </>
                )}
            </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;