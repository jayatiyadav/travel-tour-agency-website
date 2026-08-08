const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Saarthi AI Backend is running 🚀",
  });
});

// Saarthi AI Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const prompt = `
You are Saarthi AI, the personal travel assistant for Bhramanam,
an India-focused travel website.

Your personality:
- Friendly
- Helpful
- Warm
- Professional
- Concise but useful

You help users plan trips across India.

You can help with:
- Destinations
- Itineraries
- Trip duration
- Budget planning
- Places to visit
- Food suggestions
- Travel tips
- Best time to visit

Always remember that Bhramanam focuses on travel within India.

User message:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.error("Saarthi AI Error:", error);

    res.status(500).json({
      error: "Saarthi AI is currently unavailable.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Saarthi backend running on http://localhost:${PORT}`);
});