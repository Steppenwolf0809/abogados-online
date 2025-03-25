import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, validatePassword, generateVerificationToken, sendVerificationEmail } from '@/lib/auth';
import { UserRegistrationData } from '@/models/User';
import { prisma } from '@/lib/prisma';
import { UserType } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data: UserRegistrationData = await request.json();
    
    // Validar los datos
    if (!data.email || !data.password || !data.fullName) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
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
    
    // Validar la contraseña
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'El correo electrónico ya está registrado' },
        { status: 409 }
      );
    }
    
    // Generar hash de la contraseña
    const hashedPassword = await hashPassword(data.password);
    
    // Generar token de verificación
    const verificationToken = generateVerificationToken(data.email);
    
    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber || null,
        userType: UserType.FREE,
        emailVerified: false,
        verificationToken,
      }
    });
    
    // Adaptamos el usuario de Prisma a nuestro modelo User para enviar el correo
    const userForEmail = {
      ...newUser,
      phoneNumber: newUser.phoneNumber || undefined,
      documentHistory: []
    };
    
    // Enviar correo de verificación
    await sendVerificationEmail(data.email, verificationToken);
    
    // Devolver respuesta exitosa
    return NextResponse.json(
      {
        message: 'Usuario registrado correctamente. Por favor, verifica tu correo electrónico.',
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          userType: newUser.userType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
