import React from 'react';
import PropTypes from 'prop-types';

const RenderItems = ({ children }) => <>{children}</>;
RenderItems.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RenderItems;
