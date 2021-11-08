import React from 'react';
import ReactLoading from 'react-loading';

const Loader = () => (
  <div className="loader">
    <ReactLoading type="spokes" color="#4A38AE" />
  </div>
);

const SkeletonString = () => <span className="skeleton" />;

export { Loader, SkeletonString };
