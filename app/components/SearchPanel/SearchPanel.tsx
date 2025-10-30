'use client';

import { useRef, useState } from "react";
import DatePicker from './DatePicker/DatePicker';
import GuestsPopover from './GuestPopover/GuestPopover';
import { useRouter } from 'next/navigation';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useAppSelector } from '../../../lib/redux/hooks';


const BookingForm = () => {

    const booking = useAppSelector(s => s.booking);
  const router = useRouter();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);

  // Отдельные refs для каждого поповера
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const guestsRef = useRef<HTMLDivElement | null>(null);

  // Закрытие при клике вне поповера
  useOutsideClick(calendarRef as React.RefObject<HTMLElement>, () => setOpenCalendar(false));
  useOutsideClick(guestsRef as React.RefObject<HTMLElement>, () => setOpenGuests(false));

  const formatRange = () => {
    if (booking.checkIn && booking.checkOut) {
      const inDate = new Date(booking.checkIn).toLocaleDateString();
      const outDate = new Date(booking.checkOut).toLocaleDateString();
      return `${inDate} - ${outDate}`;
    }
    return 'Выбрать даты';
  };

  const formatGuests = () => `${booking.rooms} ном., ${booking.adults} взр., ${booking.children} дет.`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // чтобы форма не перезагружала страницу
    router.push('/rooms');
  };

  return (
    <div className="search-panel-block">
      <form className="search-panel-form" onSubmit={handleSearch}>
        <div className="panel-choose-date">
          <button
            type="button"
            onClick={() => {
              setOpenCalendar(v => !v);
              setOpenGuests(false);
            }}
          >
            {formatRange()}
          </button>

          {openCalendar && (
            <div ref={calendarRef} style={{ position: "absolute", top: 44, zIndex: 1000 }}>
              <DatePicker onClose={() => setOpenCalendar(false)} />
            </div>
          )}
        </div>

        <div className="panel-number-of-people">
          <button
            type="button"
            onClick={() => {
              setOpenGuests(v => !v);
              setOpenCalendar(false);
            }}
          >
            {formatGuests()}
          </button>

          {openGuests && (
            <div ref={guestsRef} style={{ position: "absolute", top: 44, zIndex: 1000 }}>
              <GuestsPopover onClose={() => setOpenGuests(false)} />
            </div>
          )}
        </div>

        <div className="search-button">
          <button
            type="submit"
            style={{ background: "#2563eb", color: "#fff", padding: "8px 12px", borderRadius: 6 }}
          >
            Найти
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;