import { ReactSVG } from 'react-svg';
import cx from 'classnames';
import React from 'react';
import { injected, walletconnect } from 'config';
import { useLogIn, useModal } from 'hooks';
import Button from '../../../../components/Button';
import Modal from 'components/Modal';
import ButtonGroup from 'components/ButtonGroup';
import Paragraph from 'components/Paragraph';

export default ({PData}) => {
  const { isShowing: isLogInMethodShow, toggle: toggleLogInMethodShow } =
    useModal();
  const { logIn } = useLogIn();
  return (
    <div className="home__last-section">
      <div className="container">
        <div style={{ maxWidth: 660 }}>
          <h2 className="section-heading">{PData.title}</h2>
        </div>
        <div className="items-container">
          {PData.lastSection.map((block, index) => {
            const socials =
              block.links &&
              block.links.map((social) => (
                <li className="socials__list__link" key={social.url + index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ReactSVG wrapper="span" src={social.icon} />
                  </a>
                </li>
              ));
            return (
              <div
                key={block.index}
                className={cx('items-container__item', {
                  'items-container__item--right': index === 1,
                })}
              >
                <p className="home__last-section--heading">{block.title}</p>
                <p className="home__last-section--secondary">{block.text}</p>
                {block.links && <ul className="socials__list">{socials}</ul>}
                {block.btnText && (
                  <a
                    href={block.btnText.includes('more') ? '#home__faq' : null}
                  >
                    <Button
                      buttonStyles={{ width: 174, height: 65 }}
                      type="white"
                      onclick={() => {
                        if (!block.btnText.includes('more')) {
                          toggleLogInMethodShow();
                        } else {
                          window.location.replace('#home__top--info');
                        }
                      }}
                    >
                      {block.btnText}
                    </Button>
                  </a>
                )}
              </div>
            );
          })}
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
    </div>
  );
};
