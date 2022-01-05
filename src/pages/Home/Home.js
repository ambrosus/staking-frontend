/*eslint-disable*/
import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
// import { useInterval } from '../../hooks';

import Sidebar from '../../components/Sidebar';
import TopSection from './components/TopSectionContainer';
import SecondSection from './components/SecondSectionContainer';
import StakingSection from './components/StakingSectionContainer';
import RenderItems from '../../components/RenderItems';
import { connectorsByName } from 'config';

const Faq = React.lazy(() => import('./components/FaqContainer'));
const LastSection = React.lazy(() =>
  import('./components/LastSectionContainer'),
);
const ThirdSection = React.lazy(() =>
  import('./components/ThirdSectionContainer'),
);

const Home = () => {
  const { activate } = useWeb3React();
  // const [count, setCount] = useState(0);
  //
  // useInterval(
  //   () => {
  //     setCount((c) => c + 1);
  //     console.log('count', count);
  //   },
  //   2000,
  //   false,
  // );

  return (
    <div className="home" id="home">
      <Sidebar pageWrapId="root" outerContainerId="root" />
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
