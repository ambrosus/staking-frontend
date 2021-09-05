import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';
import Web3 from 'web3';

import walletIcon from '../../assets/svg/wallet.svg';
import P from '../P';
import { CONNECT_TEXT } from '../../utils/constants';

export const MetamaskConnect = () => {
  const [isConnected, setIsConnected] = useState(true);
  const history = useHistory();
  useEffect(async () => {
    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Please connect to Metamask.');
    }
    if (window.web3 && !window.web3?.currentProvider?.selectedAddress) {
      setIsConnected(false);
    }
  }, [window.web3, isConnected]);

  return (
    <div
      role="presentation"
      className="connect-btn"
      style={{ display: 'flex' }}
      onClick={async () => {
        if (isConnected) {
          history.push('/stacking');
        }
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          try {
            await window.ethereum.enable();
            setIsConnected(true);
          } catch (error) {
            setIsConnected(false);
          }
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          setIsConnected(true);
        } else {
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!',
          );
        }
      }}
    >
      <ReactSVG src={walletIcon} wrapper="span" />
      <P style={{ paddingLeft: 30, paddingRight: 30 }} size="m-500">
        {isConnected ? 'Go to stacking' : CONNECT_TEXT}
      </P>
    </div>
  );
};

export default MetamaskConnect;
