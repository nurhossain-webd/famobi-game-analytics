import type { GameplayEvent } from "../types/GameplayEvent";

// Ended Runs 

export function getEndedRuns(events: GameplayEvent[]) {
  return events.filter((event) => event.type === "game_end");
}

// Overview Data 

export function getOverviewData(endedRuns: GameplayEvent[]) {
  const totalRuns = endedRuns.length;

  const averageScore =
    totalRuns > 0
      ? Math.round(
          endedRuns.reduce(
            (sum, event) => sum + (event.score ?? 0),
            0
          ) / totalRuns
        )
      : 0;

  const completedRuns = endedRuns.filter(
    (event) => event.outcome === "complete"
  ).length;

  const completionRate =
    totalRuns > 0
      ? Math.round((completedRuns / totalRuns) * 100)
      : 0;

  return {
    totalRuns,
    averageScore,
    completionRate,
  };
}

//  Outcome Chart Data 

export function getOutcomeData(endedRuns: GameplayEvent[]) {
  return [
    {
      outcome: "Complete",
      count: endedRuns.filter(
        (event) => event.outcome === "complete"
      ).length,
    },
    {
      outcome: "Fail",
      count: endedRuns.filter(
        (event) => event.outcome === "fail"
      ).length,
    },
    {
      outcome: "Left",
      count: endedRuns.filter(
        (event) => event.outcome === "left"
      ).length,
    },
  ];
}

//  Score by Level Chart Data 

export function getScoreByLevelData(endedRuns: GameplayEvent[]) {
  const levels = [
    ...new Set(endedRuns.map((event) => event.level)),
  ];

  return levels.map((level) => {
    const levelRuns = endedRuns.filter(
      (event) => event.level === level
    );

    const averageScore = Math.round(
      levelRuns.reduce(
        (sum, event) => sum + (event.score ?? 0),
        0
      ) / levelRuns.length
    );

    return {
      level: `Level ${level}`,
      averageScore,
    };
  });
}