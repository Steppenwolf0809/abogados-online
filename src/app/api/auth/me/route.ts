import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Obtener el token de la cookie
    const token = cookies().get('auth_token')?.value;
    
    // Si no hay token, el usuario no está autenticado
    if (!token) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    // Verificar el token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        subscription: true
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    // Devolver los datos del usuario (sin información sensible)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
        registrationDate: user.registrationDate,
        emailVerified: user.emailVerified,
        subscription: user.subscription ? {
          plan: user.subscription.plan,
          startDate: user.subscription.startDate,
          endDate: user.subscription.endDate,
          active: user.subscription.active,
          autoRenew: user.subscription.autoRenew
        } : null
      }
    });
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
