import bcrypt from 'bcryptjs';

// Número de rondas de salt para bcrypt
const SALT_ROUNDS = 10;

/**
 * Genera un hash para una contraseña
 * @param password Contraseña en texto plano
 * @returns Hash de la contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Verifica si una contraseña coincide con un hash
 * @param password Contraseña en texto plano
 * @param hash Hash de la contraseña
 * @returns true si la contraseña coincide con el hash, false en caso contrario
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Valida que una contraseña cumpla con los requisitos de seguridad
 * @param password Contraseña a validar
 * @returns true si la contraseña cumple con los requisitos, false en caso contrario
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  // Requisitos de seguridad
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // Validación
  if (password.length < minLength) {
    return { valid: false, message: `La contraseña debe tener al menos ${minLength} caracteres` };
  }

  if (!hasUpperCase) {
    return { valid: false, message: 'La contraseña debe contener al menos una letra mayúscula' };
  }

  if (!hasLowerCase) {
    return { valid: false, message: 'La contraseña debe contener al menos una letra minúscula' };
  }

  if (!hasNumbers) {
    return { valid: false, message: 'La contraseña debe contener al menos un número' };
  }

  if (!hasSpecialChar) {
    return { valid: false, message: 'La contraseña debe contener al menos un carácter especial' };
  }

  return { valid: true };
}
