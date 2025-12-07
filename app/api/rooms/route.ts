import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { transliterate } from '@/lib/utils/transliterate';

export async function GET(request: Request) {
  try {
    // Извлекаем параметры range для пагинации
    const { searchParams } = new URL(request.url);
    const rangeParam = searchParams.get('range');
    
    // По умолчанию: [0, 9] (для первой страницы)
    let start = 0;
    let end = 9;

    if (rangeParam) {
      // rangeParam выглядит как: [0,9]
      const range = JSON.parse(rangeParam);
      start = range[0];
      end = range[1];
    }

    // 1. Получаем общее количество записей
    const totalCount = await prisma.room.count();

    // 2. Получаем отфильтрованные и пагинированные данные
    const rooms = await prisma.room.findMany({
      skip: start, // Смещение
      take: end - start + 1, // Количество записей (включая end)
      include: { features: true, images: true },
    });

    // 3. Возвращаем массив и устанавливаем заголовок Content-Range
    return new NextResponse(JSON.stringify(rooms), {
      status: 200,
      headers: {
        // Формат: items START-END/TOTAL
        'Content-Range': `rooms ${start}-${end}/${totalCount}`,
        'Access-Control-Expose-Headers': 'Content-Range', // Важно для фронтенда
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Произошла ошибка: ${error}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, summary, description, features, images, price } = await request.json();
    const slug = transliterate(title);

    const room = await prisma.room.create({
      data: {
        title,
        slug,
        summary,
        description,
        price,
        features: { create: features || [] },
        images: { create: images || [] },
      },
      include: { features: true, images: true },
    });

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: `Произошла ошибка: ${error}` }, { status: 500 });
  }
}
