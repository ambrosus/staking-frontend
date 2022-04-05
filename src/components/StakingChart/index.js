import React, { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import { ReactSVG } from 'react-svg';
import chevronUp from 'assets/svg/Chevron up.svg';
import chevronDown from 'assets/svg/Chevron down.svg';
import * as PropTypes from 'prop-types';
import { poolIcon } from 'utils/helpers';
import CustomScatterDo from './CustomScatterDo';
import CustomTooltip from './CustomTooltip';
import { useMobileDetect } from 'hooks';

const StakingChart = ({ poolsArr }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [pickedName, setPickedName] = useState({});
  const [chartWidth, setChartWidth] = useState(500);
  const { isDesktop } = useMobileDetect();
  const chartRef = useRef(null);

  const openDropDownHandler = () => {
    setOpenDropDown(!openDropDown);
  };

  useEffect(() => {
    if (poolsArr && chartData.length === 0) {
      chartDataHandler(poolsArr.find((item) => item.active).poolRewards);
      setPickedNameHandler(poolsArr.find((item) => item.active));
    }
    if (chartRef.current !== null) {
      setChartWidth(chartRef.current.offsetWidth);
    }
  }, [chartData, pickedName]);

  const setPickedNameHandler = (contractName) => {
    setPickedName(contractName);
  };

  const chartDataHandler = (arr) => {
    console.log('arr', arr);
    // const res = Array.from(
    //   arr.reduce(
    //     (m, { timestamp, reward }) =>
    //       m.set(formatDate(timestamp * 1000, true), [
    //         ...(m.get(formatDate(timestamp * 1000, true)) || []),
    //         reward,
    //       ]),
    //     new Map(),
    //   ),
    //   ([timestamp, newArr]) => ({
    //     timestamp,
    //     reward: formatRounded(
    //       newArr.reduce((t, n) => t.add(n), ZERO),
    //       2,
    //     ),
    //   }),
    // );
    // const result = res.slice(1, -1);
    setChartData(arr);
  };

  return (
    <div className="chart">
      <div className="chart__heading">Pool Performance</div>
      <div
        className="chart__pool-picker"
        style={{
          height: !openDropDown ? 30 : 'auto',
          overflow: !openDropDown ? 'hidden' : 'auto',
        }}
      >
        {poolsArr.filter((pool) => pool.active && pool).length > 1 && (
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
            {pickedName?.contractName.length > 7
              ? ` ${pickedName?.contractName.substr(0, 7)}...`
              : ` ${pickedName?.contractName}`}
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
                {pool?.contractName.length > 7
                  ? ` ${pool?.contractName.substr(0, 7)}...`
                  : ` ${pool?.contractName}`}
              </div>
            ),
        )}
      </div>
      <div className="chart__chart" ref={chartRef}>
        <AreaChart
          width={chartWidth}
          height={230}
          data={chartData}
          margin={{
            top: 10,
            right: isDesktop ? 40 : -70,
            left: 25,
            bottom: 0,
          }}
        >
          <YAxis hide domain={['auto', 'auto']} />
          <XAxis
            domain={['auto', 'auto', 'auto', 'auto']}
            dataKey={({ timestamp }) => timestamp}
            fontSize={12}
            axisLine={false}
            interval={1}
            tickLine={false}
            style={{
              fontSize: 12,
              fontFamily: 'Halvar Breitschrift',
              color: '#FFFFFF',
            }}
            color="#FFFFFF"
            lightingColor="#FFFFFF"
            colorInterpolation="#FFFFFF"
            stopColor="#FFFFFF"
          />

          <Tooltip
            cursor={false}
            content={<CustomTooltip />}
            wrapperStyle={{
              position: 'absolute',
              top: -10,
              left: -43,
              right: 0,
              bottom: 0,
              width: 67,
              height: '75%',
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
            <g color="green" />
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
