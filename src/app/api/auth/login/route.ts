import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, generateToken } from '@/lib/auth';
import { UserLoginData } from '@/models/User';
import { prisma } from '@/lib/prisma';
import { UserType } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data: UserLoginData = await request.json();
    
    // Validar los datos
    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar la contraseña
    const isPasswordValid = await verifyPassword(data.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar si el correo electrónico está verificado
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Por favor, verifica tu correo electrónico antes de iniciar sesión' },
        { status: 403 }
      );
    }
    
    // Generar token JWT
    // Adaptamos el usuario de Prisma a nuestro modelo User
    const userForToken = {
      ...user,
      phoneNumber: user.phoneNumber || undefined, // Convertimos null a undefined
      documentHistory: [] // Añadimos la propiedad documentHistory que falta en el modelo de Prisma
    };
    const token = generateToken(userForToken as any); // Usamos 'as any' para evitar problemas de tipos
    
    // Establecer cookie con el token
    const cookieStore = cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/',
    });
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
