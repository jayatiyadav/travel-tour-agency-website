const tours = require("./tours");
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
// Get all tours
app.get("/api/tours", (req, res) => {
  res.json(tours);
});

// Get single tour
app.get("/api/tours/:id", (req, res) => {
  const tour = tours.find(
    (tour) => tour.id === parseInt(req.params.id)
  );

  if (!tour) {
    return res.status(404).json({
      error: "Tour not found",
    });
  }

  res.json(tour);
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
const tourData = JSON.stringify(tours);
    const prompt = `
You are Saarthi AI, the official travel assistant for Bhramanam.

IMPORTANT RULE:
You MUST use ONLY the official Bhramanam tour data provided below
when answering questions about Bhramanam tours.

OFFICIAL BHRAMANAM TOURS:
${tourData}

STRICT RULES:
1. Never invent or create a Bhramanam tour.
2. Never invent a Bhramanam tour name.
3. Never invent a Bhramanam price.
4. Never invent a Bhramanam duration.
5. Never claim that a tour is offered by Bhramanam unless it exists
   in the official tour data.
6. If a requested tour or destination is not available in the data,
   clearly say that it is not currently available.
7. You may provide general travel suggestions, but clearly label them
   as general suggestions and NOT as official Bhramanam tours.

Be friendly, helpful, warm and professional.

Bhramanam focuses on travel within India.

User message:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
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