import React from 'react';
import AmbBigLog from 'assets/images/Logo/AmbBigLogo';
import AmbLogoText1 from 'assets/images/Logo/AmbLogoText1';
import AmbLogoText2 from 'assets/images/Logo/AmbLogoText2';
import AirdaoLogo from 'assets/images/Logo/AirdaoLogo';
import Twitter from 'assets/images/SocialButtons/Twitter';
import Telegram from 'assets/images/SocialButtons/Telegram';
import Reddit from 'assets/images/SocialButtons/Reddit';
import Medium from 'assets/images/SocialButtons/Medium';
import Discord from 'assets/images/SocialButtons/Discord';

const HomeStatic = () => {
  return (
    <div className='home-static'>
      <div className='home-static-wrapper'>
        <div className='home-static__leftside'>
          <span className='home-static__leftside-logo'>
            <AmbBigLog />
          </span>
          <div className='home-static__leftside-text'>
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
                Arcadia Staking and Ambrosus Ecosystem have moved to AirDAO on
                15 September 2022. Your assets and rewards remain unaffected.
              </p>
              <p className='home-static__rightside-' style={{ marginTop: 20 }}>
                You can now access, stake and unstake your assets through the
                new website.
              </p>
            </div>
            <div className='home-static__rightside-botom'>
              <a
                href='https://airdao.io/staking/'
                target='_blank'
                className='home-static__rightside-btn'
                rel='noreferrer'
              >
                Stake Now
              </a>
              <a
                href='https://blog.airdao.io/the-launch-of-airdao-b4785bd43021'
                target='_blank'
                className='home-static__rightside-url'
                rel='noreferrer'
              >
                About the new brand →
              </a>
            </div>
          </div>
          <div className='home-static__rightside-socials'>
            <a
              href='https://twitter.com/airdao_io'
              target='_blank'
              className=''
              rel='noreferrer'
            >
              <Twitter />
            </a>
            <a
              href='https://t.me/airDAO_official'
              target='_blank'
              className=''
              rel='noreferrer'
            >
              <Telegram />
            </a>
            <a
              href='https://www.reddit.com/r/AirDAO/'
              target='_blank'
              className=''
              rel='noreferrer'
            >
              <Reddit />
            </a>
            <a
              href='https://blog.airdao.io/'
              target='_blank'
              className=''
              rel='noreferrer'
            >
              <Medium />
            </a>
            <a
              href='https://discord.gg/nsNvbCzP'
              target='_blank'
              className=''
              rel='noreferrer'
            >
              <Discord />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStatic;
