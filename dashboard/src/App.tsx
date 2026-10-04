import { useEffect, useState } from "react";

import Overview from "./components/Overview";
import OutcomeChart from "./components/OutcomeChart";
import ScoreByLevelChart from "./components/ScoreByLevelChart";

import type { GameplayEvent } from "./types/GameplayEvent";

import {
  getEndedRuns,
  getOverviewData,
  getOutcomeData,
  getScoreByLevelData,
} from "./utils/analyticscalculations";

function App() {
  // State
  const [events, setEvents] = useState<GameplayEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Analytics
  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/analytics"
        );

        if (!response.ok) {
          throw new Error("Failed to load analytics");
        }

        const data: GameplayEvent[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    void loadAnalytics();
  }, []);

  // Prepare Dashboard Data
  const endedRuns = getEndedRuns(events);

  const {
    totalRuns,
    averageScore,
    completionRate,
  } = getOverviewData(endedRuns);

  const outcomeData = getOutcomeData(endedRuns);

  const scoreByLevelData = getScoreByLevelData(endedRuns);

  // Loading State
  if (loading) {
    return <p>Loading analytics...</p>;
  }

  // Dashboard UI
  return (
    <main>
      <h1>Gameplay Analytics</h1>

      <Overview
        totalRuns={totalRuns}
        averageScore={averageScore}
        completionRate={completionRate}
      />

      <OutcomeChart data={outcomeData} />

      <ScoreByLevelChart data={scoreByLevelData} />
    </main>
  );
}

export default App;