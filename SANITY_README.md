# Integración de Sanity CMS con Abogados Online

Este documento explica cómo utilizar Sanity CMS para gestionar el contenido del blog en el sitio web de Abogados Online.

## Configuración inicial

La integración con Sanity ya está configurada en el proyecto. El proyecto de Sanity tiene el ID `dyi918qx` y utiliza el dataset `production`.

## Acceso al Studio de Sanity

Hay tres formas de acceder al panel de administración de Sanity (Sanity Studio):

### 1. Acceso desde sanity.io (Recomendado)

1. Ve a https://www.sanity.io/manage
2. Inicia sesión con las mismas credenciales que usaste durante la configuración
3. Selecciona el proyecto `dyi918qx`
4. Haz clic en "Open Studio" o "Abrir Studio"

### 2. Acceso local durante desarrollo

1. Inicia tu servidor de desarrollo con `npm run dev`
2. Navega a http://localhost:3000/studio en tu navegador
3. Inicia sesión con las credenciales que usaste durante la configuración

### 3. Acceso en producción

Una vez que despliegues tu sitio, podrás acceder al Studio en https://tu-dominio.com/studio

## Estructura de contenido

El CMS está configurado con los siguientes tipos de contenido:

### Artículos (article)

Los artículos son el contenido principal del blog. Cada artículo tiene:

- **Título**: El título del artículo
- **Slug**: URL amigable generada a partir del título (debe ser único)
- **Extracto**: Breve resumen del artículo
- **Imagen principal**: Imagen destacada del artículo
- **Contenido**: El cuerpo del artículo en formato de texto enriquecido
- **Fecha de publicación**: Cuándo se publicó el artículo
- **Categorías**: Categorías a las que pertenece el artículo
- **Autor**: El autor del artículo

### Categorías (category)

Las categorías permiten organizar los artículos por temas:

- **Título**: Nombre de la categoría
- **Descripción**: Breve descripción de la categoría

### Autores (author)

Información sobre los autores de los artículos:

- **Nombre**: Nombre del autor
- **Imagen**: Foto del autor
- **Biografía**: Breve descripción del autor

## Cómo crear nuevo contenido

### Crear un nuevo artículo

1. Accede al Sanity Studio
2. Haz clic en "Artículo" en el menú lateral
3. Haz clic en "Create new Artículo"
4. Completa los campos requeridos:
   - Título
   - URL amigable (se genera automáticamente, pero puedes editarlo)
   - Extracto
   - Imagen principal
   - Contenido
   - Fecha de publicación
   - Categorías
   - Autor
5. Haz clic en "Publish" para publicar el artículo

### Crear una nueva categoría

1. Accede al Sanity Studio
2. Haz clic en "Categoría" en el menú lateral
3. Haz clic en "Create new Categoría"
4. Completa los campos:
   - Título
   - Descripción
5. Haz clic en "Publish"

### Crear un nuevo autor

1. Accede al Sanity Studio
2. Haz clic en "Autor" en el menú lateral
3. Haz clic en "Create new Autor"
4. Completa los campos:
   - Nombre
   - Imagen
   - Biografía
5. Haz clic en "Publish"

## Visualización en el sitio web

Una vez que hayas creado contenido en Sanity, este aparecerá automáticamente en:

- **Página principal**: Los 3 artículos más recientes se muestran en la sección "Artículos Recientes"
- **Página de blog**: Todos los artículos se muestran en `/blog`
- **Página de artículo individual**: Cada artículo tiene su propia página en `/blog/[slug]`

## Actualización de contenido

El sitio web está configurado para revalidar el contenido cada hora. Esto significa que los cambios que hagas en Sanity aparecerán en el sitio web en un plazo máximo de una hora.

Si necesitas que los cambios aparezcan inmediatamente, puedes reiniciar el servidor de desarrollo o hacer un nuevo despliegue.

## Configuración de CORS para producción

Para que tu sitio web en producción pueda acceder a los datos de Sanity, necesitas configurar CORS:

1. Ve a https://www.sanity.io/manage
2. Selecciona tu proyecto
3. Ve a "API" en el menú lateral
4. En la sección "CORS origins", haz clic en "Add CORS origin"
5. Ingresa la URL de tu sitio web en producción (por ejemplo, https://abogados-online.com)
6. Marca la casilla "Allow credentials"
7. Haz clic en "Save"

## Subir imágenes a Sanity

Para subir imágenes a Sanity:

1. Accede al Sanity Studio
2. Crea un nuevo artículo o edita uno existente
3. Haz clic en el campo "Imagen principal"
4. Haz clic en "Upload" para subir una imagen desde tu computadora
5. También puedes arrastrar y soltar imágenes directamente en el campo

Las imágenes se almacenan en Sanity y se sirven a través de su CDN, lo que proporciona un rendimiento óptimo.

## Personalización adicional

Si necesitas personalizar la estructura de contenido, puedes modificar los esquemas de Sanity en el directorio `src/sanity/schemaTypes`. Luego, deberás actualizar las consultas en `src/lib/sanity.ts` y los componentes correspondientes.

## Recursos adicionales

- [Documentación de Sanity](https://www.sanity.io/docs)
- [Guía de GROQ (lenguaje de consulta de Sanity)](https://www.sanity.io/docs/groq)
- [Sanity + Next.js](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Sanity Image URL Builder](https://www.sanity.io/docs/image-url)
