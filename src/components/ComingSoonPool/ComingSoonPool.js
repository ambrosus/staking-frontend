import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { useLocation } from 'react-router-dom';

import Button from '../Button';
import Paragraph from '../Paragraph';
import { COMING_SOON, MAIN_PAGE, STAKE, STAKING_PAGE } from 'config';
import avatarIcon from 'assets/svg/coming_soon_pool_icon.svg';

const ComingSoonPool = ({ poolInfo, loading }) => {
  const { pathname } = useLocation();

  const stackHeader = (
    <div className="item--header" role="presentation">
      <div
        className="item--header__flex"
        style={{
          paddingRight: pathname === STAKING_PAGE ? 100 : 200,
          width: '80%',
        }}
      >
        <div
          className="item--header__flex__pool w-100"
          style={{ width: '80%' }}
        >
          <ReactSVG src={avatarIcon} wrapper="span" />
          <Paragraph
            className="w-100"
            style={{
              textTransform: 'uppercase',
              whiteSpace: 'word-wrap',
              color: '#BFC9E0',
              width: '80%',
            }}
            size="l-500"
          >
            {poolInfo.contractName}
          </Paragraph>
        </div>
      </div>
      <div className="item--header--coming-soon-btn">
        <Button disabled priority="secondary">
          <Paragraph style={{ textTransform: 'uppercase' }} size="m-500">
            {!loading ? STAKE : COMING_SOON}
          </Paragraph>
        </Button>
      </div>
    </div>
  );

  return (
    <div
      role="presentation"
      className="stack-item"
      style={{
        background: pathname === MAIN_PAGE && '#262626',
        boxShadow: pathname === MAIN_PAGE && '0px 6px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      {stackHeader}
    </div>
  );
};
ComingSoonPool.propTypes = {
  poolInfo: PropTypes.object,
  loading: PropTypes.bool,
};
export default ComingSoonPool;
