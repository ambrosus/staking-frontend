import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import AMBsmallIcon from '../../assets/svg/AMB-small.svg';
import clearIcon from '../../assets/svg/clear.svg';

import { checkValidNumberString } from '../../services/numbers';

const Input = ({
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
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (
          e.target.value === '' ||
          (/^[\d.]*$/.test(e.target.value) &&
            checkValidNumberString(e.target.value))
        ) {
          onchange(e.target.value);
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
      <span
        className="iconRight"
        onClick={() => onchange('')}
        role="presentation"
      >
        <img src={clearIcon} alt="clear" />
      </span>
    )}
  </div>
);

Input.propTypes = {
  iconLeft: PropTypes.bool,
  onchange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.bool,
};

export default React.memo(Input);
