import React from 'react';
import ReactNotifications from 'react-notifications-component';
import Faq from './components/FaqContainer';
import LastSection from './components/LastSectionContainer';
import ThirdSection from './components/ThirdSectionContainer';
import TopSection from './components/TopSectionContainer';
import SecondSection from './components/SecondSectionContainer';
import StakingSection from './components/StakingSectionContainer';
import Sidebar from '../../components/Sidebar';
import RenderItems from '../../components/RenderItems';

const Home = () => (
  <div className="home" id="home">
    <Sidebar pageWrapId="root" outerContainerId="root" />
    <ReactNotifications />
    <RenderItems>
      <TopSection />
      <SecondSection />
      <ThirdSection />
      <StakingSection />
      <Faq />
      <LastSection />
    </RenderItems>
  </div>
);

export default Home;
