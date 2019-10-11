import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const list = [
  { name: "Page A", pv: 2400, amt: 2400 },
  { name: "Page B", pv: 1398, amt: 2210 },
  { name: "Page C", pv: 9800, amt: 2290 },
  { name: "Page D", pv: 3908, amt: 2000 },
  { name: "Page E", pv: 4800, amt: 2181 },
  { name: "Page F", pv: 3800, amt: 2500 },
  { name: "Page G", pv: 4300, amt: 2100 }
];

function BarChartWrapper(props) {
  return (
    <div>
      <BarChart
        width={600}
        height={300}
        data={list}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default BarChartWrapper;
