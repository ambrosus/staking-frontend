import React from 'react';

import TopSection from './components/TopSectionContainer';
import SecondSection from './components/SecondSectionContainer';
import StakingSection from './components/StakingSectionContainer';
import RenderItems from '../../components/RenderItems';
import FaqContainer from '../../pages/Home/components/FaqContainer';
import LastSectionContainer from '../../pages/Home/components/LastSectionContainer';
import ThirdSectionContainer from '../../pages/Home/components/ThirdSectionContainer';
import { useSinglePrismicDocument } from '@prismicio/react';

const Home = () => {
  const [homeDoc] = useSinglePrismicDocument('staking-homepage');
  const PData = homeDoc && {
    connectBtn: {
      walletconnect: homeDoc.data.walletconnect[0].text,
      metamask: homeDoc.data.metamask[0].text,
      stake_now: homeDoc.data.stake_now[0].text,
      connect: homeDoc.data.connect[0].text,
      startstaking: homeDoc.data.startstaking[0].text,
    },
    main: {
      title: homeDoc.data['main-heading'][0].text,
      subheading: {
        slug1: homeDoc.data.upto[0].text,
        slug2: homeDoc.data.upapy[0].text,
        slug3: homeDoc.data.fewclicks[0].text,
      },
    },
    arcadia: {
      heading: homeDoc.data.heading[0].text,
      subheading: homeDoc.data.subheading[0].text,
      arcadiaStaking: [
        {
          src: homeDoc.data.icon1.url,
          text: homeDoc.data.arcadiafirstitem[0].text,
        },
        {
          src: homeDoc.data.icon2.url,
          text: homeDoc.data.arcadiasecondtem[0].text,
        },
        {
          src: homeDoc.data.icon3.url,
          text: homeDoc.data.arcadia3item[0].text,
        },
        {
          src: homeDoc.data.icon4.url,
          text: homeDoc.data.arcadia4item[0].text,
        },
      ],
    },
    whereBuy: {
      heading: homeDoc.data.wherebue[0].text,
      whereToByAmb: [
        {
          src: homeDoc.data.binanceimg.url,
          hoverSrc: homeDoc.data.binancehover.url,
          text: homeDoc.data.binanceimg.alt,
          url: homeDoc.data.binance.url,
        },
        {
          src: homeDoc.data.kukoinimg.url,
          hoverSrc: homeDoc.data.kukoinimghover.url,
          text: homeDoc.data.kukoinimg.alt,
          url: homeDoc.data.kucoin.url,
        },
        {
          src: homeDoc.data.whitebitimg.url,
          hoverSrc: homeDoc.data.whitebithover.url,
          text: homeDoc.data.whitebitimg.alt,
          url: homeDoc.data.whitebit.url,
        },
        {
          src: homeDoc.data.probitimg.url,
          hoverSrc: homeDoc.data.probitimghover.url,
          text: homeDoc.data.probitimg.alt,
          url: homeDoc.data.probit.url,
        },
      ],
    },
    stakingSection: {
      'section-heading': homeDoc.data['section-heading'][0].text,
      amb: homeDoc.data.amb[0].text,
      pool: homeDoc.data.pool[0].text,
      max_stake: homeDoc.data.max_stake[0].text,
      my_stake_max_stake: homeDoc.data.my_stake_max_stake[0].text,
      my_stake: homeDoc.data.my_stake[0].text,
      total_max_stake: homeDoc.data.total_max_stake[0].text,
      total_pool_stake: homeDoc.data.total_pool_stake[0].text,
      apy: homeDoc.data.apy[0].text,
      __stake: homeDoc.data.__stake[0].text,
      calculate_your_rewards: homeDoc.data.calculate_your_rewards[0].text,
      see_what_your_amb: homeDoc.data.see_what_your_amb[0].text,
      initial_stake: homeDoc.data.initial_stake[0].text,
      apy__: homeDoc.data.apy__[0].text,
      apy_amb: homeDoc.data.apy_amb[0].text,
      apy__1: homeDoc.data.apy__1[0].text,
    },
    faqSection: {
      faq_title: homeDoc.data.faq_title[0].text,
      see_more: homeDoc.data.see_more[0].text,
      roll_up: homeDoc.data.roll_up[0].text,
      faqsList: [
        {
          title: homeDoc.data.q1[0].text,
          description: (
            <>
              {homeDoc.data.a11[0].text}
              <br />
              <br />
              {homeDoc.data.a22[0].text}
            </>
          ),
          key: 0,
        },
        {
          title: <> {homeDoc.data.q2[0].text}</>,
          description: <>{homeDoc.data.a2[0].text}</>,
          key: 1,
        },
        {
          title: <> {homeDoc.data.q3[0].text}</>,
          description: <>{homeDoc.data.a3[0].text}</>,
          key: 2,
        },
        {
          title: <> {homeDoc.data.q4[0].text}</>,
          description: <> {homeDoc.data.a4[0].text}</>,
          key: 3,
        },
        {
          title: <>{homeDoc.data.q5[0].text}</>,
          description: <>{homeDoc.data.a5[0].text}</>,
          key: 4,
        },
        {
          title: <>{homeDoc.data.q6[0].text}</>,
          description: <>{homeDoc.data.a6[0].text}</>,
          key: 5,
        },
        {
          title: <>{homeDoc.data.q7[0].text}</>,
          description: <>{homeDoc.data.a7[0].text}</>,
          key: 6,
        },
        {
          title: <>{homeDoc.data.q8[0].text}</>,
          description: <> {homeDoc.data.a8[0].text}</>,
          key: 7,
        },
        {
          title: <>{homeDoc.data.q9[0].text}</>,
          description: (
            <>
              {homeDoc.data.a91[0].text}
              <br />
              {homeDoc.data.a92[0].text}
            </>
          ),
          key: 8,
          last: true,
        },
      ],
    },
    lastSection: {
      title: homeDoc.data.last_title[0].text,
      lastSection: [
        {
          index: 0,
          title: homeDoc.data.l1title[0].text,
          text: homeDoc.data.l1text[0].text,
          btnText: homeDoc.data.l1btntext[0]?.text,
        },
        {
          index: 1,
          title: homeDoc.data.l2title[0].text,
          text: homeDoc.data.l2text[0].text,
          links: [
            {
              url: homeDoc.data.l2link1.url,
              title: homeDoc.data.l1linktitle[0].text,
              icon: homeDoc.data.l1linkimg.url,
            },
            {
              url: homeDoc.data.l2link2.url,
              title: homeDoc.data.l2linktitle[0].text,
              icon: homeDoc.data.l2linkimg.url,
            },
            {
              url: homeDoc.data.l2link3.url,
              title: homeDoc.data.l3linktitle[0].text,
              icon: homeDoc.data.l3linkimg.url,
            },
            {
              url: homeDoc.data.l2link4.url,
              title: homeDoc.data.l4linktitle[0].text,
              icon: homeDoc.data.l4linkimg.url,
            },
          ],
        },
        {
          index: 2,
          title: homeDoc.data.l3title[0].text,
          text: homeDoc.data.l3text[0].text,
          btnText: homeDoc.data.l3btntext[0].text,
        },
      ],
    },
  };
  return (
    <div className='home' id='home'>
      <RenderItems>
        {PData && (
          <>
            <TopSection PData={PData.main} connectBtn={PData.connectBtn} />
            <SecondSection
              PData={PData.arcadia}
              connectBtn={PData.connectBtn}
            />
            <ThirdSectionContainer PData={PData.whereBuy} />
            <StakingSection
              PData={PData.stakingSection}
              connectBtn={PData.connectBtn}
            />
            <FaqContainer PData={PData.faqSection} />
            <LastSectionContainer PData={PData.lastSection} />
          </>
        )}
      </RenderItems>
    </div>
  );
};

export default Home;
