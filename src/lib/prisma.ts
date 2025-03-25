import { PrismaClient } from '@prisma/client';

// Declaración global para evitar múltiples instancias de PrismaClient en desarrollo
declare global {
  var prisma: PrismaClient | undefined;
}

// Exportamos una instancia de PrismaClient
// En desarrollo, usamos una variable global para evitar múltiples instancias
// En producción, creamos una nueva instancia
export const prisma = global.prisma || new PrismaClient();

// Solo en desarrollo, asignamos la instancia a la variable global
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
