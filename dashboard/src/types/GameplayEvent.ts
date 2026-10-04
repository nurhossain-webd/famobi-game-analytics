export type GameplayEvent = {
  id: string;
  type: "game_start" | "game_end";
  level: number;
  timestamp: number;
  outcome?: "complete" | "fail" | "left";
  score?: number;
  progress?: number;
};