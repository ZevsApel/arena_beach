import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ================== GET ==================
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const room = await prisma.room.findUnique({
    where: { id: Number(params.id) },
    include: { features: true, images: true },
  });

  if (!room) {
    return NextResponse.json({ error: "Комната не найдена" }, { status: 404 });
  }

  return NextResponse.json(room);
}

// ================== PUT ==================
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { title, slug, summary, description, price, features, images } =
    await req.json();

  const updated = await prisma.room.update({
    where: { id: Number(params.id) },
    data: {
      title,
      slug,
      summary,
      description,
      price,

      features: {
        deleteMany: {},
        create: features.map((f: { label: string; icon: string }) => ({
          label: f.label,
          icon: f.icon,
        })),
      },

      images: {
        deleteMany: {},
        create: images.map((i: { path: string }) => ({
          path: i.path,
        })),
      },
    },
    include: { features: true, images: true },
  });

  return NextResponse.json({ updated, message: "Обновлено" });
}

// ================== DELETE ==================
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.room.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Комната удалена" });
}
