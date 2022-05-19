import { ReactSVG } from 'react-svg';
import React from 'react';
import { homePageStatic } from 'config';

export default ({PData}) => (
  <>
    <div className="back-figure3" />
    <div className="back-figure4" />
    <div className="back-figure5" />
    <div className="home__third-section">
      <div className="container">
        <div>
          <h2 className="section-heading">{PData.heading}</h2>
        </div>
        <div className="items-container">
          <a
            href={PData.whereToByAmb[0].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="binance"
                src={PData.whereToByAmb[0].src}
                wrapper="span"
              />
              <p>{PData.whereToByAmb[0].text}</p>
            </div>
          </a>
          <a
            href={PData.whereToByAmb[1].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="kukoin"
                src={PData.whereToByAmb[1].src}
                wrapper="span"
              />
              <p>{PData.whereToByAmb[1].text}</p>
            </div>
          </a>
          <a
            href={PData.whereToByAmb[2].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="wb"
                src={PData.whereToByAmb[2].src}
                wrapper="span"
              />
              <p>{PData.whereToByAmb[2].text}</p>
            </div>
          </a>
          <a
            href={PData.whereToByAmb[3].url}
            target="_blank"
            style={{ cursor: 'pointer' }}
          >
            <div className="items-container__item">
              <ReactSVG
                className="profit"
                src={PData.whereToByAmb[3].src}
                wrapper="span"
              />
              <p>{PData.whereToByAmb[3].text}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </>
);
