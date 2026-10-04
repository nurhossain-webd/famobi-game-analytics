interface FamobiGameInterface {
  gameReady: (isPlayerReady?: boolean) => void;
}

interface Window {
  GameInterface: FamobiGameInterface;
}
