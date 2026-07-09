// src/services/geminiEngine.js
import { GoogleGenerativeAI } from "@google/generative-ai"; // <-- CORRECCIÓN: Nombre correcto del SDK

/**
 * Envía el CV base y la descripción del cargo a Gemini para obtener una versión optimizada para ATS.
 */
export const optimizeCVWithGemini = async (apiKey, baseCV, jobDescription, language) => {
  if (!apiKey) throw new Error("La API Key es obligatoria.");
  if (!baseCV || !jobDescription) throw new Error("El CV base y la descripción del cargo son obligatorios.");

  // 1. Inicialización correcta para el paquete @google/generative-ai
  const genAI = new GoogleGenerativeAI(apiKey);

  // Forzamos el modo JSON directo en la configuración del modelo
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // <-- ACTUALIZADO
    generationConfig: { responseMimeType: "application/json" }
  });

  const targetLangText = language === 'en'
    ? "ENGLISH: You must translate and write the entire output profile strictly in English language."
    : "ESPAÑOL: Debes traducir y redactar todo el perfil de salida estrictamente en idioma Español castellano.";

  // 2. Estructura del Prompt
  const prompt = `
    Actúas como un reclutador técnico senior y experto en optimización de sistemas ATS (Applicant Tracking Systems).
    Tu objetivo es tomar el Currículum Base de un candidato y la Descripción del Cargo (Job Description) proporcionada, y reescribir el contenido para maximizar el 'Match Rate' semántico.

    REGLAS CRÍTICAS DE ÉTICA Y SEGURIDAD:
    1. PROHIBIDO INVENTAR: No inventes empleos, no inventes empresas, no alteres las fechas de inicio o fin, y no agregues títulos universitarios que el candidato no tenga.
    2. OPTIMIZACIÓN SEMÁNTICA: Adapta la narrativa. Reemplaza sinónimos por las palabras clave exactas que pide la oferta laboral. Resalta los logros, herramientas y tecnologías del candidato que hagan match directo con los requisitos solicitados.
    3. REGLA DE IDIOMA MANDATORIA: ¡CRÍTICO! -> ${targetLangText} Ningún campo del JSON resultante puede quedar en otro idioma que no sea el solicitado aquí.

    DATOS ENTRADA:
    ---
    CURRÍCULUM BASE:
    ${baseCV}
    ---
    JOB DESCRIPTION:
    ${jobDescription}
    ---

    INSTRUCCIÓN DE SALIDA:
    Debes responder ÚNICAMENTE con un objeto JSON válido, siguiendo exactamente esta estructura:

    {
      "name": "Nombre completo",
      "title": "Título profesional adaptado al cargo",
      "contact": {
        "email": "Email",
        "phone": "Teléfono",
        "location": "Ciudad, País",
        "links": ["Enlace 1", "Enlace 2"]
      },
      "summary": "Extracto profesional de máximo 4 líneas optimizado.",
      "skills": ["Habilidad 1", "Habilidad 2"],
      "experience": [
        {
          "company": "Empresa",
          "role": "Cargo",
          "period": "Fechas",
          "highlights": [
            "Logro optimizado 1",
            "Logro optimizado 2"
          ]
        }
      ],
      "education": [
        {
          "degree": "Título",
          "institution": "Institución",
          "period": "Fechas"
        }
      ]
    }
  `;

  try {
    // 3. Ejecución de la consulta nativa
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error en el motor GeminiEngine:", error);
    throw new Error("Error de comunicación con la IA. Verifica que tu API Key sea válida.");
  }
};