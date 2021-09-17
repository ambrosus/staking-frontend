import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import { store as alertStore } from 'react-notifications-component';

import storageService from '../../services/storage.service';
import Home from '../../pages/Home';
import Layout from '../../layouts/Layout';
import Stacking from '../../pages/Stacking';
import appStore from '../../store/app.store';
import Footer from '../../layouts/Footer';
import InstallMetamaskAlert from '../../pages/Home/components/InstallMetamaskAlert/InstallMetamaskAlert';

const RenderRoutes = observer(() => {
  useEffect(() => {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      });
      setTimeout(handleEthereum, 3000); // 3 seconds
    }

    function handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        console.log('Ethereum successfully detected!');
        // Access the decentralized web!
      } else {
        alertStore.addNotification({
          content: InstallMetamaskAlert, // 'default', 'success', 'info', 'warning'
          container: 'bottom-right', // where to position the notifications
          animationIn: ['animated', 'fadeIn'], // animate.css classes that's applied
          animationOut: ['animated', 'fadeOut'], // animate.css classes that's applied
          dismiss: {
            duration: 3000,
          },
        });
      }
    }
    if (!storageService.get('auth')) {
      appStore.setAuth(false);
    } else {
      appStore.setAuth(true);
    }
    return <div>Loading...</div>;
  }, [appStore.auth, storageService.get('auth')]);
  return !appStore.auth ? (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <>
            <Home />
            <Footer />
          </>
        )}
      />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route
        path="/stacking"
        exact
        render={() => (
          <Layout>
            <Stacking />
          </Layout>
        )}
      />
      <Redirect to="/stacking" />
    </Switch>
  );
});

export default RenderRoutes;
