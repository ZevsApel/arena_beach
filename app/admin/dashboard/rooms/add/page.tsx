'use client';

import RoomForm from "@/app/components/Dashboard/RoomForm/RoomForm";
import { useRouter } from "next/navigation";

export default function AddRoomPage() {
    const router = useRouter();

    return(
        <div className="room-page__add">
            <h2>Добавить номер</h2>
            <RoomForm
                onRoomSaved={() => router.push('/admin/dashboard/rooms')}
                onCancel={() => router.push('/admin/dashboard/rooms')}
            />
        </div>
    );
}