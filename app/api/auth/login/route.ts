// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Отладка

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ message: 'Неверный email или пароль' }, { status: 401 });
    }

    let loginAttempt = await prisma.loginAttempt.findFirst({ where: { adminId: admin.id } });
    if (!loginAttempt) {
      loginAttempt = await prisma.loginAttempt.create({
        data: { adminId: admin.id, attempts: 0 },
      });
    }

    const timeSinceLastAttempt = new Date().getTime() - new Date(loginAttempt.lastAttempt).getTime();
    if (timeSinceLastAttempt > LOCKOUT_DURATION) {
      await prisma.loginAttempt.update({
        where: { id: loginAttempt.id },
        data: { attempts: 0, lastAttempt: new Date() },
      });
      loginAttempt.attempts = 0;
    }

    if (loginAttempt.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { message: 'Слишком много попыток.<br>Попробуйте снова через 15 минут.' },
        { status: 429 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      await prisma.loginAttempt.update({
        where: { id: loginAttempt.id },
        data: { attempts: loginAttempt.attempts + 1, lastAttempt: new Date() },
      });
      return NextResponse.json({ message: 'Неверный email или пароль' }, { status: 401 });
    }

    // Проверка JWT_SECRET перед генерацией токена
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    await prisma.loginAttempt.update({
      where: { id: loginAttempt.id },
      data: { attempts: 0, lastAttempt: new Date() },
    });

    return NextResponse.json(
      { message: 'Успешный вход' },
      {
        status: 200,
        headers: { 'Set-Cookie': cookie },
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Произошла ошибка' }, { status: 500 });
  }
}