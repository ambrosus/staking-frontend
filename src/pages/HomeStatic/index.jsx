import React from 'react';
import AmbBigLog from 'assets/images/Logo/AmbBigLogo';
import AmbLogoText1 from 'assets/images/Logo/AmbLogoText1';
import AmbLogoText2 from 'assets/images/Logo/AmbLogoText2';
import AirdaoLogo from 'assets/images/Logo/AirdaoLogo';
import Twitter from 'assets/images/SocialButtons/Twitter';
import Telegram from 'assets/images/SocialButtons/Telegram';
import Reddit from 'assets/images/SocialButtons/Reddit';
import Medium from 'assets/images/SocialButtons/Medium';

const HomeStatic = () => {
  return (
    <div className='home-static'>
      <div className='home-static__leftside'>
        <AmbBigLog />
        <div className=''>
          <div className=''>
            <AmbLogoText1 />
          </div>
          <div className=''>
            <AmbLogoText2 />
          </div>
        </div>
      </div>
      <div className='home-static__rightside'>
        <div className='home-static__rightside-info'>
          <div className=''>
            <AirdaoLogo />
          </div>
          <div className='home-static__rightside-content'>
            <p className='home-static__rightside-'>
              Arcadia Staking and Ambrosus Ecosystem have moved to AirDAO on 15
              September 2022. Your assets and rewards remain unaffected.
            </p>
            <p className='home-static__rightside-'>
              You can now access, stake and unstake your assets through the new
              website.
            </p>
          </div>
          <div className='home-static__rightside-botom'>
            <a
              href='https://airdao.io/staking/'
              target='_blank'
              className='home-static__rightside-btn'
            >
              Stake Now
            </a>
            <a
              href='https://blog.airdao.io/the-launch-of-airdao-b4785bd43021'
              target='_blank'
              className='home-static__rightside-url'
            >
              About the new brand →
            </a>
          </div>
        </div>
        <div className='home-static__rightside-socials'>
          <a
            href='https://twitter.com/AMB_Ecosystem'
            target='_blank'
            className=''
          >
            <Twitter />
          </a>
          <a href='https://t.me/Ambrosus' target='_blank' className=''>
            <Telegram />
          </a>
          <a
            href='https://www.reddit.com/r/AmbrosusEcosystem/'
            target='_blank'
            className=''
          >
            <Reddit />
          </a>
          <a href='https://blog.ambrosus.io/' target='_blank' className=''>
            <Medium />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeStatic;
