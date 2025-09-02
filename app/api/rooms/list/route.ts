import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET() {
    const rooms = await prisma.room.findMany({
        include: { features: true, images: true }
    });
    return NextResponse.json(rooms)
}

export async function POST(req: Request) {
    const { title, summary, description, features, images, price} = await req.json();

    const room = await prisma.room.create({
        data: {
            title,
            summary,
            description,
            price,


            features: {
                create: features.map((f: { icon: string, label: string}) => ({
                    icon: f.icon,
                    label: f.label
                })),
            },

            
            images: {
                create: images.map((i: { path: string }) => ({
                    path: i.path
                })),
            },
        },
        include: { features: true, images: true },
    });

    return NextResponse.json(room);
}