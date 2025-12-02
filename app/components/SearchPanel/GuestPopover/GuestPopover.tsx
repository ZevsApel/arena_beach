"use client";

import { RootState } from "@/lib/redux/slice";
import { setAdults, setChildren, addRoom, removeRoom } from "@/lib/redux/slices/booking/booking";
import { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import './GuestPopover.scss';

const GuestsPopover = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) => state.booking);

  const save = () => {};

  useImperativeHandle(ref, () => ({
    save
  }));

  return (
    <div className="guests-popover">
      <div className="guests-popover-title-container">
          <p className="guests-popover-title">Гости и номера</p>
      </div>
      <div className="guests-popover-container">
        {booking.rooms.map((room, i) => (
            <div key={i} className="room-block">
              <div className="room-title-row">
                <span className="guests-popover-title number-name">Номер {i + 1}</span>

                {booking.rooms.length > 1 && (
                  <button
                    type="button"
                    className="remove-room-btn"
                    onClick={() => dispatch(removeRoom(i))}
                  >
                    Удалить
                  </button>
                )}
              </div>

              <div className="guests-row">
                <div className="guests-name-block">
                    <p className="guests-name">Взрослые</p>
                    <p className="guests-name-note">от 18 лет</p>
                </div>
                <div className="guests-change">
                  <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setAdults({
                            roomIndex: i,
                            adults: Math.max(1, room.adults - 1)
                          })
                        )
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="3" viewBox="0 0 25 3" fill="none">
                        <path d="M24.4004 2.40039H0V0H24.4004V2.40039Z" fill="#2D7B9E"/>
                      </svg>
                    </button>
                    <span className="guests-name">{room.adults}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setAdults({
                            roomIndex: i,
                            adults: room.adults + 1
                          })
                        )
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M13.4004 11H24.4004V13.4004H13.4004V24.4004H11V13.4004H0V11H11V0H13.4004V11Z" fill="#2D7B9E"/>
                      </svg>
                  </button>
                </div>
              </div>

              <div className="guests-row">
                <div className="guests-name-block">
                    <p className="guests-name">Дети</p>
                    <p className="guests-name-note">3-17 лет</p>
                </div>
                <div className="guests-change">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setChildren({
                            roomIndex: i,
                            children: Math.max(0, room.children - 1)
                          })
                        )
                      }
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="3" viewBox="0 0 25 3" fill="none">
                      <path d="M24.4004 2.40039H0V0H24.4004V2.40039Z" fill="#2D7B9E"/>
                    </svg>
                    </button>
                    <span>{room.children}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setChildren({
                            roomIndex: i,
                            children: room.children + 1
                          })
                        )
                      }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M13.4004 11H24.4004V13.4004H13.4004V24.4004H11V13.4004H0V11H11V0H13.4004V11Z" fill="#2D7B9E"/>
                      </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="add-room-btn"
            onClick={() => dispatch(addRoom())}
          >
            + Добавить номер
          </button>
      </div>
    </div>
  );
});

GuestsPopover.displayName = "GuestsPopover";
export default GuestsPopover;