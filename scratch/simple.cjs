const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyDYX8Of58SSiVEr_k4yyYJjFDKmv8lG_Z4";
const genAI = new GoogleGenerativeAI(API_KEY);
async function test() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const result = await model.generateContent("Hola");
  console.log("OK:", result.response.text());
}
test();
