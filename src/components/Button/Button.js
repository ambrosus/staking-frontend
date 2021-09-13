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
      disabled={disabled && disabled}
      onClick={onclick && onclick}
      className={cssClasses && cssClasses}
      style={buttonStyles && buttonStyles}
    >
      {children && children}
    </button>
  );
};
Button.propTypes = {
  disabled: PropTypes.bool,
  onclick: PropTypes.func,
  buttonStyles: PropTypes.object,
  priority: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.element,
};

export default Button;
