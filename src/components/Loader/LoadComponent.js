import React from 'react';
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router';
import * as PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { MAIN_PAGE } from '../../config';

const Loader = ({ types = 'spokes' }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="loader">
      <ReactLoading
        type={types}
        color={pathname !== MAIN_PAGE ? '#4A38AE' : '#2EDB9C'}
      />
    </div>
  );
};
Loader.propTypes = {
  types: PropTypes.string,
};
const SkeletonString = () => <span className="skeleton" />;

const SkeletonBtn = () => <span className="skeleton-btn" />;

const SkeletonPool = () => {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div
      role="presentation"
      className="stack-item"
      style={{
        background: pathname === MAIN_PAGE && '#262626',
        boxShadow: pathname === MAIN_PAGE && '0px 6px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="skeleton-pool">
        <span className="skeleton" />
        <span className="skeleton" />
        <span className="skeleton" />
        <span className="skeleton" />
        <span className="skeleton" />
      </div>
    </div>
  );
};

export { Loader, SkeletonString, SkeletonPool, SkeletonBtn };
