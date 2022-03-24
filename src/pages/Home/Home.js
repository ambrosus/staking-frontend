import React from 'react';

import TopSection from './components/TopSectionContainer';
import SecondSection from './components/SecondSectionContainer';
import StakingSection from './components/StakingSectionContainer';
import RenderItems from '../../components/RenderItems';

const Faq = React.lazy(() => import('./components/FaqContainer'));
const LastSection = React.lazy(() =>
  import('./components/LastSectionContainer'),
);
const ThirdSection = React.lazy(() =>
  import('./components/ThirdSectionContainer'),
);

const Home = () => (
  <div className="home" id="home">
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

export default Home;
