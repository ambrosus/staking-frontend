import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const P = ({ size, className, children, ...props }) => (
  <p
    className={cn(className, {
      'xxxl-500': size === 'xxxl-500',
      'xl-400': size === 'xl-400',
      'l-400': size === 'l-400',
      'l-500': size === 'l-500',
      'l-700': size === 'l-700',
      'm-500': size === 'm-500',
      'xs-400': size === 'xs-400',
      'xs-500': size === 'xs-500',
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
