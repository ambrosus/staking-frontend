import React from 'react';
import { AreaChart, Area, XAxis, Tooltip } from 'recharts';

const data = [
  {
    name: 'Dec 11',
    uv: 1500,
  },
  {
    name: '',
    uv: 3500,
  },
  {
    name: '',
    uv: 2000,
  },
  {
    name: 'Dec 12',
    uv: 2400,
  },
  {
    name: '',
    uv: 5000,
  },
  {
    name: '',
    uv: 1500,
  },
  {
    name: 'Dec 13',
    uv: 3500,
  },
  {
    name: '',
    uv: 2000,
  },
  {
    name: '',
    uv: 2400,
  },
  {
    name: 'Dec 14',
    uv: 5000,
  },
];

export default function StakingChart() {
  return (
    <div className="chart">
      <div className="chart__heading">Pool Performance</div>
      <div className="chart__chart">
        <AreaChart
          width={560}
          height={148}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 30,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="name"
            fill="white"
            fontSize={12}
            style={{
              fill: '#fff',
              fontSize: 12,
              fontFamily: 'Halvar Breitschrift',
            }}
          />
          <Tooltip />
          <Area
            className="gradient"
            dataKey="uv"
            stroke="#15D378"
            fill="rgba(21, 211, 120, 0.4)"
          />
        </AreaChart>
      </div>
    </div>
  );
}
