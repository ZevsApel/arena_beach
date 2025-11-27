"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/slice";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { resetBooking } from "@/lib/redux/slices/booking/booking";
import DatePicker from "./DatePicker/DatePicker";
import GuestsPopover from "./GuestPopover/GuestPopover";
import "./SearchPanel.scss";

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

  // 👇 вычисляемые значения по новой структуре rooms[]
  const totalRooms = booking.rooms.length;
  const totalAdults = booking.rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = booking.rooms.reduce((sum, room) => sum + room.children, 0);

  const formatDisplay = () => {
    const inDate = booking.checkIn
      ? new Date(booking.checkIn).toLocaleDateString()
      : "";
    const outDate = booking.checkOut
      ? new Date(booking.checkOut).toLocaleDateString()
      : "";

    return (
      <div className="panel-form">
        <div className="panel-choose-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19.3164 6.78067V12.14C19.3164 16.9067 19.3074 17.5252 19.2471 17.7367C19.0617 18.3749 18.5225 18.9183 17.8887 19.1166C17.6344 19.1941 17.355 19.1986 9.6582 19.1986C1.95754 19.1986 1.68115 19.1942 1.42676 19.1166C0.793129 18.9182 0.254696 18.3747 0.0693359 17.7367C0.00903594 17.5252 0 16.9069 0 12.14V6.78067H19.3164ZM4.91504 14.3822C4.50121 14.3779 4.09574 14.3914 4.02246 14.4086C3.41067 14.564 3.29425 15.3223 3.83691 15.6371C3.97489 15.719 4.05731 15.7279 4.8291 15.7279C5.6004 15.7279 5.68249 15.7189 5.82031 15.6371C6.28166 15.3655 6.28166 14.7535 5.82031 14.4818C5.6868 14.4001 5.58716 14.3908 4.91504 14.3822ZM9.74414 14.3822C9.33031 14.3779 8.92485 14.3914 8.85156 14.4086C8.23975 14.564 8.12333 15.3223 8.66602 15.6371C8.80399 15.719 8.88641 15.7279 9.6582 15.7279C10.4295 15.7279 10.5116 15.7189 10.6494 15.6371C11.1108 15.3655 11.1108 14.7535 10.6494 14.4818C10.5159 14.4001 10.4163 14.3909 9.74414 14.3822ZM14.5732 14.3822C14.1594 14.3779 13.7539 14.3914 13.6807 14.4086C13.0688 14.564 12.9524 15.3223 13.4951 15.6371C13.6331 15.719 13.7155 15.7279 14.4873 15.7279C15.2586 15.7279 15.3407 15.7189 15.4785 15.6371C15.9399 15.3655 15.9399 14.7535 15.4785 14.4818C15.345 14.4001 15.2454 14.3909 14.5732 14.3822ZM4.91504 10.2436C4.50121 10.2393 4.09574 10.2517 4.02246 10.269C3.41049 10.4243 3.29395 11.1837 3.83691 11.4984C3.97489 11.5804 4.05731 11.5883 4.8291 11.5883C5.59996 11.5883 5.68264 11.5801 5.82031 11.4984C6.28166 11.2268 6.28166 10.6138 5.82031 10.3422C5.6869 10.2606 5.58683 10.2522 4.91504 10.2436ZM9.74414 10.2436C9.33031 10.2393 8.92485 10.2517 8.85156 10.269C8.23957 10.4243 8.12303 11.1837 8.66602 11.4984C8.80399 11.5804 8.88641 11.5883 9.6582 11.5883C10.4291 11.5883 10.5117 11.5801 10.6494 11.4984C11.1108 11.2268 11.1108 10.6138 10.6494 10.3422C10.516 10.2605 10.416 10.2522 9.74414 10.2436ZM14.5732 10.2436C14.1594 10.2393 13.7539 10.2517 13.6807 10.269C13.0686 10.4243 12.9521 11.1837 13.4951 11.4984C13.6331 11.5804 13.7155 11.5883 14.4873 11.5883C15.2582 11.5883 15.3408 11.5801 15.4785 11.4984C15.9399 11.2268 15.9399 10.6138 15.4785 10.3422C15.3451 10.2605 15.2451 10.2522 14.5732 10.2436ZM13.418 0.0873108C13.612 -0.0291047 13.9827 -0.0291047 14.1768 0.0873108C14.431 0.24247 14.4873 0.393143 14.4873 0.914459V1.38028H16.0566C17.4742 1.38028 17.6518 1.38915 17.8887 1.46231C18.5225 1.66064 19.0616 2.2041 19.2471 2.84219C19.3031 3.03189 19.3164 3.31211 19.3164 4.29922V5.51993H0V4.29922C2.75405e-06 3.31211 0.0132901 3.03189 0.0693359 2.84219C0.254731 2.20422 0.793115 1.66072 1.42676 1.46231C1.6639 1.38901 1.84122 1.38028 3.25977 1.38028H4.8291V0.914459C4.82913 0.393101 4.88535 0.242483 5.13965 0.0873108C5.23443 0.0269968 5.35921 0.000439327 5.51855 0.000396729C5.79881 0.000396729 5.9937 0.103985 6.12305 0.310944C6.19632 0.431627 6.20898 0.531062 6.20898 0.914459V1.38028H13.1074V0.914459C13.1075 0.393153 13.1637 0.242467 13.418 0.0873108Z" fill="#2D7B9E"/>
          </svg>

          {inDate && outDate ? `${inDate} - ${outDate}` : "Выбрать даты"}
        </div>

        <div className="panel-number-of-people">
          <div className="number-of-people">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
              <path d="M13.1641 9.7016C13.2922 9.80174 13.5636 10.0456 13.7715 10.2495C15.5879 12.0258 16.6444 14.4865 16.6445 16.935C16.6445 17.3951 16.6285 17.5639 16.5645 17.768C16.3723 18.4 15.8401 18.9285 15.208 19.1205C14.9601 19.2005 14.8011 19.1996 8.32227 19.1996C1.84269 19.1996 1.68445 19.2005 1.43652 19.1205C0.804448 18.9285 0.272209 18.4 0.0800781 17.768C0.0160603 17.5639 0 17.3951 0 16.935C0.000151333 14.2544 1.31291 11.4894 3.40137 9.76898C3.645 9.56531 3.70877 9.5298 3.76074 9.56976C3.79274 9.59376 3.9532 9.73712 4.11719 9.8891C4.27723 10.0371 4.57338 10.2698 4.77344 10.4018C7.21806 12.0341 10.4065 11.8057 12.5791 9.84125L12.9355 9.52094L13.1641 9.7016ZM7.38672 0.059021C7.81484 -0.0170002 8.78361 -0.0209064 9.21973 0.0551147C9.93577 0.179214 10.7043 0.494759 11.2803 0.902771C11.6484 1.16291 12.232 1.74372 12.5 2.11176C12.936 2.71989 13.2527 3.47603 13.3848 4.22015C13.4607 4.66827 13.4607 5.56401 13.3848 6.01215C13.1967 7.09245 12.6959 8.0248 11.8877 8.80902C10.8955 9.76919 9.72749 10.2377 8.32324 10.2377C7.43908 10.2377 6.74655 10.0778 5.98242 9.69379C5.49429 9.44572 5.08994 9.14906 4.67383 8.72894C3.68179 7.72481 3.20128 6.54473 3.20117 5.11664C3.20117 4.23639 3.37008 3.50393 3.74219 2.77972C4.22232 1.83547 5.09049 0.97501 6.01074 0.522888C6.43479 0.314907 6.97871 0.135029 7.38672 0.059021Z" fill="#2D7B9E"/>
            </svg>

            {totalRooms} ном., {totalAdults} взр., {totalChildren} дет.
          </div>
        </div>
      </div>
    );
  };

  const handleContinue = () => setEditingGuests(true);

  const handleReset = () => {
    dispatch(resetBooking());
  };

  const handleConfirm = () => {
    guestsRef.current?.save();
    setOpen(false);
    setEditingGuests(false);
  };


  return (
    <div className="search-panel-block">
      <div className="search-panel-form">
        <button type="button" onClick={() => setOpen(true)}>
          {formatDisplay()}
        </button>

        <button
            className={`search-button ${!(booking.checkIn && booking.checkOut) ? "disabled" : ""}`}
            disabled={!(booking.checkIn && booking.checkOut)}
            onClick={() => router.push("/rooms")}
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle cx="24" cy="24" r="24" fill="#2D7B9E" />
            <circle
              cx="22.5"
              cy="22.5"
              r="5.98611"
              fill="#2D7B9E"
              stroke="white"
              strokeWidth="2.97222"
            />
            <line
              x1="31.9492"
              y1="32.5508"
              x2="25.5852"
              y2="26.1869"
              stroke="white"
              strokeWidth="2.97222"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div ref={popoverRef} className="choose-popover">
          <div className="choose-popover-container">
              <button className="close-modal" onClick={() => { setOpen(false); setEditingGuests(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M18.9512 1.69727L11.1729 9.47559L18.9512 17.2539L17.2539 18.9512L9.47559 11.1729L1.69727 18.9512L0 17.2539L7.77832 9.47559L0 1.69727L1.69727 0L9.47559 7.77832L17.2539 0L18.9512 1.69727Z" fill="#2D7B9E"/>
                </svg>
              </button>

              {!editingGuests && <DatePicker />}

              {editingGuests && <GuestsPopover ref={guestsRef} />}

              <div className="modal-buttons">
                {!editingGuests && (
                  <>
                    <button type="button" className="transparent-button" onClick={handleReset}>
                      Очистить
                    </button>
                    <button type="button" className="regular-button" onClick={handleContinue}>
                      Продолжить
                    </button>
                  </>
                )}

                {editingGuests && (
                  <>
                    <button type="button" className="transparent-button" onClick={handleReset}>
                      Очистить
                    </button>
                    <button type="button" className="regular-button" onClick={handleConfirm}>
                      Подтвердить
                    </button>
                  </>
                )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
