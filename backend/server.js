const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GoogleGenAI } = require("@google/genai");
const Hotel = require("./models/Hotel");
const Flight = require("./models/Flight");
const Booking = require("./models/Booking");

require("dotenv").config({ path: "../.env" });

const User = require("./models/User");
const Tour = require("./models/Tour");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// =======================
// MongoDB Connection
// =======================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected successfully ✅");

    // Add initial tours if database is empty
    const tourCount = await Tour.countDocuments();

    if (tourCount === 0) {
      await Tour.insertMany([
        {
          name: "Kashmir Paradise Tour",
          destination: "Kashmir",
          duration: "6 Days / 5 Nights",
          price: 25000,
          places: ["Srinagar", "Gulmarg", "Pahalgam", "Dal Lake"],
          description:
            "Explore the beautiful valleys, lakes and mountains of Kashmir.",
          image: "",
        },
        {
          name: "Royal Rajasthan Tour",
          destination: "Rajasthan",
          duration: "7 Days / 6 Nights",
          price: 30000,
          places: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
          description:
            "Experience the royal heritage, forts and culture of Rajasthan.",
          image: "",
        },
        {
          name: "Kerala Backwaters Tour",
          destination: "Kerala",
          duration: "5 Days / 4 Nights",
          price: 22000,
          places: ["Kochi", "Munnar", "Alleppey", "Thekkady"],
          description:
            "Discover Kerala's backwaters, greenery and beautiful landscapes.",
          image: "",
        },
      ]);

      console.log("Initial tours added to MongoDB ✅");
    }
    const hotelCount = await Hotel.countDocuments();

if (hotelCount === 0) {
  await Hotel.insertMany([
    {
      name: "The Lalit Grand Palace",
      city: "Srinagar",
      pricePerNight: 6500,
      rating: 4.5,
      description: "Luxury stay in the beautiful Kashmir valley.",
      image: "",
    },
    {
      name: "Rajasthan Heritage Hotel",
      city: "Jaipur",
      pricePerNight: 4500,
      rating: 4.3,
      description: "Traditional Rajasthani hospitality in Jaipur.",
      image: "",
    },
    {
      name: "Kerala Backwater Resort",
      city: "Alleppey",
      pricePerNight: 5000,
      rating: 4.6,
      description: "Beautiful resort near the Kerala backwaters.",
      image: "",
    },
  ]);

  console.log("Initial hotels added to MongoDB ✅");
}

// Add initial flights if database is empty
const flightCount = await Flight.countDocuments();

if (flightCount === 0) {
  await Flight.insertMany([
    {
      airline: "IndiGo",
      from: "Mumbai",
      to: "Delhi",
      departureTime: "08:00 AM",
      arrivalTime: "10:10 AM",
      price: 5500,
    },
    {
      airline: "Air India",
      from: "Delhi",
      to: "Srinagar",
      departureTime: "09:30 AM",
      arrivalTime: "11:00 AM",
      price: 6500,
    },
    {
      airline: "IndiGo",
      from: "Mumbai",
      to: "Kochi",
      departureTime: "07:15 AM",
      arrivalTime: "09:20 AM",
      price: 4800,
    },
  ]);

  console.log("Initial flights added to MongoDB ✅");
}
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌", error);
  });
  // Add initial hotels if database is empty


// =======================
// Gemini AI
// =======================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =======================
// Test Route
// =======================

app.get("/", (req, res) => {
  res.json({
    message: "Bhramanam Backend is running 🚀",
  });
});

// =======================
// AUTH MIDDLEWARE
// =======================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

// =======================
// ADMIN MIDDLEWARE
// =======================

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Admin access required",
    });
  }

  next();
};

// =======================
// SIGNUP
// =======================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    res.status(201).json({
      message: "Account created successfully 🎉",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      error: "Unable to create account",
    });
  }
});

// =======================
// LOGIN
// =======================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful 🎉",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      error: "Unable to login",
    });
  }
});

// =======================
// GET CURRENT USER
// =======================

app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch user",
    });
  }
});

// =======================
// GET ALL TOURS
// =======================

app.get("/api/tours", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });

    res.json(tours);
  } catch (error) {
    console.error("Get Tours Error:", error);

    res.status(500).json({
      error: "Unable to fetch tours",
    });
  }
});

// =======================
// GET SINGLE TOUR
// =======================

app.get("/api/tours/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        error: "Tour not found",
      });
    }

    res.json(tour);
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch tour",
    });
  }
});
// =======================
// HOTELS
// =======================

