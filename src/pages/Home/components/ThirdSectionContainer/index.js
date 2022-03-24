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
          <a
            href={homePageStatic.whereToByAmb[0].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="binance"
                src={homePageStatic.whereToByAmb[0].src}
                wrapper="span"
              />
              <p>{homePageStatic.whereToByAmb[0].text}</p>
            </div>
          </a>
          <a
            href={homePageStatic.whereToByAmb[1].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="kukoin"
                src={homePageStatic.whereToByAmb[1].src}
                wrapper="span"
              />
              <p>{homePageStatic.whereToByAmb[1].text}</p>
            </div>
          </a>
          <a
            href={homePageStatic.whereToByAmb[2].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="wb"
                src={homePageStatic.whereToByAmb[2].src}
                wrapper="span"
              />
              <p>{homePageStatic.whereToByAmb[2].text}</p>
            </div>
          </a>
          <a
            href={homePageStatic.whereToByAmb[3].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="profit"
                src={homePageStatic.whereToByAmb[3].src}
                wrapper="span"
              />
              <p>{homePageStatic.whereToByAmb[3].text}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </>
);
