import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import headerLogoSvg from '../../../../assets/svg/header-logo.svg';
import Menu from '../Menu';
import Paragraph from '../../../../components/Paragraph';
import { CONNECT_TEXT } from '../../../../config';
import { useLogIn } from '../../../../hooks';
import Button from '../../../../components/Button';

export default () => {
  const { logIn } = useLogIn('CONNECT_WALLET');

  return (
    <>
      {' '}
      <div className="home__top">
        <div className="home__top--header">
          <Link to="/">
            <div className="logo">
              <ReactSVG src={headerLogoSvg} wrapper="span" />
            </div>
          </Link>
          <Menu />
        </div>
      </div>
      <div className="home__top--info" id="home__top--info">
        <div className="back-figure1" />
        <div className="back-figure2" />
        <div className="info-text">
          <Paragraph
            size="xxxl-500"
            style={{
              paddingBottom: 10,
              fontFamily: 'Halvar Breitschrift,sans-serif',
            }}
          >
            Get AMB rewards. No node needed.
          </Paragraph>
          <Paragraph size="l-500-white">
            Stake your AMB and receive up to
            <span style={{ color: '#1ACD8C', fontWeight: 600 }}>
              {' '}
              35% APY
            </span>{' '}
            in a few clicks.
          </Paragraph>
        </div>
        <Button
          buttonStyles={{
            marginTop: 50,
            background: '#212121',
          }}
          type="black"
          onclick={logIn}
        >
          <Paragraph style={{ fontFamily: ' Neue Machina' }} size="m-500">
            <span
              style={{
                paddingLeft: 5,
                fontFamily: ' Neue Machina',
                whiteSpace: 'nowrap',
              }}
            >
              {CONNECT_TEXT}
            </span>
          </Paragraph>
        </Button>
      </div>
    </>
  );
};
