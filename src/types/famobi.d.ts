interface FamobiGameInterface {
  sendPreloadProgress: (progress: number) => void;
  gameReady: (isPlayerReady?: boolean) => void;

  gameStart: (level?: number) => Promise<void>;
  gameEnd: (reason: "complete" | "fail" | "quit") => Promise<void>;

  gamePause: () => Promise<void>;
  gameResume: () => Promise<void>;

  sendScore: (
    score: number,
    params?: {
      type?: "live" | "total" | "level" | "stage";
      level?: number;
      stage?: number;
    }
  ) => void;

  sendProgress: (progress: number) => void;
}

interface Window {
  GameInterface: FamobiGameInterface;
}