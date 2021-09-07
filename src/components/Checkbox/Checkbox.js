import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import infoIcon from '../../assets/svg/info.svg';
import P from '../P';

const Checkbox = ({ value, checked, onChange, name, label, disabled }) => (
  <div className="checkbox-container">
    <label className="checkbox">
      <span className="checkbox__input">
        <input
          onChange={onChange}
          value={value}
          checked={checked}
          disabled={disabled}
          type="checkbox"
          name={name}
        />
        <span className="checkbox__control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </span>
      </span>
      <span
        className="radio__label"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <P size="s-400">{label}&nbsp;</P>
        <ReactSVG
          data-tip
          data-for="input-auto-stake"
          src={infoIcon}
          wrapper="span"
        />
      </span>
      <ReactTooltip id="input-auto-stake" place="top" effect="solid">
        Ну тут какая-то посказка которая сообщает о том о сём. И человек себе
        сразу понимает что к чему.
      </ReactTooltip>
    </label>
  </div>
);
Checkbox.propTypes = {
  value: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
export default Checkbox;
