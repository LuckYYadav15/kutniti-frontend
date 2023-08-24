import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'JAN',
    neg: 40,
    pos: 24,
    neu: 14,
  },
  {
    name: 'FEB',
    neg: 20,
    pos: 44,
    neu: 24,
  },
  {
    name: 'MAR',
    neg: 30,
    pos: 24,
    neu: 4,
  },
  {
    name: 'APR',
    neg: 50,
    pos: 14,
    neu: 24,
  },
  {
    name: 'MAY',
    neg: 30,
    pos: 34,
    neu: 24,
  },
  {
    name: 'JUNE',
    neg: 40,
    pos: 24,
    neu: 14,
  },
  {
    name: 'JULY',
    neg: 10,
    pos: 24,
    neu: 14,
  },
];

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
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="neg" stackId="a" fill="#ff2b47" />
          <Bar dataKey="pos" stackId="a" fill="#00f050" />
          <Bar dataKey="neu" stackId="a" fill="#fff000" />
        </BarChart>
    
    );
  }
}
