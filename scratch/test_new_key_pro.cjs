const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyDYX8Of58SSiVEr_k4yyYJjFDKmv8lG_Z4";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hola");
    const response = await result.response;
    console.log("SUCCESS WITH gemini-pro:", response.text());
  } catch (e) {
    console.log("ERROR WITH gemini-pro:", e.message);
  }
}
test();
