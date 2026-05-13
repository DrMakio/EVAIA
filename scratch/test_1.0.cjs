const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyBz1lt5iag1DnMr5qLoeo08thaIi3dq7js";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const result = await model.generateContent("Hola");
    const response = await result.response;
    console.log("SUCCESS WITH 1.0-pro:", response.text());
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
test();
