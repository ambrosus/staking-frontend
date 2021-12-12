import React from 'react';
import { ReactSVG } from 'react-svg';
import { useLocation } from 'react-router-dom';
import { MAIN_PAGE, socialsLinks } from '../../../config';
import footerLogo from '../../../assets/svg/footer-logo.svg';
import footerLogoMobile from '../../../assets/svg/footer-logo-mobile.svg';
import { useMedia } from '../../../hooks';

import pdfFile from '../../../assets/files/Ambrosus_Arcadia_Staking_Terms_of_Use.pdf';

const Footer = () => {
  const { pathname } = useLocation();
  const isMainPage = pathname === MAIN_PAGE;

  const isSmall = useMedia('(max-width: 699px)');
  const socials = socialsLinks.map((social) => (
    <li className="socials__list__link" key={social.url}>
      <a href={social.url} target="_blank" rel="noopener noreferrer">
        <ReactSVG wrapper="span" src={social.icon} />
      </a>
    </li>
  ));

  return (
    <footer
      className="footer"
      style={{
        background: isMainPage && '#212121',
        color: isMainPage && '#8F8F8F',
        fontFamily: isMainPage && 'Proxima Nova',
      }}
    >
      <div className="wrapper">
        <div className="copyright">
          <ReactSVG
            src={!isSmall ? footerLogo : footerLogoMobile}
            wrapper="span"
          />
        </div>

        <div className="contact">
          <a className="terms-of-use" href={pdfFile} target="_blank">
            Terms of use
          </a>{' '}
        </div>
        <div className="socials">
          <ul className="socials__list">{socials}</ul>
        </div>
      </div>{' '}
    </footer>
  );
};

export default Footer;
