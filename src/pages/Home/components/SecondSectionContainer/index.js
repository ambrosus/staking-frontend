import React from 'react';
import { ReactSVG } from 'react-svg';
import { useWeb3React } from '@web3-react/core';

import { homePageStatic } from '../../../../config';
import { useLogIn } from '../../../../hooks';

export default () => {
  const { logIn } = useLogIn();
  const { active } = useWeb3React();
  return (
    <div className="home__second-section">
      <div className="container">
        <div>
          <h2 className="section-heading">Arcadia</h2>
        </div>
        <p className="home__second-section--secondary">
          Simplified staking on the Ambrosus network.
        </p>
        <div className="items-container">
          {homePageStatic.arcadiaStaking.map((block) => (
            <div className="items-container__item">
              <ReactSVG src={block.src} wrapper="span" />
              <p>{block.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-group">
        {' '}
        <button
          type="button"
          className="btn white "
          onClick={() => {
            if (active) {
              logIn();
            } else {
              window.location.replace('#home__top--info');
            }
          }}
        >
          ↖ Start Staking
        </button>
      </div>
    </div>
  );
};
