import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import { BigNumber } from 'ethers';
import { observer } from 'mobx-react-lite';
import StackedInfo from './StackedInfo';
import Paragraph from '../../../../components/Paragraph';
import { formatRounded } from '../../../../services/numbers';
import copyIcon from '../../../../assets/svg/copy.svg';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
import { tooltips } from 'config';
import appStore from '../../../../store/app.store';

const InfoBlock = observer(({ poolsArr, account }) => {
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });
  const [totalReward, setTotalReward] = useState(0);
  const [totalRewardInUsd, setTotalRewardInUsd] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalStakedInUsd, setTotalStakedInUsd] = useState(0);

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
          <StackedInfo
            totalStaked={totalStaked}
            totalStakedInUsd={totalStakedInUsd}
            totalReward={totalReward}
            totalRewardInUsd={totalRewardInUsd}
          />
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
