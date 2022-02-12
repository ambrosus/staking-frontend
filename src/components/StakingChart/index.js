/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { ReactSVG } from 'react-svg';
import chevronUp from 'assets/svg/Chevron up.svg';
import chevronDown from 'assets/svg/Chevron down.svg';
import * as PropTypes from 'prop-types';
import { formatDate, poolIcon } from 'utils/helpers';
import { formatRounded, ZERO } from 'services/numbers';
import CustomScatterDo from './CustomScatterDo';
import CustomTooltip from './CustomTooltip';

const StakingChart = ({ poolsArr }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [pickedName, setPickedName] = useState({});

  const openDropDownHandler = () => {
    setOpenDropDown(!openDropDown);
  };

  useEffect(() => {
    if (poolsArr && chartData.length === 0) {
      chartDataHandler(poolsArr.find((item) => item.active).poolRewards);
      setPickedNameHandler(poolsArr.find((item) => item.active));
    }
  }, [chartData, pickedName]);

  const setPickedNameHandler = (contractName) => {
    setPickedName(contractName);
  };

  const chartDataHandler = (arr) => {
    console.log('Rewards', arr);
    const rewardsData = [];
    arr.reduce((acc, value) => {
      rewardsData.push({
        name: `${formatDate(value.timestamp * 1000, true)}`,
        reward: value.reward,
      });
    }, []);

    const res = Array.from(
      rewardsData.reduce((m, { name, reward }) => {
        return m.set(name, [...(m.get(name) || []), reward]);
      }, new Map()),
      ([name, arr]) => ({
        name,
        reward: formatRounded(
          arr.reduce((t, n) => t.add(n), ZERO),
          2,
        ),
      }),
    );
    const result = res.slice(1, -1);
    setChartData(result);
    console.log('chartData', chartData);
  };

  return (
    <div className="chart">
      <div className="chart__heading">Pool Performance</div>
      <div
        className="chart__pool-picker"
        style={{
          height: !openDropDown ? 25 : 'auto',
          overflow: !openDropDown ? 'hidden' : 'auto',
        }}
      >
        {poolsArr.map((pool) => pool.active).lenght > 0 && (
          <div
            role="presentation"
            onClick={openDropDownHandler}
            className="pool-picker-arrow"
          >
            <ReactSVG src={openDropDown ? chevronUp : chevronDown} />
          </div>
        )}
        {pickedName?.contractName && (
          <div className="chart__pool-picker--name" role="presentation">
            <ReactSVG
              className="chart__pool-picker--name--icon"
              src={poolIcon(pickedName.index)}
              wrapper="div"
            />
            {pickedName?.contractName}
          </div>
        )}

        {poolsArr.map(
          (pool) =>
            pool.active &&
            pool.contractName !== pickedName.contractName && (
              <div
                key={pool.contractName}
                className="chart__pool-picker--name"
                onClick={() => {
                  chartDataHandler(pool.poolRewards);
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
          width={565}
          height={235}
          data={chartData}
          margin={{
            top: 10,
            right: 100,
            left: 0,
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

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{
              position: 'absolute',
              top: 0,
              left: -43,
              right: 0,
              bottom: 0,
              width: 67,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80%',
              background:
                'linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50.26%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
          <Area
            dataKey="reward"
            stroke="#15D378"
            fill="url(#colorUv)"
            activeDot={<CustomScatterDo />}
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
