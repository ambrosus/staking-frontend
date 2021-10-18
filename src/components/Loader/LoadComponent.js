import React from 'react';
import ReactLoading from 'react-loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Loader = () => (
  <div className="loader">
    <ReactLoading type="spokes" color="#4A38AE" />
  </div>
);

const SkeletonString = () => (
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
export { Loader, SkeletonString };
