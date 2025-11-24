"use client";

import { RootState } from "@/lib/redux/slice";
import { setDates } from "@/lib/redux/slices/booking/booking";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = { initialMonth?: Date }

const daysOfWeek = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const DatePicker: React.FC<Props> = ({ initialMonth }) => {
  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) => state.booking);

  const today = normalize(new Date());
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);

  const [localStart, setLocalStart] = useState<Date | null>(booking.checkIn ? new Date(booking.checkIn) : null);
  const [localEnd, setLocalEnd] = useState<Date | null>(booking.checkOut ? new Date(booking.checkOut) : null);

  const monthsToRender = [
    initialMonth ? normalize(initialMonth) : today,
    new Date(today.getFullYear(), today.getMonth() + 1, 1)
  ];

  const getDaysMatrix = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay() || 7;

    const cells: (number | null)[] = [];
    for (let i = 1; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }

  const isSelectable = (date: Date) => date >= today && date <= maxDate;
  const isInRange = (date: Date) => localStart && localEnd && date >= localStart && date <= localEnd;

  const clickDay = (year: number, month: number, day: number | null) => {
    if(!day) return;

    const picked = normalize(new Date(year, month, day));
    if(!isSelectable(picked)) return;

    if(!localStart || (localStart && localEnd)) {
      setLocalStart(picked);
      setLocalEnd(null);

      dispatch(setDates({ checkIn: picked.toISOString(), checkOut: '' }));
      return;
    }

    if(picked < localStart) {
      setLocalStart(picked);
      setLocalEnd(null);
      dispatch(setDates({ checkIn: picked.toISOString(), checkOut: '' }));
      return;
    }

    setLocalEnd(picked);

    if(localStart) {
      dispatch(setDates({ checkIn: localStart.toISOString(), checkOut: picked.toISOString() }));
    }
  };

  return (
    <div className="date-picker-container">
        <div className="months-wrapper" style={{ display: 'flex', gap: '1rem' }}>
          {monthsToRender.map((dateObj, index) => {
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth();
            const daysMatrix = getDaysMatrix(year, month);

            return (
              <div key={index}>
                <div className="current-month">
                  {monthNames[month]} {year}
                </div>
                <table>
                  <thead>
                    <tr>
                      {daysOfWeek.map(d => <th key={d}>{d}</th>)}
                    </tr>
                  </thead>
                  <tbody className="data-numers">
                    {daysMatrix.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((day, ci) => {
                          if (!day) return <td key={ci}></td>;

                          const date = normalize(new Date(year, month, day));
                          const selectable = isSelectable(date);
                          const inRange = isInRange(date);

                          return (
                            <td key={ci}>
                              <div 
                                onClick={() => clickDay(year, month, day)} 
                                className={`
                                  day-cell 
                                  ${!selectable ? 'disabled' : ''} 
                                  ${inRange ? 'selected' : ''} 
                                  ${localStart && date.getTime() === localStart.getTime() ? 'start' : ''} 
                                  ${localEnd && date.getTime() === localEnd.getTime() ? 'end' : ''}`}>

                                    {day}

                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}

        </div>
    </div>
  );
}

export default DatePicker;