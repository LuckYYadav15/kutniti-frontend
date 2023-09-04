import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';



const CustomPieChart = ({ hoveredPositive, hoveredNegative, fillType }) => {
  const [data, setData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  let COLORS=[];
  if(fillType==="positive"){
   COLORS = ['#00f050', '#d3f0d1', 'gray', 'gray'];
  }
  if(fillType==="negative"){
     COLORS = ['#ff2b47', '#f5c9c9', 'gray', 'gray'];
  }
  if(fillType==="neutral"){
     COLORS = ['#fff000', '#f3f5c1', 'gray', 'gray'];
  }
  

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

  // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  //   if (data[index].value === 0) {
  //     return null; // Do not render labels for zero values
  //   }
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle);
  //   const y = cy + radius * Math.sin(-midAngle);

  //   return (
  //     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="middle" fontSize={12}>
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };

  return (
    <div>
      {showChart && (
        <PieChart width={25} height={50}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            innerRadius={6}
            outerRadius={11}
            fill="gray"
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
