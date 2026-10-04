interface FamobiGameInterface {
  gameReady: (isPlayerReady?: boolean) => void;
  gameStart: (level?: number) => Promise<void>;
  gameEnd: (reason: "complete" | "fail" | "quit") => Promise<void>;
}

interface Window {
  GameInterface: FamobiGameInterface;
}