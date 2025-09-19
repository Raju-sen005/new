// const express = require('express');
// const router = express.Router();
// const OpenAI = require('openai');
// const fetch = require('node-fetch');

// const endpoint = "https://models.github.ai/inference";
// const modelName = "openai/gpt-4o";

// const OPENWEATHER_API_KEY = "dc073890ad385aba43f760fdbe00a871";

// // Utility: Check if prompt is about weather
// const isWeatherQuery = (prompt) => {
//   const keywords = ["weather", "temperature", "climate"];
//   return keywords.some(word => prompt.toLowerCase().includes(word));
// };

// // Extract city from prompt
// const extractCity = (prompt) => {
//   const match = prompt.match(/in\s+([a-zA-Z\s]+)/i);
//   return match ? match[1].trim() : "Kota"; // default to Kota
// };

// router.post('/ask', async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ message: "Prompt is required." });
//   }

//   try {
//     if (isWeatherQuery(prompt)) {
//       const city = extractCity(prompt);

//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
//       );
//       const weatherData = await weatherRes.json();

//       if (weatherData.main) {
//         return res.json({
//           response: `The current temperature in ${city} is **${weatherData.main.temp}°C**, with **${weatherData.weather[0].description}**.`,
//         });
//       } else {
//         return res.json({ response: "Sorry, I couldn't find weather data for that location." });
//       }
//     }

//     // Fallback to AI model
//     const client = new OpenAI({ baseURL: endpoint, apiKey: token });

//     const response = await client.chat.completions.create({
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: prompt }
//       ],
//       temperature: 1.0,
//       top_p: 1.0,
//       max_tokens: 1000,
//       model: modelName
//     });

//     res.json({ response: response.choices[0].message.content });

//   } catch (error) {
//     console.error("Error in /ask:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// });

// module.exports = router;
