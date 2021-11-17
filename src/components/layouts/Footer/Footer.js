import React from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { MAIN_PAGE } from '../../../utils/constants';

import githubIcon from '../../../assets/svg/github-icon.svg';
import mediumIcon from '../../../assets/svg/medium-icon.svg';
import redditIcon from '../../../assets/svg/reddit-icon.svg';
import telegramIcon from '../../../assets/svg/telegram-icon.svg';
import twitterIcon from '../../../assets/svg/twitter-icon.svg';
import linkedinIcon from '../../../assets/svg/linkedin-icon.svg';
import pdfFile from '../../../assets/files/Ambrosus_Arcadia_Staking_Terms_of_Use.pdf';
const socialsLinks = [
  {
    url: 'https://github.com/ambrosus',
    title: 'Ambrosus Github',
    icon: githubIcon,
  },
  {
    url: 'https://linkedin.com/company/ambrosus-ecosystem/',
    title: 'Ambrosus LinkedIn',
    icon: linkedinIcon,
  },
  {
    url: 'https://t.me/Ambrosus',
    title: 'Ambrosus Telegram',
    icon: telegramIcon,
  },
  {
    url: 'https://www.reddit.com/r/AmbrosusEcosystem',
    title: 'Ambrosus Reddit',
    icon: redditIcon,
  },
  {
    url: 'https://blog.ambrosus.io',
    title: 'Ambrosus Medium',
    icon: mediumIcon,
  },
  {
    url: 'https://t.me/AmbrosusEcosystem',
    title: 'Ambrosus Ecosystem Telegram',
    icon: telegramIcon,
  },
  {
    url: 'https://twitter.com/AMB_Ecosystem',
    title: 'Ambrosus Twitter',
    icon: twitterIcon,
  },
];

const Footer = observer(() => {
  const location = useLocation();
  const { pathname } = location;
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
          &nbsp;&nbsp;
          <a href="mailto:info@ambrosus.io">info@ambrosus.io</a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