app.get("/api/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    console.error("Get Hotels Error:", error);

    res.status(500).json({
      error: "Unable to fetch hotels",
    });
  }
});
// =======================
// FLIGHTS
// =======================

app.get("/api/flights", async (req, res) => {
  try {
    const flights = await Flight.find().sort({ createdAt: -1 });
    res.json(flights);
  } catch (error) {
    console.error("Get Flights Error:", error);

    res.status(500).json({
      error: "Unable to fetch flights",
    });
  }
});

// =======================
// ADD TOUR - ADMIN
// =======================

app.post(
  "/api/tours",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        name,
        destination,
        duration,
        price,
        places,
        description,
        image,
      } = req.body;

      if (!name || !destination || !duration || !price) {
        return res.status(400).json({
          error: "Name, destination, duration and price are required",
        });
      }

      const tour = new Tour({
        name,
        destination,
        duration,
        price,
        places: places || [],
        description: description || "",
        image: image || "",
      });

      await tour.save();

      res.status(201).json({
        message: "Tour added successfully 🎉",
        tour,
      });
    } catch (error) {
      console.error("Add Tour Error:", error);

      res.status(500).json({
        error: "Unable to add tour",
      });
    }
  }
);

// =======================
// UPDATE TOUR - ADMIN
// =======================

app.put(
  "/api/tours/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const tour = await Tour.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!tour) {
        return res.status(404).json({
          error: "Tour not found",
        });
      }

      res.json({
        message: "Tour updated successfully ✅",
        tour,
      });
    } catch (error) {
      console.error("Update Tour Error:", error);

      res.status(500).json({
        error: "Unable to update tour",
      });
    }
  }
);

// =======================
// DELETE TOUR - ADMIN
// =======================

app.delete(
  "/api/tours/:id",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const tour = await Tour.findByIdAndDelete(req.params.id);

      if (!tour) {
        return res.status(404).json({
          error: "Tour not found",
        });
      }

      res.json({
        message: "Tour deleted successfully 🗑️",
      });
    } catch (error) {
      console.error("Delete Tour Error:", error);

      res.status(500).json({
        error: "Unable to delete tour",
      });
    }
  }
);
// =======================
// BOOKINGS
// =======================

// Create booking
app.post("/api/bookings", authenticateToken, async (req, res) => {
  try {
    const {
      type,
      itemId,
      itemName,
      quantity,
      totalPrice,
    } = req.body;

    if (!type || !itemId || !itemName || !totalPrice) {
      return res.status(400).json({
        error: "type, itemId, itemName and totalPrice are required",
      });
    }

    const booking = new Booking({
      userId: req.user.id,
      type,
      itemId,
      itemName,
      quantity: quantity || 1,
      totalPrice,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking confirmed successfully 🎉",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    res.status(500).json({
      error: "Unable to create booking",
    });
  }
});

// Get current user's bookings
app.get("/api/bookings", authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Get Bookings Error:", error);

    res.status(500).json({
      error: "Unable to fetch bookings",
    });
  }
});

// Cancel booking
app.delete(
  "/api/bookings/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const booking = await Booking.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!booking) {
        return res.status(404).json({
          error: "Booking not found",
        });
      }

      booking.status = "cancelled";
      await booking.save();

      res.json({
        message: "Booking cancelled successfully",
        booking,
      });
    } catch (error) {
      console.error("Cancel Booking Error:", error);

      res.status(500).json({
        error: "Unable to cancel booking",
      });
    }
  }
);

// =======================
// SAARTHI AI
// =======================

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const tours = await Tour.find();

    const tourData = JSON.stringify(tours);

    const prompt = `
You are Saarthi AI, the official travel assistant for Bhramanam.

Bhramanam offers travel experiences across India.

IMPORTANT:
Use the following MongoDB tour data as the official Bhramanam tour information.

OFFICIAL BHRAMANAM TOURS:
${tourData}

RULES:
1. Never invent a Bhramanam tour.
2. Never invent a Bhramanam price.
3. Never invent a Bhramanam duration.
4. Only recommend tours that exist in the provided data.
5. If the requested destination is unavailable, clearly say so.
6. You may provide general travel advice, but clearly label it as a general suggestion.
7. Be friendly, helpful, warm and professional.

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

// =======================
// START SERVER
// =======================

app.listen(PORT, () => {
  console.log(`Saarthi backend running on http://localhost:${PORT}`);
});