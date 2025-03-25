/**
 * Modelo de usuario para la aplicación
 * Define la estructura de datos para los usuarios
 */
import { UserType } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  password: string; // Almacenada como hash
  fullName: string;
  phoneNumber?: string;
  userType: UserType;
  subscription?: SubscriptionDetails;
  registrationDate: Date;
  emailVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  documentHistory: string[]; // Referencias a documentos generados
}

export interface SubscriptionDetails {
  plan: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  paymentMethod?: string;
  autoRenew: boolean;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password' | 'verificationToken' | 'resetPasswordToken' | 'resetPasswordExpires'>;
  token: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmation {
  token: string;
  newPassword: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface UserUpdateData {
  fullName?: string;
  phoneNumber?: string;
  password?: string;
  currentPassword?: string; // Requerido para cambiar la contraseña
}
