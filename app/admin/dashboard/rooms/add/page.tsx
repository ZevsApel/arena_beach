'use client';

import RoomForm from "@/app/components/Dashboard/RoomForm/RoomForm";
import TitleContainer, { TitleData } from "@/app/components/Dashboard/TitleContainer/TitleContainer";
import { useRouter } from "next/navigation";

export default function AddRoomPage() {
    const router = useRouter();

    const titleContainer: TitleData = {
      title: 'Добавить номер',
      subTitleText: 'Здесь Вы можете добавить новый номер'
    }

    return(
        <div className="room-page__add">
            <TitleContainer item={titleContainer} />
            <RoomForm
                onRoomSaved={() => router.push('/admin/dashboard/rooms')}
                onCancel={() => router.push('/admin/dashboard/rooms')}
            />
        </div>
    );
}