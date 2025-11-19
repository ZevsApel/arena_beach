'use client';

import { RootState } from "@/lib/redux/slice";
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

  return (
    <></>
  );
}

export default DatePicker;