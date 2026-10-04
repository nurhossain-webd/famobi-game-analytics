type OverviewProps = {
  totalRuns: number;
  averageScore: number;
  completionRate: number;
};

function Overview({
  totalRuns,
  averageScore,
  completionRate,
}: OverviewProps) {
  return (
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
  );
}

export default Overview;