import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import AMBsmallIcon from '../../assets/svg/AMB-small.svg';
import clearIcon from '../../assets/svg/clear.svg';

const Input = ({
  type = 'number',
  onchange,
  iconLeft,
  error = false,
  placeholder = '',
  value = '',
}) => (
  <div
    className={classNames('input', {
      'input-error': value && error,
    })}
  >
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onchange(e.target.value);
      }}
      style={iconLeft && { padding: '0 50px' }}
    />
    {iconLeft && (
      <span className="iconLeft">
        <ReactSVG src={AMBsmallIcon} wrapper="span" />
      </span>
    )}
    {value && (
      <span className="iconRight">
        <ReactSVG onClick={() => onchange('')} src={clearIcon} wrapper="span" />
      </span>
    )}
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  iconLeft: PropTypes.bool,
  onchange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.bool,
};
export default Input;
