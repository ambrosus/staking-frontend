import React from "react";

import TopSection from "./components/TopSectionContainer";
import SecondSection from "./components/SecondSectionContainer";
import StakingSection from "./components/StakingSectionContainer";
import RenderItems from "../../components/RenderItems";
import FaqContainer from "../../pages/Home/components/FaqContainer";
import LastSectionContainer from "../../pages/Home/components/LastSectionContainer";
import ThirdSectionContainer from "../../pages/Home/components/ThirdSectionContainer";
import {useSinglePrismicDocument} from "@prismicio/react";

const Home = () => {
    const [homeDoc] = useSinglePrismicDocument("staking-homepage");
    console.log('homeDoc', homeDoc);
    const PData = homeDoc && {
        connectBtn: {
            walletconnect: homeDoc.data.walletconnect[0].text,
            metamask: homeDoc.data.metamask[0].text,
            connect: homeDoc.data.connect[0].text,
            startstaking: homeDoc.data.startstaking[0].text,
        },
        main: {
            title: homeDoc.data['main-heading'][0].text,
            subheading: {
                slug1: homeDoc.data.upto[0].text,
                slug2: homeDoc.data.upapy[0].text,
                slug3: homeDoc.data.fewclicks[0].text
            }
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
      whereBuy:{
        heading: homeDoc.data.wherebue[0].text,
          whereToByAmb: [
              {
                  src:  homeDoc.data.binanceimg.url,
                  hoverSrc: homeDoc.data.binancehover.url,
                  text:   homeDoc.data.binanceimg.alt,
                  url:  homeDoc.data.binance.url,
              },
              {
                  src:  homeDoc.data.kukoinimg.url,
                  hoverSrc: homeDoc.data.kukoinimghover.url,
                  text:   homeDoc.data.kukoinimg.alt,
                  url:  homeDoc.data.kucoin.url,
              },
              {
                  src:  homeDoc.data.whitebitimg.url,
                  hoverSrc: homeDoc.data.whitebithover.url,
                  text:   homeDoc.data.whitebitimg.alt,
                  url:  homeDoc.data.whitebit.url,

              },
              {
                  src:  homeDoc.data.probitimg.url,
                  hoverSrc: homeDoc.data.probitimghover.url,
                  text:   homeDoc.data.probitimg.alt,
                  url:  homeDoc.data.probit.url,

              },
          ],
      }
    }
    console.log('PTopSection', PData);
    return (
        <div className="home" id="home">
            <RenderItems>
                {PData && <>
                    <TopSection PData={PData.main} connectBtn={PData.connectBtn} />
                    <SecondSection PData={PData.arcadia} connectBtn={PData.connectBtn}/>
                    <ThirdSectionContainer PData={PData.whereBuy}/>
                    <StakingSection/>
                    <FaqContainer/>
                    <LastSectionContainer/>
                </>}
            </RenderItems>
        </div>
    );
}

export default Home;
