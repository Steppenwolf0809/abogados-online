import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '@/models/User';
import { UserType } from '@prisma/client';

// Normalmente, estas claves secretas deberían estar en variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // 7 días

export interface JwtPayload {
  userId: string;
  email: string;
  userType: UserType;
  iat?: number;
  exp?: number;
}

/**
 * Genera un token JWT para un usuario
 * @param user Usuario para el que se genera el token
 * @returns Token JWT
 */
export function generateToken(user: User): string {
  const payload: JwtPayload = {
    userId: user.id,
    email: user.email,
    userType: user.userType,
  };

  // Usamos 'as any' para evitar errores de tipos con la biblioteca jsonwebtoken
  return jwt.sign(payload, JWT_SECRET as any, { expiresIn: JWT_EXPIRES_IN } as any);
}

/**
 * Verifica un token JWT
 * @param token Token JWT a verificar
 * @returns Payload del token si es válido, null si no lo es
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as any) as JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Genera un token para verificación de email o recuperación de contraseña
 * @param email Email del usuario
 * @param expiresIn Tiempo de expiración (por defecto 24 horas)
 * @returns Token
 */
export function generateVerificationToken(email: string, expiresIn: string = '24h'): string {
  // Usamos 'as any' para evitar errores de tipos con la biblioteca jsonwebtoken
  return jwt.sign({ email }, JWT_SECRET as any, { expiresIn } as any);
}

/**
 * Verifica un token de verificación de email o recuperación de contraseña
 * @param token Token a verificar
 * @returns Email del usuario si el token es válido, null si no lo es
 */
export function verifyVerificationToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as any) as { email: string };
    return decoded.email;
  } catch (error) {
    return null;
  }
}
