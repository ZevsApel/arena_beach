import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import sanitizeHtml from 'sanitize-html'; // <-- Используем sanitize-html
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const UPLOAD_ROOT_DIR = 'upload';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const slug = formData.get('slug') as string;
        const type = formData.get('type') as 'icon' | 'image';
        
        const rootPath = process.cwd();

        if (!file || !slug || !type) {
            return NextResponse.json(
                { error: 'Файл, символьный код или тип не переданы' },
                { status: 400 },
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'Файл слишком большой (максимум 5мБ)' }, { status: 400 });
        }

        const ext = path.extname(file.name).toLowerCase();

        if (type === 'icon') {
            const allowedExt = ['.png', '.svg'];
            const allowedMime = ['image/png', 'image/svg+xml'];
            if (!allowedExt.includes(ext) || !allowedMime.includes(file.type)) {
                return NextResponse.json({ error: 'Недопустимый формат иконки' }, { status: 400 });
            }
        }

        if (type === 'image') {
            const allowedExt = ['.jpg', '.jpeg', '.webp'];
            const allowedMime = ['image/jpeg', 'image/webp'];
            if (!allowedExt.includes(ext) || !allowedMime.includes(file.type)) {
                return NextResponse.json({ error: 'Недопустимый формат изображения' }, { status: 400 });
            }
        }

        const subFolder = type === 'icon' ? 'icon' : '';
        const uploadDir = path.join(rootPath, 'public', UPLOAD_ROOT_DIR, 'rooms', slug, subFolder);

        await fs.mkdir(uploadDir, { recursive: true });

        const safeFileName = `${uuidv4()}${ext}`;
        const filePath = path.join(uploadDir, safeFileName);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (ext === '.svg') {
            const svgString = buffer.toString('utf-8');
            
            // 🚨 Логика очистки SVG с помощью sanitize-html
            const clean = sanitizeHtml(svgString, {
                allowedTags: false, // Разрешаем все теги (по умолчанию для SVG)
                allowedAttributes: false, // Разрешаем все атрибуты
                // Это включает все теги и атрибуты, необходимые для безопасного SVG
            }); 

            if (!clean || clean.length === 0) {
                return NextResponse.json(
                    { error: 'SVG файл не безопасен или содержит запрещенный контент' },
                    { status: 400 },
                );
            }

            await fs.writeFile(filePath, clean, 'utf-8');
        } else {
            try {
                await sharp(buffer).metadata();
            } catch (err) {
                return NextResponse.json(
                    { error: 'Файл поврежден, не является изображением или сбой Sharp' },
                    { status: 400 },
                );
            }

            await fs.writeFile(filePath, buffer);
        }

        const url = `/${UPLOAD_ROOT_DIR}/rooms/${slug}/${subFolder ? subFolder + '/' : ''}${safeFileName}`;

        return NextResponse.json({ url });
    } catch (error) {
        const errorDetails = error instanceof Error ? error.stack || error.message : String(error);
        console.error("================================================");
        console.error("FATAL UPLOAD ERROR (CHECK THIS!):", errorDetails); 
        console.error("================================================");
        
        return NextResponse.json({ 
            error: 'Внутренняя ошибка сервера. Проверьте консоль Node.js на EACCES/Sharp.' 
        }, { status: 500 });
    }
}