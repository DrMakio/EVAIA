const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyBz1lt5iag1DnMr5qLoeo08thaIi3dq7js";
const genAI = new GoogleGenerativeAI(API_KEY);

async function list() {
  try {
    // Note: The SDK might not have a direct listModels, we usually check documentation or use a known one.
    // Let's try 'gemini-pro' which is the old reliable.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Dime hola");
    const response = await result.response;
    console.log("SUCCESS WITH gemini-pro:", response.text());
  } catch (e) {
    console.log("ERROR WITH gemini-pro:", e.message);
  }
}
list();
