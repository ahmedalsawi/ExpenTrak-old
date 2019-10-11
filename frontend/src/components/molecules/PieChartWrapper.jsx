import React, { Component } from "react";
import { PieChart, Pie } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

class PieChartWrapper extends Component {
  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data01}
          dataKey="value"
          cx={200}
          cy={200}
          outerRadius={60}
          fill="#8884d8"
          label
        />
      </PieChart>
    );
  }
}
export default PieChartWrapper;
