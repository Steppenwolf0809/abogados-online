import { NextRequest, NextResponse } from 'next/server';
import { verifyVerificationToken, validatePassword, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PasswordResetConfirmation } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data: PasswordResetConfirmation = await request.json();
    
    // Validar los datos
    if (!data.token || !data.newPassword) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Validar la contraseña
    const passwordValidation = validatePassword(data.newPassword);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }
    
    // Verificar el token
    const email = verifyVerificationToken(data.token);
    if (!email) {
      return NextResponse.json(
        { error: 'Token de restablecimiento inválido o expirado' },
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
    if (user.resetPasswordToken !== data.token) {
      return NextResponse.json(
        { error: 'Token de restablecimiento inválido' },
        { status: 400 }
      );
    }
    
    // Verificar que el token no haya expirado
    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      return NextResponse.json(
        { error: 'Token de restablecimiento expirado' },
        { status: 400 }
      );
    }
    
    // Generar hash de la nueva contraseña
    const hashedPassword = await hashPassword(data.newPassword);
    
    // Actualizar el usuario
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Contraseña restablecida correctamente'
    });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
