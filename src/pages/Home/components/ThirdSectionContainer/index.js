import { ReactSVG } from 'react-svg';
import React from 'react';
import { homePageStatic } from 'config';

export default () => (
  <>
    <div className="back-figure3" />
    <div className="back-figure4" />
    <div className="back-figure5" />
    <div className="home__third-section">
      <div className="container">
        <div>
          <h2 className="section-heading">Where to buy AMB?</h2>
        </div>
        <div className="items-container">
          {homePageStatic.whereToByAmb.map((block) => (
            <a
              key={block.src}
              href={block.url}
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              <div className="items-container__item">
                <ReactSVG src={block.src} wrapper="span" />
                <p>{block.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </>
);
