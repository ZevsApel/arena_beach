import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

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


export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID обязателен' }, { status: 400 });
        }
        

        const deleteFiles = await prisma.room.findUnique({
            where: { id: id },
            select: { slug: true}
        });

        if (!deleteFiles) {
            return NextResponse.json({ error: 'Комната не найдена' }, { status: 404 });
        }

        console.log(deleteFiles.slug);
          

        const deletePath = path.join(process.cwd(), 'public', 'upload', 'rooms', deleteFiles.slug);

        if(fs.existsSync(deletePath)) {
            fs.rmSync(deletePath, { recursive: true, force: true });
        }

        const deleteRoom = await prisma.room.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: 'Номер успешно удален' });
    } catch(e) {
        return NextResponse.json({ error: `Произошла ошибка ${e}` }, { status: 500 });
    }
}