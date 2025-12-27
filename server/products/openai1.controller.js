// // products/openai.controller.js

// const express = require('express');
// const router = express.Router();
// const OpenAI = require('openai');

// // Create OpenAI client
// const client = new OpenAI({
//     baseURL: "https://api.studio.nebius.com/v1/",
//     apiKey: "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNTYxNzEwMzkzNjQzMTExMjUyNyIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTkwMjkxMDAxNiwidXVpZCI6IjJkYTE3ZGFmLTA5YzQtNDMzZC05Yjg4LTAyNjI5NzBhYTUwMSIsIm5hbWUiOiJwaXBlbGluZSIsImV4cGlyZXNfYXQiOiIyMDMwLTA0LTIwVDEwOjA2OjU2KzAwMDAifQ.-K2cDurQxTr9NByCHP75d3hJAtBXjow3rIcQZcGEh-k", // Best practice: use .env variable
// });

// router.post('/generate-image', async (req, res) => {
//     // <img src="data:image/webp;base64,BASE64_STRING_HERE" />
//     const { prompt } = req.body;
//     if (!prompt) return res.status(400).json({ error: "Prompt is required" });

//     try {
//         const response = await client.images.generate({
//             model: "black-forest-labs/flux-dev",
//             response_format: "b64_json",
//             extra_body: {
//                 response_extension: "webp",
//                 width: 1024,
//                 height: 1024,
//                 num_inference_steps: 28,
//                 negative_prompt: "",
//                 seed: -1
//             },
//             prompt: prompt
//         });

//         res.json({ image: response });
//     } catch (error) {
//         console.error("API Request Failed:", error);
//         res.status(500).json({ error: "API request failed", message: error.message });
//     }
// });

// module.exports = router;
