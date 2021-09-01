import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';
import Web3 from 'web3';

import walletIcon from '../../assets/svg/wallet.svg';
import P from '../P';

const MetamaskConnect = () => {
  const [metamaskInstalled, setMetamaskInstalled] = useState(null);
  const [account, setAccount] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const isMetamask = typeof window.web3 !== 'undefined';
    walletConnect(isMetamask);
  }, [metamaskInstalled]);
  const walletConnect = async (bool) => {
    setMetamaskInstalled(bool);
    if (metamaskInstalled) {
      await loadWeb3();
      await loadBlockchainData();
      if (account) {
        history.push('/stacking');
      }
    }
  };
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log('wallet connect!!!');
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log('wallet connect!!!');
    } else {
      console.log('please install metamask');
    }
  };
  const loadBlockchainData = async () => {
    try {
      const accounts = await window.web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div role="presentation" onClick={walletConnect} className="connect-btn">
      <ReactSVG src={walletIcon} wrapper="span" />
      <P style={{ paddingLeft: 30, paddingRight: 30 }} size="m-500">
        Connect Your Wallet
      </P>
    </div>
  );
};

export default MetamaskConnect;
