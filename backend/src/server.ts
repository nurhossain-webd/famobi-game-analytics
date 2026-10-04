import express from "express";
import cors from "cors";
import { db } from "./firebase.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.post("/api/events", async (req, res) => {
  const event = req.body;

  // Validate fields shared by both event types
  if (
    !event ||
    !["game_start", "game_end"].includes(event.type) ||
    !Number.isInteger(event.level) ||
    event.level < 1 ||
    typeof event.timestamp !== "number"
  ) {
    return res.status(400).json({
      error: "Invalid gameplay event",
    });
  }

  // game_end has additional required fields
  if (
    event.type === "game_end" &&
    (
      !["complete", "fail", "left"].includes(event.outcome) ||
      typeof event.score !== "number" ||
      event.score < 0 ||
      typeof event.progress !== "number" ||
      event.progress < 0 ||
      event.progress > 100
    )
  ) {
    return res.status(400).json({
      error: "Invalid game_end event",
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
app.get("/api/analytics", async (_req, res) => {
  try {
    const snapshot = await db
      .collection("gameplayEvents")
      .orderBy("timestamp", "asc")
      .get();

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json(events);
  } catch (error) {
    console.error("Failed to load analytics:", error);

    return res.status(500).json({
      error: "Failed to load analytics",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});