import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MAIN_PAGE, PoolsContext, STAKE } from '../../../../config';
import RenderItems from '../../../../components/RenderItems';
import StakingItem from '../../../../components/StakingItem';
import { Loader } from '../../../../components/Loader';
import Paragraph from '../../../../components/Paragraph';
import Button from '../../../../components/Button';
import { useLogIn, useMedia } from '../../../../hooks';
import { debugLog } from '../../../../utils/helpers';

export default () => {
  const { pathname } = useLocation();
  const [pools, getPools] = useContext(PoolsContext);
  const isSmall = useMedia('(max-width: 699px)');
  const { logIn } = useLogIn();
  const isMainPage = pathname === MAIN_PAGE;
  useEffect(() => {
    debugLog('Home render useEffect');
    getPools();
  }, []);

  return (
    <div className="staking">
      <div>
        <h2 className="section-heading">Choose your staking pool</h2>
      </div>
      {pools.length > 0 ? (
        <>
          <div
            className="staking__header"
            style={{
              color: isMainPage && '#FFFFFF',
            }}
          >
            <div className="staking__header__clearfix-pool">Pool</div>
            <div style={{ marginLeft: !isSmall ? 140 : -85 }}>
              Total pool stake
            </div>
            <div
              className="staking__header__clearfix-apy"
              style={{ marginLeft: !isSmall ? 146 : -75 }}
            >
              APY
            </div>
            <div style={{ maxWidth: 160, minWidth: 160 }} />
          </div>
          <div className="staking__pools">
            <RenderItems>
              <>
                {pools.map(
                  (item) =>
                    item.active && (
                      <StakingItem
                        key={item.contractName}
                        poolInfo={item}
                        expand={false}
                      />
                    ),
                )}
              </>
            </RenderItems>
          </div>
          <div style={{ width: '100%' }}>
            {isSmall && (
              <Button
                buttonStyles={{ marginLeft: 'auto', maxHeight: 50, width: 160 }}
                type={isMainPage ? 'black' : 'primary'}
                onclick={logIn}
              >
                <Paragraph style={{ textTransform: 'uppercase' }} size="m-500">
                  {STAKE}
                </Paragraph>
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="staking__loader">
          <Loader types="spokes" />
        </div>
      )}
    </div>
  );
};
