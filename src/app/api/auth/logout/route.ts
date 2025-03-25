import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Eliminar la cookie de autenticación
    const cookieStore = cookies();
    cookieStore.delete('auth_token');
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      message: 'Sesión cerrada correctamente'
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
