import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export async function GET(request: Request, {params}: {params: any}) {
    try {
        const { slug } = params;
        const room = await prisma.room.findUnique({
            where: { slug },
            include: { features: true, images: true },
        });

        if(!room) return NextResponse.json({ error: 'Номер не найден' }, { status: 404 });

        return NextResponse.json(room);
    } catch(error) {
        return NextResponse.json({ error: `Произошла ошибка ${error}`}, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: any }) {
    try {
        const { slug } = params;
        const { title, summary, description, price, features, images } = await request.json();
        
        const existingRoom = await prisma.room.findUnique({
            where: { slug },
            include: { features: true, images: true }
        })

        if(!existingRoom) {
            return NextResponse.json({ error: 'Номер не найден'}, { status: 404 });
        }

        // === Features ===
        const featureIdsKeep = features?.map((feature: any) => feature.id).filter(Boolean);
        await prisma.roomFeature.deleteMany({
            where: {
                roomId: existingRoom.id,
                id: { notIn: featureIdsKeep || [] },
            }
        });

        // === Images ===
        const imageIdsToKeep = images?.map((image: any) => image.id).filter(Boolean);
        await prisma.roomImage.deleteMany({
            where: {
                roomId: existingRoom.id,
                id: { notIn: imageIdsToKeep || [] },
            }
        });

        // === Обновляем/добавляем новые features и images ===
        const featureCreates = features?.filter((feature: any) => !feature.id).map((feature: any) => ({ icon: feature.icon, label: feature.label })) || [];
        const imageCreates = images?.filter((image: any) => !image.id).map((image: any) => ({ path: image.path})) || []

        const updateRoom = await prisma.room.update({
            where: { slug },
            data: {
                title,
                summary,
                description,
                price,

                features: { create: featureCreates },
                images: { create: imageCreates }
            }
        });

        return NextResponse.json({ message: 'Номер успешно обновлен', room: updateRoom });
    } catch(error) {
        return NextResponse.json({ error: `Произошла ошибка ${error}`}, { status: 500 });
    }
}