import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';

import Button from '../Button';
import P from '../P';
import { COMING_SOON } from '../../utils/constants';

import avatarIcon from '../../assets/svg/coming_soon_pool_icon.svg';

export const ComingSoonPool = ({ poolInfo }) => {
  const history = useHistory();
  const stackHeader = (
    <div className="item--header" role="presentation">
      <div
        className="item--header__flex w-100"
        style={{
          paddingRight: history.location.pathname === '/staking' ? 100 : 200,
          width: '80%',
        }}
      >
        <div
          className="item--header__flex__pool w-100"
          style={{ width: '80%' }}
        >
          <ReactSVG src={avatarIcon} wrapper="span" />
          <P
            className="w-100"
            style={{
              textTransform: 'uppercase',
              whiteSpace: 'word-wrap',
              color: '#BFC9E0',
              width: '80%',
            }}
            size="l-500"
          >
            {poolInfo?.contractName}
          </P>
        </div>
      </div>
      <div className="item--header--coming-soon-btn">
        <Button disabled priority="secondary">
          <P style={{ textTransform: 'uppercase' }} size="m-500">
            {COMING_SOON}
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
};
export default ComingSoonPool;
