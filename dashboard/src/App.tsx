import { useEffect, useState } from "react";

type GameplayEvent = {
  id: string;
  type: "game_start" | "game_end";
  level: number;
  timestamp: number;
  outcome?: "complete" | "fail" | "left";
  score?: number;
  progress?: number;
};

function App() {
  const [events, setEvents] = useState<GameplayEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await fetch("http://localhost:3001/api/analytics");

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

  const endedRuns = events.filter((event) => event.type === "game_end");

const totalRuns = endedRuns.length;

const averageScore =
  totalRuns > 0
    ? Math.round(
        endedRuns.reduce((sum, event) => sum + (event.score ?? 0), 0) /
          totalRuns
      )
    : 0;

const completedRuns = endedRuns.filter(
  (event) => event.outcome === "complete"
).length;

const completionRate =
  totalRuns > 0 ? Math.round((completedRuns / totalRuns) * 100) : 0;

  if (loading) {
    return <p>Loading analytics...</p>;
  }

 return (
  <main>
    <h1>Gameplay Analytics</h1>

    <section>
      <div>
        <h2>Total Runs</h2>
        <p>{totalRuns}</p>
      </div>

      <div>
        <h2>Average Score</h2>
        <p>{averageScore}</p>
      </div>

      <div>
        <h2>Completion Rate</h2>
        <p>{completionRate}%</p>
      </div>
    </section>
  </main>
);
}

export default App;