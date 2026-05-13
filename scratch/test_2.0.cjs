const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyBz1lt5iag1DnMr5qLoeo08thaIi3dq7js";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent("Dime hola");
    const response = await result.response;
    console.log("SUCCESS WITH gemini-2.0-flash-exp:", response.text());
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
test();
