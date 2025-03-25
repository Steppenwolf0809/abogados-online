import nodemailer from 'nodemailer';

// Configuración del transporte de correo
// En producción, deberías usar un servicio de correo real como SendGrid, Mailgun, etc.
// Para desarrollo, podemos usar un servicio de prueba como Ethereal
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'ethereal.user@ethereal.email',
    pass: process.env.EMAIL_PASS || 'ethereal_pass',
  },
});

/**
 * Envía un correo electrónico
 * @param to Destinatario
 * @param subject Asunto
 * @param html Contenido HTML
 * @returns Información del envío
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<any> {
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"LegalDocs Hub" <noreply@legaldocshub.com>',
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

/**
 * Envía un correo electrónico de verificación
 * @param to Destinatario
 * @param token Token de verificación
 * @returns Información del envío
 */
export async function sendVerificationEmail(to: string, token: string): Promise<any> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verificar-email?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Verificación de correo electrónico</h2>
      <p>Gracias por registrarte en LegalDocs Hub. Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <p><a href="${verificationUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verificar correo electrónico</a></p>
      <p>O copia y pega el siguiente enlace en tu navegador:</p>
      <p>${verificationUrl}</p>
      <p>Este enlace expirará en 24 horas.</p>
      <p>Si no has solicitado esta verificación, puedes ignorar este correo.</p>
      <p>Saludos,<br>El equipo de LegalDocs Hub</p>
    </div>
  `;

  return sendEmail(to, 'Verificación de correo electrónico - LegalDocs Hub', html);
}

/**
 * Envía un correo electrónico de recuperación de contraseña
 * @param to Destinatario
 * @param token Token de recuperación
 * @returns Información del envío
 */
export async function sendPasswordResetEmail(to: string, token: string): Promise<any> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/restablecer-contrasena?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Recuperación de contraseña</h2>
      <p>Has solicitado restablecer tu contraseña en LegalDocs Hub. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
      <p><a href="${resetUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a></p>
      <p>O copia y pega el siguiente enlace en tu navegador:</p>
      <p>${resetUrl}</p>
      <p>Este enlace expirará en 24 horas.</p>
      <p>Si no has solicitado este restablecimiento, puedes ignorar este correo.</p>
      <p>Saludos,<br>El equipo de LegalDocs Hub</p>
    </div>
  `;

  return sendEmail(to, 'Recuperación de contraseña - LegalDocs Hub', html);
}

/**
 * Envía un correo electrónico de bienvenida
 * @param to Destinatario
 * @param name Nombre del usuario
 * @returns Información del envío
 */
export async function sendWelcomeEmail(to: string, name: string): Promise<any> {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/iniciar-sesion`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>¡Bienvenido a LegalDocs Hub!</h2>
      <p>Hola ${name},</p>
      <p>Gracias por unirte a LegalDocs Hub. Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
      <p>Con tu cuenta, puedes:</p>
      <ul>
        <li>Generar documentos legales personalizados</li>
        <li>Acceder a calculadoras legales</li>
        <li>Guardar y gestionar tus documentos</li>
      </ul>
      <p><a href="${loginUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Iniciar sesión</a></p>
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
      <p>Saludos,<br>El equipo de LegalDocs Hub</p>
    </div>
  `;

  return sendEmail(to, '¡Bienvenido a LegalDocs Hub!', html);
}
