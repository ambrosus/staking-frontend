import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as PropTypes from 'prop-types';

const Loader = () => (
  <div className="loader">
    <ReactLoading type="spokes" color="#4A38AE" />
  </div>
);

const SkeletonString = ({ flag }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timing;
    if (flag) {
      timing = setTimeout(() => {
        setShow(flag);
      }, 2000);
    }
    return () => show && clearTimeout(timing);
  }, [show, flag]);

  return (
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
  );
};
SkeletonString.propTypes = {
  flag: PropTypes.bool,
};
export { Loader, SkeletonString };
