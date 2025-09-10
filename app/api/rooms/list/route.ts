import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { features } from "process";

export async function GET(request: Request) {
    try {
        const rooms = await prisma.room.findMany({
            include: {
                features: true,
                images: true
            }
        });

        return NextResponse.json(rooms);
    } catch (e) {
        return NextResponse.json({ error: `Произошла ошибка: ${e}`}, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const {title, slug, summary, description, features, images, price } = await request.json();

        const room = await prisma.room.create({
            data: { 
                title, 
                slug,
                 summary, 
                 description, 
                 price,

                 features: {
                    create: features?.map((feature: any) => {
                        return { icon: feature.icon, label: feature.label }
                    }) || []
                 },
                 
                 images: {
                    create: images?.map((image: any) => {
                        return { path: image.path }
                    }) || []
                 }
            }
        });

        return NextResponse.json({ message: 'Номер успешно добавлен' });
    } catch (e) {
        return NextResponse.json({ error: `Произошла ошибка: ${e}`}, { status: 500 })
    }
}