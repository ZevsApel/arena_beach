'use client'
import AddRoomForm from "@/app/components/Dashboard/AddRoomForm/AddRoomForm";
import TitleContainer, {  TitleData } from "@/app/components/Dashboard/TitleContainer/TitleContainer"
import { useEffect, useState } from "react";
export default function DashboardRooms() {

    const titleContainer: TitleData = {title: 'Список номеров', subTitleText: 'В этом разделе вы можете ознакомиться с заявками с сайта и найти контактные данные заявителя'}

    const [rooms, setRooms] = useState([]);

    const [isFormOpen, setIsFormOpen] = useState(false);

    async function loadRooms() {
        const res = await fetch('/api/rooms/list');
        const data = await res.json();
        setRooms(data); 
    }

    useEffect(() => {
        loadRooms();
    }, [])

    return (
        <>
            <TitleContainer item={titleContainer} />
            <div>
                {isFormOpen ? (
                    <AddRoomForm onRoomAdded={() => {
                        loadRooms();
                        setIsFormOpen(false);
                    } } onCancel={() => setIsFormOpen(false)} />
                ) : (
                    <>
                        <button onClick={() => setIsFormOpen(true)}>
                            Добавить номер
                        </button>

                        {rooms.length === 0 ? (
                            <p>Номеров пока нет</p>
                        ) : (
                            <ul>
                                {rooms.map((room: any) => (
                                    <li key={room.id}>{room.title}</li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </>
    )
}