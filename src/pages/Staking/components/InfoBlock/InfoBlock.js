import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import { BigNumber } from 'ethers';
import { observer } from 'mobx-react-lite';
import { useMedia } from '../../../../hooks';

import Paragraph from '../../../../components/Paragraph';
import { formatRounded } from '../../../../services/numbers';
import earningsIcon from '../../../../assets/svg/last24h.svg';
import pieChartOutlineIcon from '../../../../assets/svg/pie_chart_outline.svg';
import errorOutlineIcon from '../../../../assets/svg/error_outline.svg';
import copyIcon from '../../../../assets/svg/copy.svg';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
import DisplayValue from '../../../../components/DisplayValue';
import { tooltips } from '../../../../config';
import appStore from '../../../../store/app.store';

const InfoBlock = observer(({ poolsArr, account }) => {
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });
  const [totalReward, setTotalReward] = useState(0);
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalStakedInUsd, setTotalStakedInUsd] = useState(0);
  const isSmall = useMedia('(max-width: 699px)');

  let poolsRewards = [];
  let myTotalStake = [];

  const totalRewardCalculateHandler = (estd) => {
    poolsRewards.push(estd);
    if (poolsRewards.length === poolsArr.length) {
      const rewardInAmb =
        poolsRewards.length > 0 &&
        poolsRewards.reduceRight((acc, curr) => acc + +curr, 0);
      setTotalReward(rewardInAmb > 0 && rewardInAmb);
      const esdSum =
        appStore.tokenPrice &&
        poolsRewards.length > 0 &&
        poolsRewards.reduceRight((acc, curr) => acc + +curr, 0);
      setTotalRewardInUsd(0);
      if (esdSum && esdSum > 0 && appStore.tokenPrice) {
        setTotalRewardInUsd(esdSum * appStore.tokenPrice);
      }
    }
  };

  const totalStakeCalculateHandler = (stake) => {
    myTotalStake.push(stake);
    if (myTotalStake.length === poolsArr.length) {
      const totalStakeSum = myTotalStake.reduceRight(
        (acc, curr) => acc.add(curr),
        BigNumber.from('0'),
      );
      setTotalStaked(totalStakeSum);
      if (totalStakeSum && appStore.tokenPrice) {
        const TsSum = formatRounded(totalStakeSum);
        setTotalStakedInUsd(TsSum * appStore.tokenPrice);
      }
    }
  };

  const getInfo = async () => {
    if (poolsArr.length > 0) {
      poolsRewards = [];
      myTotalStake = [];
      poolsArr.forEach((pool) => {
        const { estAR, myStakeInAMB } = pool;
        if (estAR) {
          totalRewardCalculateHandler(estAR);
        }
        if (myStakeInAMB) {
          totalStakeCalculateHandler(myStakeInAMB);
        }
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, [poolsArr, totalRewardInUsd, totalStakedInUsd]);

  return (
    <div className="info-block ">
      <div className="wrapper">
        <>
          <div className="info-block__address">
            <Paragraph size="m-400" style={{ paddingBottom: 5, color: '#fff' }}>
              My Address
            </Paragraph>
            <Paragraph
              size="l-500"
              style={{ color: '#15D378', fontSize: 16, fontWeight: 400 }}
            >
              {account
                ? ` ${account.substr(0, 9)}...${account.slice(32)}`
                : '...'}{' '}
              <ReactSVG
                data-tip
                data-for="copy-state"
                onClick={onCopy}
                src={copyIcon}
                wrapper="span"
                style={{ marginLeft: 20, cursor: 'pointer' }}
              />
            </Paragraph>
            {!isCopied ? (
              <ReactTooltip id="copy-state" place="top" effect="solid">
                {tooltips.copyState.notCopied}
              </ReactTooltip>
            ) : (
              <ReactTooltip id="copy-state" place="top" effect="solid">
                {tooltips.copyState.isCopied}
              </ReactTooltip>
            )}
          </div>
          <div className="info-block__stacked">
            <div className="info-block__stacked--total">
              <div>
                <ReactTooltip id="total-staked" place="top" effect="solid">
                  {tooltips.totalStaked}
                </ReactTooltip>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <ReactSVG
                      style={{
                        paddingTop: 1,
                      }}
                      src={pieChartOutlineIcon}
                      wrapper="span"
                    />
                    <Paragraph
                      size="m-400"
                      style={{
                        paddingBottom: 5,
                        whiteSpace: 'nowrap',
                        color: '#fff',
                      }}
                    >
                      &nbsp;Holdings&nbsp;
                    </Paragraph>
                  </div>
                  <ReactSVG
                    data-tip
                    data-for="total-staked"
                    src={errorOutlineIcon}
                    wrapper="span"
                  />
                </div>
              </div>
              <div
                style={{
                  minWidth: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: isSmall ? 'center' : 'space-around',
                }}
              >
                <DisplayValue
                  size="xl-400"
                  color="#1ACD8C"
                  value={totalStaked && formatRounded(totalStaked, 2)}
                />
                <Paragraph size="xl-400" style={{ color: '#fff' }}>
                  &nbsp; / &nbsp;
                </Paragraph>
                <DisplayValue
                  size="xl-400"
                  color="#fff"
                  value={totalStakedInUsd}
                  symbol="$"
                />
              </div>
            </div>
            <div className="info-block__stacked--course">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ReactTooltip id="earnings" place="top" effect="solid">
                  {tooltips.earnings}
                </ReactTooltip>
                <ReactSVG
                  style={{
                    paddingTop: 0,
                  }}
                  src={earningsIcon}
                />
                <Paragraph
                  size="m-400"
                  style={{ paddingBottom: 5, color: '#fff' }}
                >
                  &nbsp;Est. yearly yield&nbsp;
                </Paragraph>
                <ReactSVG
                  data-tip
                  data-for="earnings"
                  src={errorOutlineIcon}
                  wrapper="span"
                />
              </div>

              <div
                style={{
                  minWidth: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: isSmall ? 'center' : 'space-around',
                }}
              >
                <DisplayValue
                  size="xl-400"
                  color="#1ACD8C"
                  value={totalReward}
                />
                <Paragraph size="xl-400" style={{ color: '#fff' }}>
                  &nbsp; / &nbsp;
                </Paragraph>
                <DisplayValue
                  size="xl-400"
                  color="#fff"
                  value={totalRewardInUsd || 0}
                  symbol="$"
                />
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
});

InfoBlock.propTypes = {
  poolsArr: PropTypes.array,
  account: PropTypes.string,
};

export default React.memo(InfoBlock);
