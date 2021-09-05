/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Web3Provider, { useWeb3Context, Web3Consumer } from 'web3-react';
import Web3 from 'web3';

import connectors from '../../utils/constants';
import headerLogoSvg from '../../assets/svg/header-logo-blue.svg';
import loginIcon from '../../assets/svg/login.svg';
import greenLightIcon from '../../assets/svg/green-light-icon.svg';
import P from '../../components/P';

export const Header = () => {
  return (
    <>
      <Web3Provider
        connectors={connectors}
        web3Api={Web3}
        libraryName="web3.js"
      >
        <Panel />
      </Web3Provider>
    </>
  );
};
export const Panel = () => {
  const [isConnected, setIsConnected] = useState(null);
  const context = useWeb3Context();

  const logOut = async () => {
    setIsConnected(false);
  };
  const logIn = async () => {
    setIsConnected(true);
  };
  useEffect(() => {
    if (isConnected) {
      context.setConnector('MetaMask');
    } else {
      context.unsetConnector();
    }
    console.log(context.active);
  }, [isConnected]);

  return (
    <Web3Consumer>
      {(context) => {
        const { active, connectorName, account, networkId } = context;
        if (context.error) {
          alert(context.error);
        }
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
            {isConnected && account && (
              <div className="wallet-connect">
                {account && <ReactSVG src={greenLightIcon} wrapper="span" />}
                {account && (
                  <P size="xs-400">
                    {account
                      ? ` ${account.substr(0, 9)}...${account.substr(0, 9)}`
                      : '...'}
                  </P>
                )}
              </div>
            )}
            {context.active || (context.error && context.connectorName) ? (
              <div role="presentation" className="header__btn" onClick={logOut}>
                <ReactSVG src={loginIcon} wrapper="span" />
                <P size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
                  Log Out
                </P>
              </div>
            ) : (
              <div role="presentation" className="header__btn" onClick={logIn}>
                <ReactSVG src={loginIcon} wrapper="span" />
                <P size="xs-500" style={{ color: '#BFC9E0', paddingLeft: 5 }}>
                  Log in
                </P>
              </div>
            )}
          </div>
        );
      }}
    </Web3Consumer>
  );
};

export default Header;
