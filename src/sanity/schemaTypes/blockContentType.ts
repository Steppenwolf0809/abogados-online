import {defineArrayMember, defineType} from 'sanity'

/**
 * Este es el esquema que define cómo se estructurará el contenido de texto enriquecido
 * en los artículos. Permite formatear texto, agregar enlaces, imágenes, etc.
 */
export const blockContentType = defineType({
  title: 'Contenido de texto',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Bloque',
      type: 'block',
      // Estilos que puede tener el texto
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Título H1', value: 'h1'},
        {title: 'Título H2', value: 'h2'},
        {title: 'Título H3', value: 'h3'},
        {title: 'Título H4', value: 'h4'},
        {title: 'Cita', value: 'blockquote'},
      ],
      lists: [
        {title: 'Viñetas', value: 'bullet'},
        {title: 'Numerada', value: 'number'},
      ],
      // Marcas que puede tener el texto (formato)
      marks: {
        // Decoradores, como negrita, cursiva, etc.
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Cursiva', value: 'em'},
          {title: 'Subrayado', value: 'underline'},
          {title: 'Tachado', value: 'strike-through'},
        ],
        // Anotaciones, como enlaces
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Abrir en nueva pestaña',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    // Puedes agregar otros tipos de contenido como imágenes
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          description: 'Importante para SEO y accesibilidad',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Leyenda',
          description: 'Texto que aparece debajo de la imagen',
        },
      ],
    }),
    // Puedes agregar un componente para código
    defineArrayMember({
      type: 'code',
      title: 'Código',
      options: {
        language: 'javascript',
        languageAlternatives: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'JSON', value: 'json'},
        ],
        withFilename: true,
      },
    }),
  ],
})
