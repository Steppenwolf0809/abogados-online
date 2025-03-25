import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth/jwt';
import { UserType } from '@prisma/client';

// Rutas que requieren autenticación
const protectedRoutes = [
  '/perfil',
  '/documentos',
  '/documentos-ai',
];

// Rutas que requieren autenticación premium
const premiumRoutes = [
  '/documentos-ai',
];

// Rutas de autenticación (no redirigir a login)
const authRoutes = [
  '/iniciar-sesion',
  '/registro',
  '/verificar-email',
  '/recuperar-contrasena',
  '/restablecer-contrasena',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtener el token de la cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPremiumRoute = premiumRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Si es una ruta protegida y no hay token, redirigir a login
  if (isProtectedRoute && !token) {
    const url = new URL('/iniciar-sesion', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Si hay token, verificarlo
  if (token) {
    const payload = verifyToken(token);
    
    // Si el token es inválido y estamos en una ruta protegida, redirigir a login
    if (!payload && isProtectedRoute) {
      const url = new URL('/iniciar-sesion', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    
    // Si el token es válido pero el usuario no es premium y está intentando acceder a una ruta premium
    if (payload && isPremiumRoute && payload.userType !== UserType.PREMIUM && payload.userType !== UserType.ADMIN) {
      return NextResponse.redirect(new URL('/suscripcion', request.url));
    }
    
    // Si el token es válido y el usuario está intentando acceder a una ruta de autenticación, redirigir a perfil
    if (payload && isAuthRoute) {
      return NextResponse.redirect(new URL('/perfil', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configurar el middleware para que se ejecute solo en las rutas especificadas
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     * - public (archivos públicos)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
