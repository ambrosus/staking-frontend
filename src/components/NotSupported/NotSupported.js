import React from 'react';
import * as PropTypes from 'prop-types';
import Paragraph from '../Paragraph';
import { injected, network, walletconnect } from 'config';
import { useLogIn, useModal } from 'hooks';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import { changeNetwork } from 'utils/helpers';

const NotSupported = ({ children }) => {
  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();
  const { logIn } = useLogIn();
  const net = !network ? 'Testnet' : 'Mainnet';
  const method = localStorage.getItem('connector');

  return (
    <div className="not-supported">
      {children ? (
        <Paragraph>{children}</Paragraph>
      ) : (
        <Paragraph>
          {method === 'injected' ? (
            <>
              {' '}
              Ambrosus is not supported on this network. Please &nbsp;
              <span
                className="switch-text"
                role="presentation"
                onClick={() => changeNetwork()}
              >
                switch to {net}
              </span>{' '}
            </>
          ) : (
            <>
              {' '}
              Ambrosus is not supported on this network. Please &nbsp;
              <span
                className="switch-text"
                role="presentation"
                style={{ cursor: 'auto' }}
                onClick={() => changeNetwork()}
              >
                switch to {net} on your mobile
              </span>{' '}
            </>
          )}
        </Paragraph>
      )}

      <Modal
        isShowing={isLogInMethodShow}
        hide={toggleLogInMethodShow}
        modalStyles={{ maxWidth: 500 }}
      >
        <ButtonGroup>
          <Button
            buttonStyles={{
              margin: 20,
              background: '#212121',
            }}
            type="black"
            onclick={() => logIn(injected)}
          >
            <Paragraph style={{ fontFamily: ' Neue Machina' }} size="m-500">
              <span
                style={{
                  paddingLeft: 5,
                  fontFamily: ' Neue Machina',
                  whiteSpace: 'nowrap',
                }}
              >
                Metamask
              </span>
            </Paragraph>
          </Button>
          <Button
            buttonStyles={{
              margin: 20,
              background: '#212121',
            }}
            type="black"
            onclick={() => logIn(walletconnect)}
          >
            <Paragraph style={{ fontFamily: ' Neue Machina' }} size="m-500">
              <span
                style={{
                  paddingLeft: 5,
                  fontFamily: ' Neue Machina',
                  whiteSpace: 'nowrap',
                }}
              >
                WalletConnect
              </span>
            </Paragraph>
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  );
};
NotSupported.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default NotSupported;
