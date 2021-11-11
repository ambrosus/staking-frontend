import React from 'react';
import * as PropTypes from 'prop-types';
import { formatThousand } from '../../utils/constants';

import P from '../P';

const DisplayValue = ({
  symbol = 'AMB',
  flag = 'number',
  value,
  size = 'l-400',
  color = '#333333',
}) =>
  value === null ? (
    <span className="skeleton" />
  ) : (
    <span className="transition1s">
      <P style={{ color, whiteSpace: 'nowrap', minWidth: 50 }} size={size}>
        {value !== null &&
          flag === 'number' &&
          `${formatThousand(value)} ${symbol}`}
        {value !== null &&
          flag === 'string' &&
          `${formatThousand(+value.toFixed(2))} ${symbol}`}
      </P>
    </span>
  );
DisplayValue.propTypes = {
  flag: PropTypes.bool,
  value: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.any,
  symbol: PropTypes.string,
};
export default React.memo(DisplayValue);
