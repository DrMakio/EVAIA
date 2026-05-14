const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyBOBKnO4JI9ud2Qmg4hgBgcLHmP30V0GpY";
const genAI = new GoogleGenerativeAI(API_KEY);
async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hola");
    console.log("OK:", result.response.text());
  } catch (e) {
    console.log("FAIL:", e.message);
  }
}
test();
