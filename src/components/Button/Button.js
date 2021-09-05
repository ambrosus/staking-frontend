import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

const Button = (props) => {
  const cssClasses = className('btn', props.priority, props.type);
  const ButtonText = props.children ? props.children : 'Button';
  return (
    <button
      type="button"
      disabled={props?.disabled}
      onClick={props.onclick}
      className={cssClasses}
    >
      {ButtonText}
    </button>
  );
};
Button.propTypes = {
  disabled: PropTypes.bool,
  onclick: PropTypes.func,
  priority: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.element,
};

export default Button;
