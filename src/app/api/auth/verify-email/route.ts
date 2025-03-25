import { NextRequest, NextResponse } from 'next/server';
import { verifyVerificationToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { EmailVerificationRequest } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data: EmailVerificationRequest = await request.json();
    
    // Validar los datos
    if (!data.token) {
      return NextResponse.json(
        { error: 'Falta el token de verificación' },
        { status: 400 }
      );
    }
    
    // Verificar el token
    const email = verifyVerificationToken(data.token);
    if (!email) {
      return NextResponse.json(
        { error: 'Token de verificación inválido o expirado' },
        { status: 400 }
      );
    }
    
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar que el token coincida con el almacenado
    if (user.verificationToken !== data.token) {
      return NextResponse.json(
        { error: 'Token de verificación inválido' },
        { status: 400 }
      );
    }
    
    // Actualizar el usuario
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null
      }
    });
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Correo electrónico verificado correctamente'
    });
  } catch (error) {
    console.error('Error al verificar correo electrónico:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
