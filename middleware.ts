import { NextResponse, NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  id?: string | number;
  email?: string;
  role?: string;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware triggered for:', pathname);

  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  const secret = process.env.JWT_SECRET;

  if (pathname === '/admin') {
    if (!token || !secret) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, secret) as CustomJwtPayload;
      if (decoded.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (!token || !secret) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    if (decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
  runtime: 'nodejs',
};
