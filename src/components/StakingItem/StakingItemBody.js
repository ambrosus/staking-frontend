import React from 'react';
import PropTypes from 'prop-types';

const StakingItemBody = ({ children }) => <>{children}</>;
StakingItemBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default StakingItemBody;
