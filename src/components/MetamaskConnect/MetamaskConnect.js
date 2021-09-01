import React from 'react';
import { ReactSVG } from 'react-svg';
import MetaMaskOnboarding from '@metamask/onboarding';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import walletIcon from '../../assets/svg/wallet.svg';
import P from '../P';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect Your Wallet';
const CONNECTED_TEXT = 'Go to stacking';

const MetamaskConnect = () => {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();
  const history = useHistory();
  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => {
          setAccounts(newAccounts);
        });
      window.ethereum.on('accountsChanged', (newAccounts) => {
        setAccounts(newAccounts);
      });
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        history.push('/stacking');
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
      }
    }
  }, [accounts]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <div
      role="presentation"
      className="connect-btn"
      style={{ display: 'flex' }}
    >
      <Link to="/stacking" onClick={() => onClick()}>
        <ReactSVG src={walletIcon} wrapper="span" />
        <P style={{ paddingLeft: 30, paddingRight: 30 }} size="m-500">
          {buttonText}
        </P>
      </Link>
    </div>
  );
};

export default MetamaskConnect;
