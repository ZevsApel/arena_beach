import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    const cookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    return NextResponse.json(
      { message: 'Выход выполнен' },
      {
        status: 200,
        headers: { 'Set-Cookie': cookie },
      }
    );
  } catch (error) {
    console.error('Ошибка выхода:', error);
    return NextResponse.json({ error: 'Ошибка при выходе' }, { status: 500 });
  }
}