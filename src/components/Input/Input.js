import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { utils } from 'ethers';

import AMBsmallIcon from '../../assets/svg/AMB-small.svg';
import clearIcon from '../../assets/svg/clear.svg';

const Input = ({
  type = 'number',
  onchange,
  iconLeft,
  error = false,
  placeholder = '',
  value = '',
}) => {
  const [inputError, setInputError] = useState(false);
  return (
    <div
      className={classNames('input', {
        'input-error': (value && error) || inputError,
      })}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            const floor =
              utils.formatEther(Math.floor(e.target.value).toString()) &&
              Math.floor(e.target.value).toString();
            onchange(floor && floor);
            setInputError(false);
          } catch (err) {
            if (err) {
              setInputError(true);
            }
          }
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
          <ReactSVG
            onClick={() => onchange('')}
            src={clearIcon}
            wrapper="span"
          />
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  iconLeft: PropTypes.bool,
  onchange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.bool,
};
export default Input;
