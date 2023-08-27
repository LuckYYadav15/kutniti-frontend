import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'JAN',
    neg: 40,
    pos: 24,
    neu: 14,
    grey: 0,
  },
  {
    name: 'FEB',
    neg: 20,
    pos: 44,
    neu: 24,
    grey: 0,
  },
  {
    name: 'MAR',
    neg: 30,
    pos: 24,
    neu: 4,
    grey: 0,
  },
  {
    name: 'APR',
    neg: 50,
    pos: 14,
    neu: 24,
    grey: 0,
  },
  {
    name: 'MAY',
    neg: 30,
    pos: 34,
    neu: 24,
    grey: 0,
  },
  {
    name: 'JUNE',
    neg: 60,
    pos: 24,
    neu: 14,
    grey: 0,
  },
  {
    name: 'JULY',
    neg: 10,
    pos: 54,
    neu: 14,
    grey: 0,
  },
  {
    name: 'AUG',
    neg: 60,
    pos: 24,
    neu: 14,
    grey: 0,
  },
  {
    name: 'SEPT',
    neg: 0,
    pos: 0,
    neu: 0,
    grey: 0,
  },
  {
    name: 'OCT',
    neg: 0,
    pos: 0,
    neu: 0,
    grey: 0,
  },
  {
    name: 'NOV',
    neg: 0,
    pos: 0,
    neu: 0,
    grey: 0,
  },
  {
    name: 'DEC',
    neg: 0,
    pos: 0,
    neu: 0,
    grey: 0,
  },
];

let maxPossibleSum = 0;
data.forEach(entry => {
  const sum = entry.pos + entry.neg + entry.neu;
  if (sum > maxPossibleSum) {
    maxPossibleSum = sum;
  }
});

// Update grey values for entries with all 0 pos, neg, neu values
data.forEach(entry => {
  if (entry.neg === 0 && entry.pos === 0 && entry.neu === 0) {
    entry.grey = maxPossibleSum;
  }
});

export default class Example extends PureComponent {

  render() {
    return (

        <BarChart
          width={700}
          height={450}
          data={data}
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
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey="neg" stackId="a" fill="#ff2b47" />
          <Bar dataKey="pos" stackId="a" fill="#00f050" />
          <Bar dataKey="neu" stackId="a" fill="#fff000" />
          <Bar dataKey="grey" stackId="a" fill="#a6a6a6" />
        </BarChart>
    
    );
  }
}
