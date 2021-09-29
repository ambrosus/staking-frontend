import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';
import { ethers } from 'ethers';

import StackItem from './StackingItem';
import P from '../../components/P';
import useCopyToClipboard from '../../utils/useCopyToClipboard';
import appStore from '../../store/app.store';
import storageService from '../../services/storage.service';
import { pools } from '../../utils/constants';

import errorOutlineIcon from '../../assets/svg/error_outline.svg';
import pieChartOutlineIcon from '../../assets/svg/pie_chart_outline.svg';
import last24hIcon from '../../assets/svg/last24h.svg';
import copyIcon from '../../assets/svg/copy.svg';

const Stacking = observer(() => {
  const [account, setAccount] = useState(null);
  const [openIndexStakeItem, setOpenIndexStakeItem] = useState(20);
  const { isCopied, onCopy } = useCopyToClipboard({ text: account });
  const [totalStaked, setTotalStaked] = useState(0);
  const { ethereum } = window;

  useEffect(async () => {
    if (storageService.get('auth') === true) {
      if (ethereum && ethereum.isMetaMask) {
        window.ethereum.on('accountsChanged', function () {
          window.location.reload();
        });
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        provider.listAccounts().then((accounts) => {
          const defaultAccount = accounts[0];
          if (defaultAccount) {
            setAccount(defaultAccount);
          }
        });
        const contract = new ethers.Contract(
          '0x120cbb8fC3D240d831eAaBEb5C402534CC0f658f',
          pools[0].abi,
          signer,
        );
        await contract.getTotalStake().then(async (total) => {
          const formatEther = ethers.utils.formatEther(total);
          if (formatEther) {
            setTotalStaked(Number(formatEther));
          }
        });
      }
    }
  }, [appStore, account]);

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
          </P>
          {!isCopied ? (
            <ReactTooltip id="copy-state" place="top" effect="solid">
              Copy to clipboard
            </ReactTooltip>
          ) : (
            <ReactTooltip id="copy-state" place="top" effect="solid">
              Copied
            </ReactTooltip>
          )}
        </div>
        <div className="info-block__stacked">
          <div className="info-block__stacked--total">
            <div>
              <ReactTooltip id="total-staked" place="top" effect="solid">
                Total Staked info
              </ReactTooltip>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ReactSVG
                    style={{
                      paddingTop: 1,
                    }}
                    src={pieChartOutlineIcon}
                    wrapper="span"
                  />
                  <P size="m-400" style={{ paddingBottom: 5 }}>
                    &nbsp;Total Staked&nbsp;
                  </P>
                </div>
                <ReactSVG
                  data-tip
                  data-for="total-staked"
                  style={{
                    paddingTop: 3,
                  }}
                  src={errorOutlineIcon}
                  wrapper="span"
                />
              </div>
            </div>
            <P size="xl-400" style={{ color: '#4A38AE' }}>
              {Number(totalStaked).toFixed(2)} AMB
            </P>
          </div>
          <div className="info-block__stacked--course">
            <div
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
              />
              <P size="m-400" style={{ paddingBottom: 5 }}>
                &nbsp;Last 24 Hours
              </P>
            </div>

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
        {pools.map((pool, index) => (
          <StackItem
            key={pool.contractName}
            index={index}
            openIndex={openIndexStakeItem}
            setOpenIndex={setOpenIndexStakeItem}
            expand
            comingSoon={!pool?.abi}
            lazy
            poolInfo={pool}
          />
        ))}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
});

export default Stacking;
