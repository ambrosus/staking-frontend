import React from 'react';
import ReactTooltip from 'react-tooltip';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { tooltips } from 'config';
import pieChartOutlineIcon from '../../../../assets/svg/pie_chart_outline.svg';
import Paragraph from '../../../../components/Paragraph';
import errorOutlineIcon from '../../../../assets/svg/error_outline.svg';
import DisplayValue from '../../../../components/DisplayValue';
import { formatRounded } from '../../../../services/numbers';
import earningsIcon from '../../../../assets/svg/last24h.svg';
import { useMedia } from '../../../../hooks';

const StackedInfo = ({
  totalStaked,
  totalStakedInUsd,
  totalReward,
  totalRewardInUsd,
}) => {
  const isSmall = useMedia('(max-width: 699px)');

  return (
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
          <Paragraph size="m-400" style={{ paddingBottom: 5, color: '#fff' }}>
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
          <DisplayValue size="xl-400" color="#1ACD8C" value={totalReward} />
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
  );
};

StackedInfo.propTypes = {
  totalStaked: PropTypes.any,
  totalStakedInUsd: PropTypes.any,
  totalReward: PropTypes.any,
  totalRewardInUsd: PropTypes.any,
};
export default StackedInfo;
