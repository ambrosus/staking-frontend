import { ReactSVG } from 'react-svg';
import cx from 'classnames';
import React from 'react';
import { homePageStatic } from '../../../../config';
import { useLogIn } from '../../../../hooks';

export default () => {
  const { logIn } = useLogIn();
  return (
    <div className="home__last-section">
      <div className="container">
        <div style={{ maxWidth: 660 }}>
          <h2 className="section-heading">Stake AMB and join our community!</h2>
        </div>
        <div className="items-container">
          {homePageStatic.lastSection.map((block, index) => {
            const socials =
              block.links &&
              block.links.map((social) => (
                <li className="socials__list__link" key={social.url}>
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
                  <button type="button" className="btn white " onClick={logIn}>
                    {block.btnText}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
