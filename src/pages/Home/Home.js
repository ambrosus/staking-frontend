import React from 'react';
import ReactNotifications from 'react-notifications-component';
import TopSection from './components/TopSectionContainer';
import SecondSection from './components/SecondSectionContainer';
import StakingSection from './components/StakingSectionContainer';
import RenderItems from '../../components/RenderItems';
import { useMobileDetect } from '../../hooks';
import { debugLog } from '../../utils/helpers';
const Faq = React.lazy(() => import('./components/FaqContainer'));
const LastSection = React.lazy(() =>
  import('./components/LastSectionContainer'),
);
const ThirdSection = React.lazy(() =>
  import('./components/ThirdSectionContainer'),
);
const loadSidebar = () => import('../../components/Sidebar');
const Sidebar = React.lazy(loadSidebar);

const Home = () => {
  const { isDesktop } = useMobileDetect();

  if (isDesktop === false) {
    debugLog('loadSidebar');
    loadSidebar();
  }
  return (
    <div className="home" id="home">
      <React.Suspense fallback={<div />}>
        {isDesktop === false ? (
          <Sidebar pageWrapId="root" outerContainerId="root" />
        ) : null}
      </React.Suspense>
      <ReactNotifications />
      <RenderItems>
        <TopSection />
        <SecondSection />
        <React.Suspense fallback={<div />}>
          <ThirdSection />
        </React.Suspense>
        <StakingSection />
        <React.Suspense fallback={<div />}>
          <Faq />
          <LastSection />
        </React.Suspense>
      </RenderItems>
    </div>
  );
};

export default Home;
