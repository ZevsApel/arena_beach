import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: {id: string }}
) {
    const room = await prisma.room.findUnique({
        where: { id: Number(params.id ) },
        include: { features: true, images: true}
    })

    return NextResponse.json(room);
}

export async function PUT (
    req: Request,
    { params }: { params: { id: string } }
) {
    const { title, summary, description, price, features, images} = await req.json();

    const updated = await prisma.room.update({
        where: { id: Number(params.id) },
        data: {
            title,
            summary,
            description,


            features: {
                deletMany: {},
                create: features.map((f: { label: string, icon: string}) => ({
                    label: f.label,
                    icon: f.icon
                })),
            },


            images: {
                deleteMany: {},
                create: images.map((i: { path: string }) => ({
                    path: i.path
                })),
            },
        },
        include: { features: true, images: true}
    });

    return NextResponse.json({updated, message: 'Обновлено'});
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string} }
) {
    await prisma.room.delete({
        where: { id: Number(params.id) }
    });

    return NextResponse.json({message: 'Комната удалена' });
}