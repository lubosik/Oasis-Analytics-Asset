import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { PICKUP_BY_ATTEMPT } from "@/data/metrics";
import { motion } from "framer-motion";

export function Scene8() {
  // Prepare data for the chart
  const chartData = [
    {
      name: "1 call",
      count: PICKUP_BY_ATTEMPT.oneCall.number,
      display: PICKUP_BY_ATTEMPT.oneCall.display,
      percent: PICKUP_BY_ATTEMPT.oneCall.percent,
    },
    {
      name: "2 calls",
      count: PICKUP_BY_ATTEMPT.twoCalls.number,
      display: PICKUP_BY_ATTEMPT.twoCalls.display,
      percent: PICKUP_BY_ATTEMPT.twoCalls.percent,
    },
    {
      name: "3 calls",
      count: PICKUP_BY_ATTEMPT.threeCalls.number,
      display: PICKUP_BY_ATTEMPT.threeCalls.display,
      percent: PICKUP_BY_ATTEMPT.threeCalls.percent,
    },
    {
      name: "4-5 calls",
      count: PICKUP_BY_ATTEMPT.fourToFiveCalls.number,
      display: PICKUP_BY_ATTEMPT.fourToFiveCalls.display,
      percent: PICKUP_BY_ATTEMPT.fourToFiveCalls.percent,
    },
    {
      name: "6+ calls",
      count: PICKUP_BY_ATTEMPT.sixPlusCalls.number,
      display: PICKUP_BY_ATTEMPT.sixPlusCalls.display,
      percent: PICKUP_BY_ATTEMPT.sixPlusCalls.percent,
    },
  ];

  // Custom label function to show count and percent
  const renderCustomLabel = (props: any) => {
    try {
      if (!props) return null;
      
      const { x, y, width, payload } = props;
      
      // Safety checks
      if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number') {
        return null;
      }
      
      // Get data from payload - Recharts passes the data point here
      if (!payload) return null;
      
      // The payload should contain the data point, but handle different formats
      const dataPoint = payload.payload || payload;
      if (!dataPoint) return null;
      
      // Find matching data
      const data = chartData.find((d) => 
        d.name === dataPoint.name || 
        d.count === dataPoint.count ||
        d.count === dataPoint.value
      );
      
      if (!data) return null;
      
      return (
        <g>
          <text
            x={x + width / 2}
            y={y - 8}
            fill="#111827"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="text-xs sm:text-sm"
          >
            {data.display}
          </text>
          <text
            x={x + width / 2}
            y={y - 22}
            fill="#6B7280"
            textAnchor="middle"
            fontSize="10"
          >
            {data.percent}
          </text>
        </g>
      );
    } catch (error) {
      // Silently fail if there's an error
      return null;
    }
  };

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Most answers happen early, but later attempts still pay.
        </h1>
      </div>

      {/* Bar Chart */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8 px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg border-2 border-gray-200 shadow-sm overflow-x-auto"
        >
          <div className="w-full" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 40, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fontWeight: 600, fill: "#111827" }}
                axisLine={{ stroke: "#D1D5DB", strokeWidth: 2 }}
                tickLine={{ stroke: "#D1D5DB" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={{ stroke: "#D1D5DB", strokeWidth: 2 }}
                tickLine={{ stroke: "#D1D5DB" }}
                label={{
                  value: "Leads Picked Up",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 12, fill: "#6B7280" },
                }}
              />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                label={renderCustomLabel}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#374151" : "#9CA3AF"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        </motion.div>
      </div>

      {/* One-liner */}
      <div className="text-center px-2">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
          This is how 'no lead left behind' looks in practice.
        </p>
      </div>
    </div>
  );
}

