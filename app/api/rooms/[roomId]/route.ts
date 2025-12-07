import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

// Интерфейс для внутреннего приведения типов
interface RouteParams {
    roomId: string;
}

// ----------------------------------------------------------------------
// GET_ONE (Получение комнаты по ID)
// ----------------------------------------------------------------------
export async function GET(request: Request, context: any) {
    try {
        const params = context.params as RouteParams;
        
        const id = parseInt(params.roomId, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Некорректный ID' }, { status: 400 });
        }
        
        const room = await prisma.room.findUnique({
            where: { id: id },
            include: { features: true, images: true },
        });

        if (!room) return NextResponse.json({ error: 'Номер не найден' }, { status: 404 });

        return NextResponse.json(room);
    } catch (error) {
        console.error("Ошибка при GET:", error);
        return NextResponse.json({ error: `Произошла ошибка: ${error}` }, { status: 500 });
    }
}

// ----------------------------------------------------------------------
// PUT (Обновление комнаты по ID)
// ----------------------------------------------------------------------
export async function PUT(request: Request, context: any) {
    try {
        const params = context.params as RouteParams;
        
        const id = parseInt(params.roomId, 10);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Некорректный ID' }, { status: 400 });
        }
        
        const { title, summary, description, price, features, images } = await request.json();
        
        const existingRoom = await prisma.room.findUnique({ where: { id: id } });
        if (!existingRoom) {
             return NextResponse.json({ error: 'Номер не найден' }, { status: 404 });
        }
        
        // 1. Features: Удаляем лишние
        const featureIdsKeep = features?.map((feature: any) => feature.id).filter(Boolean);
        await prisma.roomFeature.deleteMany({
            where: {
                roomId: id,
                id: { notIn: featureIdsKeep || [] },
            },
        });
        
        // 2. Images: Удаляем лишние
        const imageIdsToKeep = images?.map((image: any) => image.id).filter(Boolean);
        await prisma.roomImage.deleteMany({
            where: {
                roomId: id,
                id: { notIn: imageIdsToKeep || [] },
            },
        });
        
        // 3. Обновление существующих
        const featureUpdates = features
             ?.filter((feature: any) => feature.id)
             .map((feature: any) => 
                 prisma.roomFeature.update({ 
                     where: { id: feature.id }, 
                     data: { icon: feature.icon, label: feature.label }
                 })
             ) || [];
             
        const imageUpdates = images
             ?.filter((image: any) => image.id)
             .map((image: any) => 
                 prisma.roomImage.update({ 
                     where: { id: image.id }, 
                     data: { path: image.path } 
                 })
             ) || [];
             
        // 4. Создание новых
        const featureCreates = features
             ?.filter((feature: any) => !feature.id)
             .map((feature: any) => ({ icon: feature.icon, label: feature.label })) || [];
             
        const imageCreates = images
             ?.filter((image: any) => !image.id)
             .map((image: any) => ({ path: image.path })) || [];

        // Выполняем обновления в транзакции
        const updateActions = [...featureUpdates, ...imageUpdates];
        if (updateActions.length > 0) {
             await prisma.$transaction(updateActions);
        }

        // Обновляем комнату
        const updateRoom = await prisma.room.update({
             where: { id: id },
             data: {
                 title, summary, description, price, 
                 features: { create: featureCreates },
                 images: { create: imageCreates },
             },
             include: { features: true, images: true },
        });

        return NextResponse.json(updateRoom);
    } catch (error) {
        console.error("Ошибка при PUT:", error);
        return NextResponse.json({ error: `Произошла ошибка ${error}` }, { status: 500 });
    }
}

// ----------------------------------------------------------------------
// DELETE (Удаление комнаты и файлов)
// ----------------------------------------------------------------------
export async function DELETE(request: Request, context: any) {
    try {
        const params = context.params as RouteParams;
        const id = parseInt(params.roomId, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Некорректный ID' }, { status: 400 });
        }

        // 1. Ищем комнату, чтобы получить её slug (для удаления папки)
        const room = await prisma.room.findUnique({
            where: { id: id },
        });

        if (!room) {
            return NextResponse.json({ error: 'Номер не найден' }, { status: 404 });
        }

        // 2. Удаляем папку с изображениями (если есть slug)
        if (room.slug) {
            // Путь: public/uploads/slug-komnaty
            const folderPath = path.join(process.cwd(), 'public', 'uploads', room.slug);
            
            try {
                await fs.rm(folderPath, { recursive: true, force: true });
                console.log(`Папка удалена: ${folderPath}`);
            } catch (err) {
                console.error("Ошибка при удалении папки с файлами:", err);
                // Не прерываем выполнение, чтобы удалить запись из БД
            }
        }

        // 3. Удаляем запись из базы данных
        // Примечание: Если в схеме Prisma настроен Cascade Delete для features/images, они удалятся автоматически.
        // Если нет, Prisma выбросит ошибку, и нужно будет сначала удалить children (images/features).
        // Обычно предполагается, что onDelete: Cascade настроен в schema.prisma.
        const deletedRoom = await prisma.room.delete({
            where: { id: id },
        });

        // React-Admin ожидает возврата удаленного объекта (или хотя бы id)
        return NextResponse.json(deletedRoom);

    } catch (error) {
        console.error("Ошибка при DELETE:", error);
        return NextResponse.json({ error: `Ошибка удаления: ${error}` }, { status: 500 });
    }
}