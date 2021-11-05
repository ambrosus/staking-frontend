import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as PropTypes from 'prop-types';
import { round } from '../../utils/constants';

import P from '../P';

const DisplayValue = ({
  symbol = 'AMB',
  flag = 'number',
  value,
  size = 'l-400',
  color = '#333333',
}) =>
  !value ? (
    <div className="skeleton">
      <SkeletonTheme color="#FFFFFF" highlightColor="rgba(215, 215, 215, 0.53)">
        <p>
          <Skeleton
            width={50}
            count={1}
            duration={2}
            style={{ border: '0px solid', outline: '0px solid' }}
          />
        </p>
      </SkeletonTheme>
    </div>
  ) : (
    <P style={{ color, whiteSpace: 'nowrap', minWidth: 50 }} size={size}>
      {value && flag === 'number' && `${round(value)} ${symbol}`}
      {value && flag === 'string' && `${round(+value.toFixed(2))} ${symbol}`}
    </P>
  );
DisplayValue.propTypes = {
  flag: PropTypes.bool,
  value: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
  symbol: PropTypes.string,
};
export default DisplayValue;
