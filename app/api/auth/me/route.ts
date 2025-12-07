// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
    const cookie = req.headers.get('cookie');
    
    // 1. Проверка наличия куки
    if (!cookie) {
        return NextResponse.json({ authorized: false }, { status: 401 });
    }

    const token = cookie
        .split('; ')
        .find((c) => c.startsWith('token='))
        ?.split('=')[1];

    // 2. Проверка наличия токена
    if (!token) {
        return NextResponse.json({ authorized: false }, { status: 401 });
    }

    // --- ИСПРАВЛЕНИЕ: Проверка и приведение типа JWT_SECRET ---
    const jwtSecret = process.env.JWT_SECRET;
    
    // Если секрет не задан, это фатальная ошибка конфигурации, 
    // но мы должны корректно обработать ее.
    if (!jwtSecret) {
        console.error("JWT_SECRET не задан в .env файле!");
        // Возвращаем 500, так как это внутренняя ошибка конфигурации,
        // но лучше бы это было в другом блоке, чтобы не путать с ошибками клиента.
        return NextResponse.json(
            { error: 'Server configuration error' }, 
            { status: 500 }
        ); 
    }
    // -----------------------------------------------------------

    try {
        // Мы уверены, что token и jwtSecret - это строки
        const decoded = jwt.verify(token, jwtSecret); 
        
        return NextResponse.json({ authorized: true, user: decoded });
    } catch (error) {
        // Здесь перехватываются ошибки jwt.verify (например, TokenExpiredError)
        return NextResponse.json({ authorized: false }, { status: 401 });
    }
}