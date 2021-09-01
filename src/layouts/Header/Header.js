import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';
import MetaMaskOnboarding from '@metamask/onboarding';
import detectEthereumProvider from '@metamask/detect-provider';

import headerLogoSvg from '../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../assets/svg/login.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import P from '../../components/P';

const Header = () => {
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();
  const history = useHistory();
  let myprovider;
  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((newAccounts) => setAccounts(newAccounts));
      } else {
        onboarding.current.startOnboarding();
      }
    }
  }, [accounts]);
  React.useEffect(() => {
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
  }, []);

  useEffect(async () => {
    if (window?.ethereum) {
      myprovider = await detectEthereumProvider();
      console.log(myprovider);
    }
  }, []);

  const logOut = async () => {
    history.push('/');
  };
  return (
    <div className="header">
      <div className="header__logo">
        <ReactSVG src={headerLogoSvg} wrapper="span" />
      </div>
      <div className="amb-curse">
        <P size="xs-400" style={{ color: '#9198BB' }}>
          AMB Price <b>$ 0.0402 </b>-8.30%
        </P>
      </div>
      {accounts.length >= 0 && (
        <div className="wallet-connect">
          {accounts[0] && <ReactSVG src={greenLightIcon} wrapper="span" />}
          {accounts[0] && (
            <P size="xs-400">
              {accounts[0]
                ? ` ${accounts[0].substr(0, 9)}...${accounts[0].substr(0, 9)}`
                : '...'}
            </P>
          )}
          {accounts === [] && <P>...</P>}
        </div>
      )}

      <div role="presentation" className="header__btn" onClick={logOut}>
        <ReactSVG src={loginIcon} wrapper="span" />
        <P size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
          Log Out
        </P>
      </div>
    </div>
  );
};
export default Header;
