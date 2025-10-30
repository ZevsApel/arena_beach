'use client';

import React, { useMemo, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setDates } from "@/lib/redux/slices/booking/booking";

type Props = {
    initialMonth?: Date;
    onClose: () => void;
}

const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const daysOfWeek = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

const DatePicker: React.FC<Props> = ({ initialMonth, onClose }) => {
    const dispatch = useAppDispatch();
    const today = normalize(new Date());

    const [viewDate, setViewDate] = useState<Date>(initialMonth ? normalize(initialMonth) : today);

    // Локальный выбор дат
    const [localStart, setLocalStart] = useState<Date | null>(null);
    const [localEnd, setLocalEnd] = useState<Date | null>(null);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const getDaysInMonth = (y: number, m:number) => new Date(y, m+1, 0).getDate();
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

    const clickDay = (day:number|null) => {
        if(!day) return;
        const picked = normalize(new Date(year, month, day));

        if(!localStart || (localStart && localEnd)) {
            setLocalStart(picked);
            setLocalEnd(null);
            return;
        }

        if(picked < localStart) {
            setLocalStart(picked);
            setLocalEnd(null);
            return;
        }

        setLocalEnd(picked);
    };

    const inRange = (date: Date) => {
        if(!localStart || !localEnd) return false;
        return date.getTime() >= localStart.getTime() && date.getTime() <= localEnd.getTime();
    };

    const isSameDay = (a: Date, b: Date) => a.getTime() === b.getTime();

    const prevMonth = () => setViewDate(new Date(year, month-1, 1));
    const nextMonth = () => setViewDate(new Date(year, month+1, 1));

    const handleConfirm = () => {
        if(localStart && localEnd){
            dispatch(setDates({ checkIn: localStart.toISOString(), checkOut: localEnd.toISOString() }));
            onClose();
        }
    };

    const handleReset = () => {
        setLocalStart(null);
        setLocalEnd(null);
        dispatch(setDates({ checkIn: null, checkOut: null }));
    };

    return (
        <div style={{ position:"absolute", zIndex:9999, background:"#fff", border:"1px solid #e2e8f0", boxShadow:"0 6px 18px rgba(0,0,0,0.08)", padding:12, borderRadius:8, width:320 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <button type="button" onClick={prevMonth}>←</button>
                <div style={{ fontWeight:600 }}>{monthNames[month]} {year}</div>
                <button type="button" onClick={nextMonth}>→</button>
            </div>

            <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                    <tr>{daysOfWeek.map(d => <th key={d} style={{ textAlign:"center", fontWeight:600, padding:"6px 0", fontSize:12 }}>{d}</th>)}</tr>
                </thead>
                <tbody>
                    {daysMatrix.map((row, ri)=>(
                        <tr key={ri}>
                            {row.map((day, ci)=>{
                                if(!day) return <td key={ci} style={{padding:6}} />;
                                const dateObj = normalize(new Date(year, month, day));
                                const todayMark = isSameDay(dateObj, today);
                                const inSelRange = inRange(dateObj);
                                const isStart = localStart && isSameDay(dateObj, localStart);
                                const isEnd = localEnd && isSameDay(dateObj, localEnd);

                                const style: React.CSSProperties = {
                                    padding:6,
                                    textAlign:"center",
                                    cursor:"pointer",
                                    borderRadius:6,
                                    background: isStart||isEnd?"#2b6cb0":inSelRange?"#bde3ff":(todayMark?"#f1f5f9":"transparent"),
                                    color: isStart||isEnd?"#fff": "#111827",
                                    fontWeight: isStart||isEnd?700:500
                                };

                                return (
                                    <td key={ci} style={{padding:4}}>
                                        <div onClick={()=>clickDay(day)} style={style}>{day}</div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
                <button type="button" onClick={handleReset}>Сбросить</button>
                <div style={{ display:"flex", gap:8 }}>
                    <button type="button" onClick={onClose}>Закрыть</button>
                    <button type="button" onClick={handleConfirm} disabled={!localStart || !localEnd}>Подтвердить</button>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
