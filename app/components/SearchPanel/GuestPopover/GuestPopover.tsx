'use client';

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setGuests } from "@/lib/redux/slices/booking/booking";
import { useState } from "react";

    const GuestPopover: React.FC<{ onClose: () => void }> = ({ onClose }) => {
        const dispatch = useAppDispatch();
    const { adults, children, rooms } = useAppSelector((s) => s.booking);

    // Локальный state
    const [localAdults, setLocalAdults] = useState(adults);
    const [localChildren, setLocalChildren] = useState(children);
    const [localRooms, setLocalRooms] = useState(rooms);

    const handleOK = () => {
        dispatch(setGuests({
        adults: localAdults,
        children: localChildren,
        rooms: localRooms,
        }));
        onClose();
    };

    return (
        <div style={{
        position: "absolute",
        zIndex: 9999,
        background: "#fff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        padding: 12,
        borderRadius: 8,
        width: 260
        }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>Взрослые</div>
            <div>
            <button onClick={() => setLocalAdults(Math.max(1, localAdults - 1))}>-</button>
            <span style={{ margin: "0 8px" }}>{localAdults}</span>
            <button onClick={() => setLocalAdults(localAdults + 1)}>+</button>
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>Дети</div>
            <div>
            <button onClick={() => setLocalChildren(Math.max(0, localChildren - 1))}>-</button>
            <span style={{ margin: "0 8px" }}>{localChildren}</span>
            <button onClick={() => setLocalChildren(localChildren + 1)}>+</button>
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>Номера</div>
            <div>
            <button onClick={() => setLocalRooms(Math.max(1, localRooms - 1))}>-</button>
            <span style={{ margin: "0 8px" }}>{localRooms}</span>
            <button onClick={() => setLocalRooms(localRooms + 1)}>+</button>
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
            <button onClick={handleOK}>OK</button>
        </div>
        </div>
    );
}

export default GuestPopover;