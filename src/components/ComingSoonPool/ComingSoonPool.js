/*eslint-disable*/
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { ethers } from 'ethers';
import { store as alertStore } from 'react-notifications-component';

import Button from '../../components/Button';
import P from '../../components/P';
import Deposit from '../../pages/Stacking/components/Deposit';

import appStore from '../../store/app.store';
import storageService from '../../services/storage.service';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert';
import FromPhoneDeviseEnter from '../../pages/Home/components/FromPhoneDeviseEnter';
import { getBalance } from '../../utils/constants';
import avatarIcon from '../../assets/svg/coming_soon_pool_icon.svg';
export const ComingSoonPool = ({
  expand,
  comingSoon,
  children,
  instant,
  lazy,
  transitionDuration = '200ms',
  transitionTimingFunction = 'ease-in',
  onComplete,
  index,
  openIndex,
  setOpenIndex,
  poolInfo,
  ...restProps
}) => {
  const ref = useRef();

  const stackHeader = (
    <div className="item--header" role="presentation">
      <div className="item--header__pool">
        <ReactSVG src={avatarIcon} wrapper="span" />
        <P
          style={{
            textTransform: 'uppercase',
            color: '#BFC9E0',
          }}
          size="l-500"
        >
          {poolInfo?.contractName}
        </P>
      </div>
      <div style={{ minWidth: 160, maxWidth: 160 }}>
        <Button disabled priority="secondary">
          <P style={{ textTransform: 'uppercase' }} size="m-500">
            COMING SOON
          </P>
        </Button>
      </div>
    </div>
  );
  return (
    <div role="presentation" className="stack-item">
      {stackHeader}
    </div>
  );
};
ComingSoonPool.propTypes = {
  poolInfo: PropTypes.object,
  expand: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string,
  open: PropTypes.bool,
  comingSoon: PropTypes.bool,
  lazy: PropTypes.bool,
  instant: PropTypes.bool,
  onComplete: PropTypes.func,
};
export default ComingSoonPool;
