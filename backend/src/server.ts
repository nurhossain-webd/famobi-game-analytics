import express from "express";
import cors from "cors";
import { db } from "./firebase.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Check whether the backend is running
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

// Receive a gameplay analytics event and store it in Firestore
app.post("/api/events", async (req, res) => {
  const event = req.body;

  // Basic validation
  if (!event.type || !event.level || !event.timestamp) {
    return res.status(400).json({
      error: "Missing required event fields",
    });
  }

  try {
    const document = await db.collection("gameplayEvents").add(event);

    console.log("Gameplay event stored:", document.id);

    return res.status(201).json({
      message: "Event stored",
      id: document.id,
    });
  } catch (error) {
    console.error("Failed to store gameplay event:", error);

    return res.status(500).json({
      error: "Failed to store event",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});