import React from 'react';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';

import P from '../../../../components/P';
import { Loader } from '../../../../components/Loader';
import { formatRounded } from '../../../../services/staking.wrapper';
import earningsIcon from '../../../../assets/svg/last24h.svg';
import pieChartOutlineIcon from '../../../../assets/svg/pie_chart_outline.svg';
import errorOutlineIcon from '../../../../assets/svg/error_outline.svg';
import copyIcon from '../../../../assets/svg/copy.svg';
import useCopyToClipboard from '../../../../utils/useCopyToClipboard';
import DisplayValue from '../../../../components/DisplayValue';
import { tooltips } from '../../../../utils/constants';

const InfoBlock = ({ account, totalReward, totalRewardInUsd, totalStaked }) => {
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });
  return (
    <div className="info-block ">
      <div className="wrapper">
        {account ? (
          <>
            <div className="info-block__address">
              <P size="m-400" style={{ paddingBottom: 5 }}>
                My Address
              </P>
              <P size="l-500" style={{ color: '#333333' }}>
                {account}
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
                      <P
                        size="m-400"
                        style={{ paddingBottom: 5, whiteSpace: 'nowrap' }}
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
                <DisplayValue
                  color="#4A38AE"
                  size="xl-400"
                  value={totalStaked && formatRounded(totalStaked, 2)}
                />
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

                <div
                  style={{
                    minWidth: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <DisplayValue
                    size="xl-400"
                    color="#1ACD8C"
                    value={totalReward}
                  />
                  <P size="xl-400" style={{ color: '#4A38AE' }}>
                    &nbsp; / &nbsp;
                  </P>
                  <DisplayValue
                    size="xl-400"
                    color="#4A38AE"
                    value={totalRewardInUsd}
                    symbol="$"
                  />
                </div>
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
  totalReward: PropTypes.any,
  totalStaked: PropTypes.any,
  totalRewardInUsd: PropTypes.any,
};
export default React.memo(InfoBlock);
