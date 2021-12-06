import { ReactSVG } from 'react-svg';
import React from 'react';
import { homePageStatic } from '../../../../config';

export default () => (
  <>
    <div className="back-figure3" />
    <div className="back-figure4" />
    <div className="back-figure5" />
    <div className="back-figure6" />
    <div className="home__third-section">
      <div className="container">
        <div>
          <h2 className="section-heading">Where to buy AMB?</h2>
        </div>
        <div className="items-container">
          {homePageStatic.whereToByAmb.map((block) => (
            <div className="items-container__item">
              <ReactSVG src={block.src} wrapper="span" />
              <p>{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
