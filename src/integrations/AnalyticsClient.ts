import type { GameController } from "../application/GameController";

const ANALYTICS_URL = "http://localhost:3001/api/events";

async function sendEvent(event: object): Promise<void> {
  try {
    const response = await fetch(ANALYTICS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      console.error("Analytics request failed:", response.status);
    }
  } catch (error) {
    console.error("Failed to send analytics:", error);
  }
}

export function connectAnalytics(controller: GameController): void {
  controller.events.on("runStarted", ({ level, occurredAt }) => {
    void sendEvent({
      type: "game_start",
      level,
      timestamp: occurredAt,
    });
  });

  controller.events.on(
    "runEnded",
    ({ level, score, progress, reason, occurredAt }) => {
      void sendEvent({
        type: "game_end",
        level,
        outcome: reason === "quit" ? "left" : reason,
        score,
        progress: Math.round(progress * 100),
        timestamp: occurredAt,
      });
    }
  );
}