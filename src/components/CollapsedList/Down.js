import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

import inExpandIcon from '../../assets/svg/in-expand-icon.svg';
import expandIcon from '../../assets/svg/expand-icon.svg';

const Down = ({ isOpen }) =>
  isOpen ? (
    <ReactSVG className={cx('icon-down')} src={expandIcon} wrapper="span" />
  ) : (
    <ReactSVG className={cx('icon-down')} src={inExpandIcon} wrapper="span" />
  );

Down.propTypes = {
  isOpen: PropTypes.bool,
};

export default Down;
