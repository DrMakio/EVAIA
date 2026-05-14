const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyBOBKnO4JI9ud2Qmg4hgBgcLHmP30V0GpY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  console.log("PROBANDO API KEY 4...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent("Dime 'Eva está viva'");
    const response = await result.response;
    console.log("RESULTADO:", response.text());
  } catch (e) {
    console.log("ERROR CON KEY 4:", e.message);
  }
}
test();
