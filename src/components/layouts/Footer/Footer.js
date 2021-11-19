import React from 'react';
import {ReactSVG} from 'react-svg';
import {observer} from 'mobx-react-lite';
import {useLocation} from 'react-router-dom';

import {MAIN_PAGE, socialsLinks} from '../../../config';

import pdfFile from '../../../assets/files/Ambrosus_Arcadia_Staking_Terms_of_Use.pdf';

const Footer = observer(() => {
    const location = useLocation();
    const {pathname} = location;

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
        background: pathname === MAIN_PAGE && '#262626',
        color: pathname === MAIN_PAGE && 'white',
        fontFamily: pathname === MAIN_PAGE && 'Proxima Nova',
      }}
    >
      <div className="wrapper">
        <div className="copyright">
          &copy; {new Date().getFullYear()} Ambrosus Network. All rights
          reserved.
        </div>

        <div className="socials">
          <ul className="socials__list">{socials}</ul>
        </div>

        <div className="contact">
          <a className="terms-of-use" href={pdfFile} target="_blank">
            Terms of use
          </a>{' '}
        </div>
      </div>
    </footer>
  );
});

export default Footer;
