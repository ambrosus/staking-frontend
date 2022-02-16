import { ReactSVG } from 'react-svg';
import React from 'react';
import { homePageStatic } from 'config';
import { useHover } from 'hooks';

export default () => {
  const [hoverSrc, isHovered] = useHover();
  const [hoverSrc2, isHovered2] = useHover();
  const [hoverSrc3, isHovered3] = useHover();
  const [hoverSrc4, isHovered4] = useHover();
  return (
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
              ref={hoverSrc}
              href={homePageStatic.whereToByAmb[0].url}
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              <div className="items-container__item">
                <ReactSVG
                  className="svg-item"
                  src={
                    isHovered
                      ? homePageStatic.whereToByAmb[0].hoverSrc
                      : homePageStatic.whereToByAmb[0].src
                  }
                  wrapper="span"
                />
                <p>{homePageStatic.whereToByAmb[0].text}</p>
              </div>
            </a>
            <a
              ref={hoverSrc2}
              href={homePageStatic.whereToByAmb[1].url}
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              <div className="items-container__item">
                <ReactSVG
                  className="svg-item"
                  src={
                    isHovered2
                      ? homePageStatic.whereToByAmb[1].hoverSrc
                      : homePageStatic.whereToByAmb[1].src
                  }
                  wrapper="span"
                />
                <p>{homePageStatic.whereToByAmb[1].text}</p>
              </div>
            </a>
            <a
              ref={hoverSrc3}
              href={homePageStatic.whereToByAmb[2].url}
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              <div className="items-container__item">
                <ReactSVG
                  className="svg-item"
                  src={
                    isHovered3
                      ? homePageStatic.whereToByAmb[2].hoverSrc
                      : homePageStatic.whereToByAmb[2].src
                  }
                  wrapper="span"
                />
                <p>{homePageStatic.whereToByAmb[2].text}</p>
              </div>
            </a>
            <a
              ref={hoverSrc4}
              href={homePageStatic.whereToByAmb[3].url}
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              <div className="items-container__item">
                <ReactSVG
                  className="svg-item"
                  src={
                    isHovered4
                      ? homePageStatic.whereToByAmb[3].hoverSrc
                      : homePageStatic.whereToByAmb[3].src
                  }
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
};
