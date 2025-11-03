'use client';

import React, { useMemo, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setDates } from "@/lib/redux/slices/booking/booking";

type Props = { initialMonth?: Date; }

const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const daysOfWeek = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

const DatePicker: React.FC<Props> = ({ initialMonth }) => {
  const dispatch = useAppDispatch();
  const today = normalize(new Date());

  const [viewDate, setViewDate] = useState<Date>(initialMonth ? normalize(initialMonth) : today);
  const [localStart, setLocalStart] = useState<Date | null>(null);
  const [localEnd, setLocalEnd] = useState<Date | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const getDaysInMonth = (y:number, m:number) => new Date(y, m+1, 0).getDate();
  const getFirstDay = (y:number, m:number) => {
    const d = new Date(y, m, 1).getDay();
    return d === 0 ? 7 : d;
  };

  const daysMatrix = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDay(year, month);
    const cells: (number | null)[] = [];
    for (let i=1;i<firstDay;i++) cells.push(null);
    for (let d=1;d<=daysInMonth;d++) cells.push(d);
    while(cells.length%7!==0) cells.push(null);
    const rows: (number|null)[][] = [];
    for(let i=0;i<cells.length;i+=7) rows.push(cells.slice(i,i+7));
    return rows;
  }, [year, month]);

  const clickDay = (day: number | null) => {
    if (!day) return;
    const picked = normalize(new Date(year, month, day));

    if (!localStart || (localStart && localEnd)) {
      setLocalStart(picked);
      setLocalEnd(null);
      dispatch(setDates({ checkIn: picked.toISOString(), checkOut: null }));
      return;
    }

    if (picked < localStart) {
      setLocalStart(picked);
      setLocalEnd(null);
      dispatch(setDates({ checkIn: picked.toISOString(), checkOut: null }));
      return;
    }

    setLocalEnd(picked);

    if (localStart) {
      dispatch(setDates({ checkIn: localStart.toISOString(), checkOut: picked.toISOString() }));
    }
  };

  const prevMonth = () => setViewDate(new Date(year, month-1, 1));
  const nextMonth = () => setViewDate(new Date(year, month+1, 1));

  const isSameDay = (a: Date | null, b: Date | null) => a !== null && b !== null && a.getTime() === b.getTime();
  const inRange = (date: Date) => localStart !== null && localEnd !== null && date >= localStart && date <= localEnd;

  return (
    <div className="date-picker-container">
      <div className="picker-month-block">
        <button type="button" onClick={prevMonth} className="change-month-button prev-month">←</button>
        <div className="current-month">{monthNames[month]} {year}</div>
        <button type="button" onClick={nextMonth} className="change-month-button next-month">→</button>
      </div>

      <table className="date-table">
        <thead className="days-name">
          <tr>
            {daysOfWeek.map(d => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody className="data-numbers">
          {daysMatrix.map((row, ri) => (
            <tr key={ri}>
              {row.map((day, ci) => {
                if (!day) return <td key={ci} />;
                const dateObj = normalize(new Date(year, month, day));
                
                return <td key={ci}><div onClick={()=>clickDay(day)}>{day}</div></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatePicker;
