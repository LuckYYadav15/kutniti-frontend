import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




export default class CustomBarChart extends PureComponent {
  render() {
    let { chartData } = this.props;


    let maxPossibleSum = 0;
chartData.forEach(entry => {
  const sum = entry.pos + entry.neg + entry.neu;
  if (sum > maxPossibleSum) {
    maxPossibleSum = sum;
  }
});

// Update max values for entries with all 0 pos, neg, neu values
chartData.forEach(entry => {
  if (entry.neg === 0 && entry.pos === 0 && entry.neu === 0) {
    entry.max = maxPossibleSum;
  }
});
    return (

        <BarChart
          width={800}
          height={420}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="neg" stackId="a" fill="#ff2b47" barSize={50}/>
          <Bar dataKey="pos" stackId="a" fill="#00f050" barSize={50}/>
          <Bar dataKey="neu" stackId="a" fill="#fff000" barSize={50}/>
          <Bar dataKey="max" stackId="a" fill="#a6a6a6" barSize={50}/>
        </BarChart>
    
    );
  }
}
