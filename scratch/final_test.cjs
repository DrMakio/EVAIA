const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyDYX8Of58SSiVEr_k4yyYJjFDKmv8lG_Z4";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  console.log("PROBANDO gemini-2.0-flash-lite...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent("Dime 'Conexión exitosa'");
    const response = await result.response;
    console.log("RESULTADO:", response.text());
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
test();
