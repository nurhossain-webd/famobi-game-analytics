import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type ScoreData = {
  level: string;
  averageScore: number;
};

type ScoreByLevelChartProps = {
  data: ScoreData[];
};

function ScoreByLevelChart({
  data,
}: ScoreByLevelChartProps) {
  return (
    <section>
      <h2>Average Score by Level</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              allowDecimals={false}
            />

            <YAxis
              type="category"
              dataKey="level"
              width={80}
            />

            <Tooltip />

            <Bar
              dataKey="averageScore"
              fill="#82ca9d"
               barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ScoreByLevelChart;