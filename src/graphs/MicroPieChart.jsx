import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#17fc03', '#ff2b47', '#f5f247', '#FF8042'];

const CustomPieChart = ({ hoveredPositive, hoveredNegative }) => {
  const [data, setData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (hoveredPositive !== 0 || hoveredNegative !== 0) {
      setShowChart(true);
      setData([
        { name: 'Positive', value: hoveredPositive },
        { name: 'Negative', value: hoveredNegative },
      ]);
    } else {
      setShowChart(false);
    }
  }, [hoveredPositive, hoveredNegative]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    if (data[index].value === 0) {
      return null; // Do not render labels for zero values
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle);
    const y = cy + radius * Math.sin(-midAngle);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="middle" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      {showChart && (
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            innerRadius={10}
            outerRadius={20}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      )}
    </div>
  );
};

export default CustomPieChart;
