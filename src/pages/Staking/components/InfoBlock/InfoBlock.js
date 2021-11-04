import React from 'react';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';

import P from '../../../../components/P';
import appStore from '../../../../store/app.store';
import { Loader, SkeletonString } from '../../../../components/Loader';
import {
  formatFixed,
  MINSHOWSTAKE,
} from '../../../../services/staking.wrapper';
import earningsIcon from '../../../../assets/svg/last24h.svg';
import pieChartOutlineIcon from '../../../../assets/svg/pie_chart_outline.svg';
import errorOutlineIcon from '../../../../assets/svg/error_outline.svg';
import copyIcon from '../../../../assets/svg/copy.svg';
import useCopyToClipboard from '../../../../utils/useCopyToClipboard';

const InfoBlock = ({ account, totalReward, totalRewardInUsd, totalStaked }) => {
  const { isCopied, onCopy } = useCopyToClipboard({ text: account && account });
  return (
    <div className="info-block ">
      <div className="wrapper">
        {account ? (
          <>
            <div className="info-block__address">
              <P size="m-400" style={{ paddingBottom: 5 }}>
                My Address
              </P>
              <P size="xl-400" style={{ color: '#333333' }}>
                {account && account}
                <ReactSVG
                  data-tip
                  data-for="copy-state"
                  onClick={onCopy}
                  src={copyIcon}
                  wrapper="span"
                  style={{ marginLeft: 20, cursor: 'pointer' }}
                />
              </P>
              {!isCopied ? (
                <ReactTooltip id="copy-state" place="top" effect="solid">
                  Copy to clipboard
                </ReactTooltip>
              ) : (
                <ReactTooltip id="copy-state" place="top" effect="solid">
                  Copied
                </ReactTooltip>
              )}
            </div>
            <div className="info-block__stacked">
              <div className="info-block__stacked--total">
                <div>
                  <ReactTooltip id="total-staked" place="top" effect="solid">
                    The amount of staked coins in all pools
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
                      <P
                        size="m-400"
                        style={{ paddingBottom: 5, wordWrap: 'nowrap' }}
                      >
                        &nbsp;&nbsp;My total stake&nbsp;&nbsp;
                      </P>
                    </div>
                    <ReactSVG
                      data-tip
                      data-for="total-staked"
                      src={errorOutlineIcon}
                      wrapper="span"
                    />
                  </div>
                </div>
                {appStore.observer < 1 ? (
                  <SkeletonString />
                ) : (
                  <P
                    size="xl-400"
                    style={{ color: '#4A38AE', whiteSpace: 'nowrap' }}
                  >
                    {totalStaked ? (
                      <span>
                        {totalStaked.gte(MINSHOWSTAKE)
                          ? `${formatFixed(totalStaked, 2)}AMB`
                          : '-'}
                      </span>
                    ) : (
                      <SkeletonString />
                    )}
                  </P>
                )}
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
                    Estimated earnings for the next 24h. <br />
                    This function is in early beta, <br />
                    the data is for reference only
                  </ReactTooltip>
                  <ReactSVG
                    style={{
                      paddingTop: 0,
                    }}
                    src={earningsIcon}
                  />
                  <P size="m-400" style={{ paddingBottom: 5 }}>
                    &nbsp;&nbsp;Earnings &nbsp;&nbsp;
                  </P>
                  <ReactSVG
                    data-tip
                    data-for="earnings"
                    src={errorOutlineIcon}
                    wrapper="span"
                  />
                </div>

                <P
                  size="xl-400"
                  style={{ color: '#4A38AE', whiteSpace: 'nowrap' }}
                >
                  <span style={{ color: '#1ACD8C' }}>
                    {' '}
                    {totalReward ? `+${totalReward}  AMB` : '-'}
                  </span>
                  &nbsp; /
                  {totalRewardInUsd && ` ${totalRewardInUsd.toFixed(2)}$`}
                </P>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
InfoBlock.propTypes = {
  account: PropTypes.string,
  totalReward: PropTypes.string,
  totalStaked: PropTypes.object,
  totalRewardInUsd: PropTypes.number,
};
export default InfoBlock;
