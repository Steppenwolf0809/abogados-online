import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationToken, sendPasswordResetEmail } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PasswordResetRequest } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data: PasswordResetRequest = await request.json();
    
    // Validar los datos
    if (!data.email) {
      return NextResponse.json(
        { error: 'Falta el correo electrónico' },
        { status: 400 }
      );
    }
    
    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Formato de correo electrónico inválido' },
        { status: 400 }
      );
    }
    
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    // Si el usuario no existe, devolvemos una respuesta exitosa de todos modos
    // para evitar revelar información sobre qué correos están registrados
    if (!user) {
      return NextResponse.json({
        message: 'Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña'
      });
    }
    
    // Generar token de restablecimiento
    const resetToken = generateVerificationToken(data.email);
    
    // Establecer fecha de expiración (24 horas)
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 24);
    
    // Actualizar el usuario con el token de restablecimiento
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires
      }
    });
    
    // Enviar correo de restablecimiento
    await sendPasswordResetEmail(data.email, resetToken);
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña'
    });
  } catch (error) {
    console.error('Error al solicitar restablecimiento de contraseña:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
