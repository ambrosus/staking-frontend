import React from 'react';
import { ReactSVG } from 'react-svg';
import { useMedia } from 'hooks';

import {useSinglePrismicDocument} from "@prismicio/react";

const Footer = () => {
    const [footerDoc] = useSinglePrismicDocument("footer-type");

    const footer_logo = footerDoc && footerDoc.data['footer-logo'].url;
    const footer_logo_mobile = footerDoc && footerDoc.data['footer_logo_mobile'].url;
    const terms = footerDoc && footerDoc.data['terms_of_use'][0].text;
    const termsFile = footerDoc && footerDoc.data['terms_of_use-file'].url;
    const socialsLinks =footerDoc && [
        {
            url: footerDoc.data.githublink.url,
            icon: footerDoc.data.github_icon.url,
        },
        {
            url: footerDoc.data.linkedin.url,
            icon: footerDoc.data.linkedin_icon.url,
        },
        {
            url: footerDoc.data.telegram.url,
            icon: footerDoc.data.telegram_icon.url,
        },
        {
            url: footerDoc.data.reddit.url,
            icon: footerDoc.data.reddit_icon.url,
        },
        {
            url: footerDoc.data.medium.url,
            icon: footerDoc.data.medium_icon.url
        },
        {
            url: footerDoc.data.telegram2.url,
            icon: footerDoc.data.telegram2_icon.url,
        },
        {
            url: footerDoc.data.twitter.url,
            icon: footerDoc.data.twitter_icon.url,
        },
    ];

  const isSmall = useMedia('(max-width: 699px)');
  const socials = footerDoc && socialsLinks.map((social) => (
    <li className="socials__list__link" key={social.url}>
      <a href={social.url} target="_blank" rel="noopener noreferrer">
        <ReactSVG wrapper="span" src={social.icon} />
      </a>
    </li>
  ));

  return footerDoc ? (
    <footer
      className="footer"
      style={{
        background: '#212121',
        color: '#8F8F8F',
        fontFamily: 'Proxima Nova',
      }}
    >
      <div className="wrapper">
        <div className="copyright">
          <ReactSVG
            src={!isSmall ? footer_logo : footer_logo_mobile}
            wrapper="span"
          />
        </div>

        <div className="contact">
          <a className="terms-of-use" href={termsFile} target="_blank">
              {terms}
          </a>{' '}
        </div>
        <div className="socials">
          <ul className="socials__list">{socials}</ul>
        </div>
      </div>{' '}
    </footer>
  ): null;
};

export default Footer;
