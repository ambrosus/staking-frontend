import React from 'react';
import Home from './pages/Home';
import Stacking from './pages/Stacking';
import Layout from './layouts/Layout';

const routes = [
  {
    path: '/',
    key: 'HOMEPAGE',
    exact: true,
    component: () => <Home />,
  },
  {
    path: '/stacking',
    key: 'STACKING_PAGE',
    exact: true,
    component: () => (
      <Layout>
        <Stacking />
      </Layout>
    ),
  },
];

export default routes;
