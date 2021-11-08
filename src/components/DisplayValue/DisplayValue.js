import React from 'react';
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
    <span className="skeleton" />
  ) : (
    <span className="transition1s">
      <P style={{ color, whiteSpace: 'nowrap', minWidth: 50 }} size={size}>
        {value && flag === 'number' && `${round(value)} ${symbol}`}
        {value && flag === 'string' && `${round(+value.toFixed(2))} ${symbol}`}
      </P>
    </span>
  );
DisplayValue.propTypes = {
  flag: PropTypes.bool,
  value: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
  symbol: PropTypes.string,
};
export default DisplayValue;
