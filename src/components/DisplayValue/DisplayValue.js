import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { formatThousand } from '../../utils/helpers';

import Paragraph from '../Paragraph';
import { useDebounce } from '../../hooks';

const DisplayValue = ({
  symbol = 'AMB',
  value,
  size = 'l-400',
  color = '#333333',
}) => {
  const [showValue, setShowValue] = useState(false);
  useDebounce(() => setShowValue(true), 1500, [value]);
  return !showValue ? (
    <span className="skeleton" />
  ) : (
    <span className="transitions">
      <Paragraph
        style={{ color, whiteSpace: 'nowrap', minWidth: 50 }}
        size={size}
      >
        {`${formatThousand(value)} ${symbol}`}
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
export default React.memo(DisplayValue);
