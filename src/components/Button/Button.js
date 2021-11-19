import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

const Button = ({
  priority,
  type,
  children,
  disabled,
  onclick,
  buttonStyles,
}) => {
  const cssClasses = className('btn', priority, type);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onclick}
      className={cssClasses}
      style={buttonStyles}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.any,
  onclick: PropTypes.func,
  buttonStyles: PropTypes.object,
  priority: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
