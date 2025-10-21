'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import RoomForm from "@/app/components/Dashboard/RoomForm/RoomForm";

type RoomData = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  price: number;
  features: { icon: string; label: string }[];
  images: { path: string }[];
};

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : undefined;

  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function loadRoom() {
      try {
        const response = await fetch(`/api/rooms/${slug}`);
        if (!response.ok) throw new Error("Ошибка при загрузке номера");
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRoom();
  }, [slug]);

  const handleRoomUpdated = () => {
    router.push("/admin/dashboard/rooms");
  };

  if (loading) return <p>Загрузка...</p>;
  if (!room) return <p>Номер не найден</p>;

  return (
    <div className="room-page__edit">
      <h2>Редактировать номер</h2>
      <RoomForm
        room={room}
        onRoomSaved={handleRoomUpdated}
        onCancel={() => router.push("/admin/dashboard/rooms")}
      />
    </div>
  );
}
