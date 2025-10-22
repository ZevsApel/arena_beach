'use client';

import { useEffect, useState } from "react";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import SureModal from "@/app/components/Dashboard/SureModal/SureModal";
import TitleContainer, { TitleData } from "@/app/components/Dashboard/TitleContainer/TitleContainer";


import { AppDispatch, RootState } from "@/lib/redux/slice";
import { openModal, closeModal } from "@/lib/redux/slices/modal/modalSlice";
import { title } from "process";

export default function DashboardRooms() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isModalOpen } = useSelector((state: RootState) => state.modal);

    const [rooms, setRooms] = useState<any[]>([]);
    const [roomToDelete, setRoomToDelete] = useState<number | null>(null);

    const titleContainer: TitleData = {
        title: 'Список номеров',
        subTitleText: 'В этом разделе вы можете ознакомиться с имеющимися номерами и завяками на них'
    }

    const formatDate = (isoString: string) => 
        new Date(isoString).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

    const loadRooms = async () => {
        try {
            const responce = await fetch('/api/rooms/list');

            if (!responce.ok) throw new Error('Ошибка при загрузке списка номеров');

            const data = await responce.json();
            setRooms(data);
        } catch(error) {
            console.error(error)
        }
    }

    const deleteRoom = async (id: number) => {
        try {
            const responce = await fetch('/api/rooms/list', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            const data = await responce.json();

            if (!responce.ok) {
                console.error(`Ошибка при удалении номера: ${data.error}`);
                return;
            }

            loadRooms();
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadRooms();
    }, [])

    return (
        <>
            <TitleContainer item={titleContainer} />

            <div className="dashboard-rooms">
                <button 
                    onClick={() => router.push('/admin/dashboard/rooms/add')}
                    className="action-button"
                >
                    Добавить номер
                </button>
            </div>

            {rooms.length === 0 ? (
                <p>Номеров пока нет</p>
            ) : (
                <ul className="rooms-list">
                    <li className="room-item room-item__heading">
                        <p className="room-subItem">Название номера</p>
                        <p className="room-subItem">Дата редактирования</p>
                        <p className="room-subItem">Цена за ночь</p>
                        <div className="room-subItem"></div>
                        <div className="room-subItem"></div>
                    </li>
                    {rooms.map((room) => (
                        <li key={room.id} className="room-item">
                            <div className="room-subItem"><button className="subItem-edit-room" onClick={() => router.push(`/admin/dashboard/rooms/edit/${room.slug}`)}>{room.title}</button></div>
                            <div className="room-subItem">{formatDate(room.updatedAt)}</div>
                            <div className="room-subItem">{room.price.toLocaleString()} руб.</div>


                            <button 
                                onClick={() => router.push(`/admin/dashboard/rooms/edit/${room.slug}`)}
                                className="room-subItem room-edit-btn action-button"
                            >
                                Редактировать
                            </button>
                            <button 
                                onClick={() => {setRoomToDelete(room.id); dispatch(openModal())}}
                                className="room-subItem room-delete-btn action-button"    
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {isModalOpen && (
                <SureModal 
                    sureText='Вы уверены, что хотите удалить номер?'

                    handleDecline={() => {
                        setRoomToDelete(null);
                        dispatch(closeModal());
                    }}

                    handleAccept={() => {
                        if(roomToDelete !== null) {
                            deleteRoom(roomToDelete);
                        }

                        setRoomToDelete(null);
                        dispatch(closeModal());
                    }}
                />
            )}
        </>
    );
}