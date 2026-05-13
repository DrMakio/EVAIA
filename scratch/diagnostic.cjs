const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded for diagnostic only
const API_KEY = "AIzaSyBz1lt5iag1DnMr5qLoeo08thaIi3dq7js";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  console.log("INICIANDO DIAGNÓSTICO...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Dime hola");
    const response = await result.response;
    console.log("DIAGNÓSTICO EXITOSO:", response.text());
  } catch (e) {
    console.log("--- ERROR DETECTADO ---");
    console.log("Mensaje:", e.message);
    if (e.message.includes("API_KEY_INVALID")) {
      console.log("CAUSA PROBABLE: La API Key no es válida.");
    } else if (e.message.includes("quota") || e.message.includes("429")) {
      console.log("CAUSA PROBABLE: Has alcanzado el límite de cuota gratuita (Rate Limit).");
    } else if (e.message.includes("location") || e.message.includes("region")) {
      console.log("CAUSA PROBABLE: Tu región no tiene acceso a este modelo de Gemini.");
    } else {
      console.log("CAUSA PROBABLE: Error de red o configuración de seguridad.");
    }
    console.log("-----------------------");
  }
}

test();
