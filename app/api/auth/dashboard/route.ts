import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
    try {
        const cookieHeader = request.headers.get('cookie');

        if(!cookieHeader) {
            return NextResponse.json({ error: 'Токен авторизации не найден' }, { status: 401 });
        }

        const cookies = Object.fromEntries(
            cookieHeader.split('; ').map((c) => c.split('='))
        );

        const token = cookies.token;

        if(!token) {
            return NextResponse.json({ error: 'Токен авторизации не найден' }, { status: 401 });
        }

        if(!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET не найден');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number; email: string; role: string };
        return NextResponse.json({ email: decoded.email, isAuthenticated: true });
    } catch (error) {
        console.log('Ошибка с токеном верификации:', error);
        return NextResponse.json({ error: 'Невалидный токен или сессия истекла' }, { status: 401 });
    }
}