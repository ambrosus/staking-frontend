import React from "react";

import TopSection from "./components/TopSectionContainer";
import SecondSection from "./components/SecondSectionContainer";
import StakingSection from "./components/StakingSectionContainer";
import RenderItems from "../../components/RenderItems";
import FaqContainer from "../../pages/Home/components/FaqContainer";
import LastSectionContainer from "../../pages/Home/components/LastSectionContainer";
import ThirdSectionContainer from "../../pages/Home/components/ThirdSectionContainer";

const Home = () => (
  <div className="home" id="home">
    <RenderItems>
      <TopSection />
      <SecondSection />
      <ThirdSectionContainer />
      <StakingSection />
      <FaqContainer />
      <LastSectionContainer />
    </RenderItems>
  </div>
);

export default Home;
