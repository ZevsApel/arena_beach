'use client'
import AddRoomForm from "@/app/components/Dashboard/AddRoomForm/AddRoomForm";
import SureModal from "@/app/components/Dashboard/SureModal/SureModal";
import TitleContainer, { TitleData } from "@/app/components/Dashboard/TitleContainer/TitleContainer"
import { AppDispatch, RootState } from "@/lib/redux/slice";
import { closeModal, openModal } from "@/lib/redux/slices/modal/modalSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";




export default function DashboardRooms() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isModalOpen } = useSelector((state: RootState) => state.modal);

    const titleContainer: TitleData = { title: 'Список номеров', subTitleText: 'В этом разделе вы можете ознакомиться с заявками с сайта и найти контактные данные заявителя' }

    const [rooms, setRooms] = useState([]);

    const [isFormOpen, setIsFormOpen] = useState(false);


    const [roomToDelete, setRoomToDelete] = useState<number | null>(null);

    async function loadRooms() {
        const res = await fetch('/api/rooms/list');
        const data = await res.json();
        setRooms(data);
    }

    async function deleteRoom(id: number) {
        try {
            const res = await fetch('/api/rooms/list', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            console.log(data);

            if (!res.ok) {
                console.error(`Ошибка при удалении ${data.error}`);
                return;
            }

            loadRooms();
        } catch (error) {
            console.error(error);
        }
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
                    }} onCancel={() => setIsFormOpen(false)} />
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
                                    <li key={room.id}>{room.title} <button onClick={() => { setRoomToDelete(room.id); dispatch(openModal()) }}>Удалить</button></li>
                                ))}
                            </ul>
                        )}

                        {isModalOpen ? (<SureModal
                            sureText="Вы уверены, что хотите удалить номер?"
                            handleDecline={() => { setRoomToDelete(null); dispatch(closeModal()) }}
                            handleAccept={() => {
                                if (roomToDelete !== null) {
                                    deleteRoom(roomToDelete);
                                }
                                setRoomToDelete(null);
                                dispatch(closeModal());
                            }}
                        />)
                            : ''
                        }
                    </>
                )}
            </div>
        </>
    )
}