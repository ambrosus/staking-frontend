import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import Button from '../Button';
import P from '../P';
import avatarIcon from '../../assets/svg/coming_soon_pool_icon.svg';
export const ComingSoonPool = ({ poolInfo }) => {
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
};
export default ComingSoonPool;
