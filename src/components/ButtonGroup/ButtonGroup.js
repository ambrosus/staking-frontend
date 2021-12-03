import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ButtonGroup = (props) => {
  const cssClasses = classNames({
    'button-group': true,
    compact: props.compact,
  });

  return <div className={cssClasses}>{props.children}</div>;
};

ButtonGroup.propTypes = {
  compact: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default ButtonGroup;
