import React from 'react';
import { Link } from 'react-router-dom';

import { menuLinks } from 'config';
import Paragraph from '../../../../components/Paragraph';

export const Menu = () => (
  <div className="menu">
    {menuLinks.map((link) =>
      link.route ? (
        <Link to={link.href} className="menu__bold" key={link.href}>
          <Paragraph
            style={{ color: 'white', fontWeight: '500' }}
            className="active"
            size="xs-500"
          >
            {link.title}
          </Paragraph>
        </Link>
      ) : (
        <a target={link.target && '_blank'} href={link.href} key={link.href}>
          <Paragraph size="xs-500">{link.title}</Paragraph>
        </a>
      ),
    )}
  </div>
);
