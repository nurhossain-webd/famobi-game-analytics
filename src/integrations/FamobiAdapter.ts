import type { GameController } from "../application/GameController";

export function connectFamobi(controller: GameController): void {
  controller.events.on("ready", () => {
    window.GameInterface.gameReady();
  });

  controller.events.on("runStarted", ({ level }) => {
    window.GameInterface.gameStart(level).catch((error) => {
      console.error("Famobi gameStart failed:", error);
    });
  });

  controller.events.on("runEnded", ({ reason }) => {
    window.GameInterface.gameEnd(reason).catch((error) => {
      console.error("Famobi gameEnd failed:", error);
    });
  });
  controller.events.on("scoreChanged", ({ level, score }) => {
  window.GameInterface.sendScore(score, {
    type: "live",
    level,
  });
});

controller.events.on("progressChanged", ({ progress }) => {
  window.GameInterface.sendProgress(progress * 100);
});
}