/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useEthers } from '@usedapp/core';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';

import StackItem from './StackingItem';
import P from '../../components/P';
import copyIcon from '../../assets/svg/copy.svg';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import ReactTooltip from 'react-tooltip';
import appStore from '../../store/app.store';

const Stacking = observer(() => {
  const { account, activate, activateBrowserWallet } = useEthers();
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });
  const history = useHistory();

  useEffect(async () => {
    if (await account) {
      appStore.setAuth(true);
    }
  }, [appStore.auth, account]);

  const infoBlock = (
    <div className="info-block ">
      <div className="wrapper">
        <div className="info-block__address">
          <P size="m-400" style={{ paddingBottom: 5 }}>
            My Address
          </P>
          <P size="xl-400" style={{ color: '#333333' }}>
            {account
              ? ` ${account.substr(0, 15)}...${account.substr(-15, 15)}`
              : '...'}
            <ReactSVG
              data-tip
              data-for="copy-state"
              onClick={onCopy}
              src={copyIcon}
              wrapper="span"
              style={{ marginLeft: 20, cursor: 'pointer' }}
            />
            {isCopied ? (
              <ReactTooltip id="copy-state" place="top" effect="solid">
                Copied
              </ReactTooltip>
            ) : null}
          </P>
        </div>
        <div className="info-block__stacked">
          <div className="info-block__stacked--total">
            <P size="m-400" style={{ paddingBottom: 5 }}>
              Total Staked
            </P>
            <P size="xl-400" style={{ color: '#4A38AE' }}>
              13.5 m AMB
            </P>
          </div>
          <div className="info-block__stacked--course">
            <P size="m-400" style={{ paddingBottom: 5 }}>
              Last 24 Hours
            </P>
            <P size="xl-400" style={{ color: '#4A38AE' }}>
              <span style={{ color: '#1ACD8C' }}> +3663 AMB </span>/ 34$
            </P>
          </div>
        </div>
      </div>
    </div>
  );
  return appStore.auth ? (
    <>
      {account && infoBlock}
      <div className="stacking wrapper">
        <div className="stacking__header">
          <div>Pool</div>
          <div>Vault Assets</div>
          <div>Net APY</div>
          <div style={{ maxWidth: 160 }}></div>
        </div>
        <StackItem expand lazy />
        <StackItem expand lazy />
        <StackItem expand lazy />
        <StackItem expand lazy />
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
});

export default Stacking;
