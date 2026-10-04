import type { GameController } from "../application/GameController";

export function connectFamobi(controller: GameController): void {
  controller.events.on("ready", () => {
    window.GameInterface.gameReady();
  });
}