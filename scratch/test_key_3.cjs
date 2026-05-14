const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyCgxBIpBW9eOWEa-7qVQiLMCAmqHQGVcUQ";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  console.log("PROBANDO API KEY 3...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent("Dime 'Conexión perfecta'");
    const response = await result.response;
    console.log("RESULTADO:", response.text());
  } catch (e) {
    console.log("ERROR CON KEY 3:", e.message);
  }
}
test();
