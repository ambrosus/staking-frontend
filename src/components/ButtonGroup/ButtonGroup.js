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
  children: PropTypes.element,
};
export default ButtonGroup;
