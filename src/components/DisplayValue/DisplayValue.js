import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { formatThousand } from 'utils/helpers';

import Paragraph from '../Paragraph';
import { useTimeout } from '../../hooks';

const DisplayValue = ({
  symbol = 'AMB',
  value,
  size = 'l-400',
  color = '#333333',
}) => {
  const [display, setDisplay] = useState(false);
  useTimeout(() => setDisplay(true), 1500);
  return value === null ? (
    <span className="skeleton" />
  ) : (
    <span className="transitions">
      <Paragraph
        style={{ color, whiteSpace: 'nowrap', minWidth: 50 }}
        size={size}
      >
        {value < 1 && !display ? (
          <span className="skeleton" />
        ) : (
          `${formatThousand(value)} ${symbol}`
        )}
      </Paragraph>
    </span>
  );
};

DisplayValue.propTypes = {
  value: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.any,
  symbol: PropTypes.string,
};
export default DisplayValue;
