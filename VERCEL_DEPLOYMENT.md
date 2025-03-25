# Configuración para Despliegue en Vercel

Este documento proporciona instrucciones para configurar correctamente el despliegue de la aplicación en Vercel.

## Variables de Entorno Necesarias

Para que la aplicación funcione correctamente en producción, necesitas configurar las siguientes variables de entorno en el panel de control de Vercel:

### Base de Datos

```
DATABASE_URL="tu-url-de-conexion-a-neon-db"
```

Ya tienes configurada una base de datos Neon en el archivo `.env`. Asegúrate de usar la misma URL en Vercel.

### JWT (JSON Web Tokens)

```
JWT_SECRET="una-clave-secreta-larga-y-segura"
JWT_EXPIRES_IN="7d"
```

Para producción, es recomendable usar una clave secreta más larga y compleja que la que está en el archivo `.env`.

### Correo Electrónico

Para producción, deberías usar un servicio de correo electrónico real como SendGrid, Mailgun o Amazon SES:

```
EMAIL_HOST="smtp.tuservicio.com"
EMAIL_PORT="587"
EMAIL_SECURE="true"
EMAIL_USER="tu-usuario"
EMAIL_PASS="tu-contraseña"
EMAIL_FROM="Abogados Online <noreply@abogadosonline.com>"
```

### URL de la Aplicación

```
NEXT_PUBLIC_APP_URL="https://tu-dominio.com"
```

## Pasos para Configurar el Despliegue en Vercel

1. **Inicia sesión en Vercel**:
   - Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta.

2. **Importa tu Repositorio**:
   - Haz clic en "Add New" > "Project".
   - Selecciona el repositorio de GitHub donde está alojado el proyecto.
   - Haz clic en "Import".

3. **Configura el Proyecto**:
   - En la sección "Configure Project", asegúrate de que:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: next build
     - Output Directory: .next

4. **Configura las Variables de Entorno**:
   - En la sección "Environment Variables", agrega todas las variables mencionadas anteriormente.
   - Asegúrate de que los valores sean correctos para tu entorno de producción.

5. **Despliega el Proyecto**:
   - Haz clic en "Deploy".
   - Vercel comenzará a construir y desplegar tu aplicación.

6. **Verifica el Despliegue**:
   - Una vez completado el despliegue, Vercel te proporcionará una URL para acceder a tu aplicación.
   - Verifica que todo funcione correctamente.

## Configuración Adicional para Producción

### Dominio Personalizado

Si deseas usar un dominio personalizado:

1. Ve a la configuración de tu proyecto en Vercel.
2. Navega a la sección "Domains".
3. Agrega tu dominio personalizado y sigue las instrucciones para configurar los registros DNS.

### Configuración de Correo Electrónico

Para servicios específicos de correo electrónico:

#### SendGrid

```
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="apikey"
EMAIL_PASS="tu-api-key-de-sendgrid"
```

#### Mailgun

```
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="tu-usuario-de-mailgun"
EMAIL_PASS="tu-contraseña-de-mailgun"
```

### Configuración de Base de Datos

Si necesitas ejecutar migraciones de Prisma en Vercel, puedes agregar un script de construcción personalizado en el archivo `package.json`:

```json
"scripts": {
  "vercel-build": "prisma generate && prisma migrate deploy && next build"
}
```

Y luego configurar Vercel para usar este script como comando de construcción.

## Solución de Problemas Comunes

### Error de Conexión a la Base de Datos

Si tienes problemas para conectarte a la base de datos:

1. Verifica que la URL de conexión sea correcta.
2. Asegúrate de que la base de datos esté accesible desde Vercel (algunas bases de datos requieren configuración de IP).
3. Verifica que las credenciales sean correctas.

### Errores de Correo Electrónico

Si los correos electrónicos no se envían:

1. Verifica las credenciales del servicio de correo electrónico.
2. Asegúrate de que el servicio no esté bloqueando las conexiones desde Vercel.
3. Prueba con un servicio diferente si es necesario.

### Errores de Autenticación

Si los usuarios no pueden iniciar sesión o registrarse:

1. Verifica que la clave JWT_SECRET esté configurada correctamente.
2. Asegúrate de que la base de datos esté funcionando correctamente.
3. Verifica los logs de Vercel para obtener más información sobre los errores.
