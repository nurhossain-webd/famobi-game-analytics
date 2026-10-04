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
              dataKey="outcome"
              width={80}
            />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#8884d8"
               barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default OutcomeChart;