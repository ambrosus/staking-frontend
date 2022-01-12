import React from 'react';
import { ReactSVG } from 'react-svg';

import { homePageStatic, injected, walletconnect } from 'config';
import { useLogIn, useModal } from 'hooks';
import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';
import Paragraph from 'components/Paragraph';

export default () => {
  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();
  const { logIn } = useLogIn();
  return (
    <div className="home__second-section">
      <div className="container">
        <div>
          <h2 className="section-heading">Arcadia</h2>
        </div>
        <p className="home__second-section--secondary">
          Simplified staking on the Ambrosus network.
        </p>
        <div className="items-container">
          {homePageStatic.arcadiaStaking.map((block) => (
            <div className="items-container__item" key={block.src}>
              <ReactSVG src={block.src} wrapper="span" />
              <p>{block.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-group">
        {' '}
        <button
          type="button"
          className="btn white "
          onClick={toggleLogInMethodShow}
        >
          ↖ Start Staking
        </button>
      </div>
      <Modal
        isShowing={isLogInMethodShow}
        hide={toggleLogInMethodShow}
        modalStyles={{ maxWidth: 500 }}
      >
        <ButtonGroup>
          <Button
            buttonStyles={{
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
