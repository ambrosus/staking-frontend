import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import AMBsmallIcon from '../../assets/svg/AMB-small.svg';

const Input = ({ type = 'number', onchange, iconLeft, placeholder, value }) => (
  <span className="input">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onchange(e.target.value)}
      style={iconLeft && { padding: '0 50px' }}
    />
    {iconLeft && (
      <span className="iconLeft">
        <ReactSVG src={AMBsmallIcon} wrapper="span" />
      </span>
    )}
  </span>
);

Input.propTypes = {
  type: PropTypes.string,
  iconLeft: PropTypes.string,
  onchange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.number,
};
export default Input;
