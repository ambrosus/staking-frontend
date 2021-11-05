import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as PropTypes from 'prop-types';
import { round } from '../../utils/constants';

import P from '../P';

const DisplayValue = ({ flag, value, size = 'l-400', color = '#333333' }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timing;
    if (flag) {
      timing = setTimeout(() => {
        setShow(flag);
      }, 1000);
    }
    return () => show && clearTimeout(timing);
  }, [show, flag, value]);

  return !show ? (
    <div className="skeleton">
      <SkeletonTheme color="#FFFFFF" highlightColor="rgba(215, 215, 215, 0.53)">
        <p>
          <Skeleton
            count={1}
            duration={2}
            style={{ border: '0px solid', outline: '0px solid' }}
          />
        </p>
      </SkeletonTheme>
    </div>
  ) : (
    <P style={{ color, whiteSpace: 'nowrap' }} size={size}>
      {value && `${round(+value)} AMB`}
    </P>
  );
};
DisplayValue.propTypes = {
  flag: PropTypes.bool,
  value: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
};
export default DisplayValue;
