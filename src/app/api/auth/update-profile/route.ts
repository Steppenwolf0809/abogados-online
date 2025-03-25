import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, verifyPassword, hashPassword, validatePassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserUpdateData } from '@/models/User';

export async function PUT(request: NextRequest) {
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
    
    // Obtener los datos del cuerpo de la solicitud
    const data: UserUpdateData = await request.json();
    
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    // Preparar los datos a actualizar
    const updateData: any = {};
    
    // Actualizar nombre completo si se proporciona
    if (data.fullName) {
      updateData.fullName = data.fullName;
    }
    
    // Actualizar número de teléfono si se proporciona
    if (data.phoneNumber !== undefined) {
      updateData.phoneNumber = data.phoneNumber || null;
    }
    
    // Actualizar contraseña si se proporciona
    if (data.password) {
      // Verificar que se haya proporcionado la contraseña actual
      if (!data.currentPassword) {
        return NextResponse.json(
          { error: 'Se requiere la contraseña actual para cambiar la contraseña' },
          { status: 400 }
        );
      }
      
      // Verificar la contraseña actual
      const isPasswordValid = await verifyPassword(data.currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Contraseña actual incorrecta' },
          { status: 401 }
        );
      }
      
      // Validar la nueva contraseña
      const passwordValidation = validatePassword(data.password);
      if (!passwordValidation.valid) {
        return NextResponse.json(
          { error: passwordValidation.message },
          { status: 400 }
        );
      }
      
      // Generar hash de la nueva contraseña
      updateData.password = await hashPassword(data.password);
    }
    
    // Si no hay datos para actualizar, devolver error
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron datos para actualizar' },
        { status: 400 }
      );
    }
    
    // Actualizar el usuario
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData
    });
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Perfil actualizado correctamente',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        phoneNumber: updatedUser.phoneNumber,
        userType: updatedUser.userType
      }
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
