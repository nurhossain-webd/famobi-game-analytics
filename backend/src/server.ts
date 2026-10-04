import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.post("/api/events", (req, res) => {
  const event = req.body;

  if (!event.type || !event.level || !event.timestamp) {
    return res.status(400).json({
      error: "Missing required event fields",
    });
  }

  console.log("Gameplay event received:", event);

  return res.status(201).json({
    message: "Event received",
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});