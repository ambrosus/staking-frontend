import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

import inExpandIcon from 'assets/svg/in-expand-icon.svg';
import expandIcon from 'assets/svg/expand-icon.svg';

const Down = ({ isOpen }) => (
  <ReactSVG
    className={cx('icon-down')}
    src={isOpen ? expandIcon : inExpandIcon}
    wrapper="span"
  />
);

Down.propTypes = {
  isOpen: PropTypes.bool,
};

export default React.memo(Down);
