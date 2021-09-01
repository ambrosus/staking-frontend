import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const P = ({ size, className, children, ...props }) => (
  <p
    className={cn(className, {
      'xxxl-500': size === 'xxxl-500',
      'xl-400': size === 'xl-400',
      'm-500': size === 'm-500',
    })}
    {...props}
  >
    {children}
  </p>
);

P.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default P;
