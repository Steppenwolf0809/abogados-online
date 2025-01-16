import { Anthropic } from '@anthropic-ai/sdk';

// Configurar el cliente de Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      temperature: 0.7,
      system: `Eres un asistente legal especializado en servicios notariales en Ecuador. 
      Tu función es ayudar a los usuarios con información sobre trámites notariales, costos y requisitos.
      
      Reglas importantes:
      1. Proporciona información precisa sobre trámites notariales
      2. Calcula costos aproximados basados en las tarifas oficiales
      3. Explica los requisitos necesarios para cada trámite
      4. Deriva casos complejos a un abogado real
      5. Mantén un tono profesional y claro
      
      Limitaciones:
      1. No des consejos legales complejos
      2. Aclara que los costos son aproximados
      3. No garantices resultados específicos
      4. Sugiere consultar con un profesional cuando sea necesario`,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });

    return res.status(200).json({
      response: completion.content[0].text
    });

  } catch (error) {
    console.error('Error processing chat request:', error);
    return res.status(500).json({
      error: 'Error processing your request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
