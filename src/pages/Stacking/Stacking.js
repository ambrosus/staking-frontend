import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { useEthers } from '@usedapp/core';
import { observer } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';

import StackItem from './StackingItem';
import P from '../../components/P';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import appStore from '../../store/app.store';

import errorOutlineIcon from '../../assets/svg/error_outline.svg';
import pieChartOutlineIcon from '../../assets/svg/pie_chart_outline.svg';
import last24hIcon from '../../assets/svg/last24h.svg';
import copyIcon from '../../assets/svg/copy.svg';

const Stacking = observer(() => {
  const { account } = useEthers();
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });

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
            {account && account}
            <ReactSVG
              data-tip
              data-for="copy-state"
              onClick={onCopy}
              src={copyIcon}
              wrapper="span"
              style={{ marginLeft: 20, cursor: 'pointer' }}
            />
            {!isCopied ? (
              <ReactTooltip id="copy-state" place="top" effect="solid">
                Copy to clipboard
              </ReactTooltip>
            ) : (
              <ReactTooltip id="copy-state" place="top" effect="solid">
                Copied
              </ReactTooltip>
            )}
          </P>
        </div>
        <div className="info-block__stacked">
          <div className="info-block__stacked--total">
            <P size="m-400" style={{ paddingBottom: 5 }}>
              <ReactTooltip id="total-staked" place="top" effect="solid">
                Total Staked info
              </ReactTooltip>
              <ReactSVG
                style={{
                  paddingTop: 1,
                }}
                src={pieChartOutlineIcon}
                wrapper="span"
              />
              &nbsp;Total Staked&nbsp;
              <span>
                <ReactSVG
                  data-tip
                  data-for="total-staked"
                  style={{
                    paddingTop: 3,
                  }}
                  src={errorOutlineIcon}
                  wrapper="span"
                />
              </span>
            </P>
            <P size="xl-400" style={{ color: '#4A38AE' }}>
              13.5 m AMB
            </P>
          </div>
          <div className="info-block__stacked--course">
            <P size="m-400" style={{ paddingBottom: 5 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ReactSVG
                  style={{
                    paddingTop: 3,
                  }}
                  src={last24hIcon}
                />{' '}
                &nbsp;Last 24 Hours
              </span>
            </P>
            <P size="xl-400" style={{ color: '#4A38AE' }}>
              <span style={{ color: '#1ACD8C' }}> +3663 AMB </span>&nbsp; / 34$
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
          <div style={{ flexBasis: 64 }}>Pool</div>
          <div style={{ flexBasis: 26 }}>My Stake</div>
          <div style={{ flexBasis: 29 }}>Total staked</div>
          <div style={{ flexBasis: 26 }}>Net APY</div>
          <div style={{ maxWidth: 167, marginRight: -6 }} />
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
