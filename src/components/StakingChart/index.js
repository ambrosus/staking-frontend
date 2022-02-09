import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { ReactSVG } from 'react-svg';
import chevronUp from 'assets/svg/Chevron up.svg';
import chevronDown from 'assets/svg/Chevron down.svg';
import * as PropTypes from 'prop-types';
import { poolIcon } from 'utils/helpers';

const data = [
  {
    data: [
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
    ],
  },
  {
    data: [
      {
        name: 'Dec 11',
        uv: 1000,
      },
      {
        name: '',
        uv: 1500,
      },
      {
        name: '',
        uv: 2500,
      },
      {
        name: 'Dec 12',
        uv: 2300,
      },
      {
        name: '',
        uv: 1000,
      },
      {
        name: '',
        uv: 1200,
      },
      {
        name: 'Dec 13',
        uv: 1000,
      },
      {
        name: '',
        uv: 1100,
      },
      {
        name: '',
        uv: 1000,
      },
      {
        name: 'Dec 14',
        uv: 5000,
      },
    ],
  },
  {
    data: [
      {
        name: 'Dec 11',
        uv: 3500,
      },
      {
        name: '',
        uv: 500,
      },
      {
        name: '',
        uv: 1000,
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
        uv: 2500,
      },
      {
        name: 'Dec 13',
        uv: 2500,
      },
      {
        name: '',
        uv: 1000,
      },
      {
        name: '',
        uv: 400,
      },
      {
        name: 'Dec 14',
        uv: 100,
      },
    ],
  },
];

const StakingChart = ({ poolsArr }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [chartData, setChartData] = useState(data[0]);
  const [pickedName, setPickedName] = useState(poolsArr[0]);

  const openDropDownHandler = () => {
    setOpenDropDown(!openDropDown);
  };

  const chartDataHandler = (arr) => {
    setChartData(arr);
    openDropDownHandler();
  };

  const setPickedNameHandler = (contractName) => {
    setPickedName(contractName);
  };

  return (
    <div className="chart">
      <div className="chart__heading">Pool Performance</div>
      <div
        className="chart__pool-picker"
        style={{
          height: !openDropDown ? 44 : 'auto',
          overflow: !openDropDown ? 'hidden' : 'auto',
        }}
      >
        <div
          role="presentation"
          onClick={openDropDownHandler}
          className="pool-picker-arrow"
        >
          <ReactSVG src={openDropDown ? chevronUp : chevronDown} />
        </div>
        <div className="chart__pool-picker--name" role="presentation">
          <ReactSVG
            className="chart__pool-picker--name--icon"
            src={poolIcon(pickedName.index)}
            wrapper="div"
          />
          {pickedName.contractName}
        </div>
        {poolsArr.map(
          (pool, index) =>
            pool.contractName !== pickedName.contractName && (
              <div
                key={pool.contractName}
                className="chart__pool-picker--name"
                onClick={() => {
                  chartDataHandler(data[index]);
                  setPickedNameHandler(pool);
                }}
                role="presentation"
              >
                <ReactSVG
                  className="chart__pool-picker--name--icon"
                  src={poolIcon(pool.index)}
                  wrapper="div"
                />
                {pool.contractName}
              </div>
            ),
        )}
      </div>
      <div className="chart__chart">
        <AreaChart
          width={560}
          height={148}
          data={chartData.data}
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
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
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
            fill="url(#colorUv)"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(21, 211, 120, 0.4"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(21, 211, 120, 0.4"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        </AreaChart>
      </div>
    </div>
  );
};

StakingChart.propTypes = {
  poolsArr: PropTypes.array,
};

export default StakingChart;
