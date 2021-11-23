import React from 'react';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';

import Paragraph from '../../../../components/Paragraph';
import { Loader } from '../../../../components/Loader';
import { formatRounded } from '../../../../services/staking.wrapper';
import earningsIcon from '../../../../assets/svg/last24h.svg';
import pieChartOutlineIcon from '../../../../assets/svg/pie_chart_outline.svg';
import errorOutlineIcon from '../../../../assets/svg/error_outline.svg';
import copyIcon from '../../../../assets/svg/copy.svg';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
import DisplayValue from '../../../../components/DisplayValue';
import { tooltips } from '../../../../config';

const InfoBlock = ({
  account,
  totalReward,
  totalRewardInUsd,
  totalStakedInUsd,
  totalStaked,
}) => {
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });

  return (
    <div className="info-block ">
      <div className="wrapper">
        {account ? (
          <>
            <div className="info-block__address">
              <Paragraph size="m-400" style={{ paddingBottom: 5 }}>
                My Address
              </Paragraph>
              <Paragraph
                size="l-500"
                style={{ color: '#333333', fontSize: 16, fontWeight: 400 }}
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
                        style={{ paddingBottom: 5, whiteSpace: 'nowrap' }}
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
                    justifyContent: 'space-around',
                  }}
                >
                  <DisplayValue
                    size="xl-400"
                    color="#1ACD8C"
                    value={totalStaked && formatRounded(totalStaked, 2)}
                  />
                  <Paragraph size="xl-400" style={{ color: '#4A38AE' }}>
                    &nbsp; / &nbsp;
                  </Paragraph>
                  <DisplayValue
                    size="xl-400"
                    color="#4A38AE"
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
                  <Paragraph size="m-400" style={{ paddingBottom: 5 }}>
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
                    justifyContent: 'space-around',
                  }}
                >
                  <DisplayValue
                    size="xl-400"
                    color="#1ACD8C"
                    value={totalReward}
                  />
                  <Paragraph size="xl-400" style={{ color: '#4A38AE' }}>
                    &nbsp; / &nbsp;
                  </Paragraph>
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
          <Loader types="spokes" />
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
  totalStakedInUsd: PropTypes.any,
};
export default React.memo(InfoBlock);
