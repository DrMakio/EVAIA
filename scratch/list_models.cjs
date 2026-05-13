const https = require("https");
const API_KEY = "AIzaSyDYX8Of58SSiVEr_k4yyYJjFDKmv8lG_Z4";

function list() {
  console.log("LISTANDO MODELOS DISPONIBLES...");
  https.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log("RESPUESTA API:", data);
    });
  }).on("error", (err) => {
    console.log("ERROR:", err.message);
  });
}
list();
