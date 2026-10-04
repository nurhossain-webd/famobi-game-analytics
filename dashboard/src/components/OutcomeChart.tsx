import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type OutcomeData = {
  outcome: string;
  count: number;
};

type OutcomeChartProps = {
  data: OutcomeData[];
};

function OutcomeChart({ data }: OutcomeChartProps) {
  return (
    <section>
      <h2>Run Outcomes</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="outcome" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default OutcomeChart;