import type { GameController } from "../application/GameController";

export function connectFamobi(controller: GameController): void {
  // Tell Famobi when the game is ready.
  controller.events.on("ready", () => {
    window.GameInterface.gameReady();
  });

  // Tell Famobi when gameplay starts.
  controller.events.on("runStarted", ({ level }) => {
    window.GameInterface.gameStart(level).catch((error) => {
      console.error("Famobi gameStart failed:", error);
    });
  });

  // Send the current score to Famobi.
  controller.events.on("scoreChanged", ({ level, score }) => {
    window.GameInterface.sendScore(score, {
      type: "live",
      level,
    });
  });

  // Game progress is 0-1, while Famobi expects a percentage.
  controller.events.on("progressChanged", ({ progress }) => {
    window.GameInterface.sendProgress(progress * 100);
  });

  // Tell Famobi when the player pauses or resumes the game.
  controller.events.on("pauseChanged", ({ paused, source }) => {
    if (paused && source === "player") {
      window.GameInterface.gamePause().catch((error) => {
        console.error("Famobi gamePause failed:", error);
      });
    }

    if (!paused && source === null) {
      window.GameInterface.gameResume().catch((error) => {
        console.error("Famobi gameResume failed:", error);
      });
    }
  });

  // Tell Famobi how the current gameplay run ended.
  controller.events.on("runEnded", ({ reason }) => {
    window.GameInterface.gameEnd(reason).catch((error) => {
      console.error("Famobi gameEnd failed:", error);
    });
  });
}