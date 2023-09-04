import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: '2017',
    negative: 40,
    positive: 24,
    neutral: 24,
  },
  {
    name: '2018',
    negative: 30,
    positive: 13,
    neutral: 22,
  },
  {
    name: '2019',
    negative: 20,
    positive: 98,
    neutral: 22,
  },
  {
    name: '2020',
    negative: 27,
    positive: 39,
    neutral: 20,
  },
  {
    name: '2021',
    negative: 18,
    positive: 48,
    neutral: 21,
  },
  {
    name: '2022',
    negative: 23,
    positive: 38,
    neutral: 25,
  },
  {
    name: '2023',
    negative: 34,
    positive: 43,
    neutral: 21,
  },
];

export default class Example extends PureComponent {

  render() {
    return (
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#00f050"  />
          <Line type="monotone" dataKey="negative" stroke="#ff2b47" />
          <Line type="monotone" dataKey="neutral" stroke="#fff000" />
        </LineChart>
    );
  }
}
