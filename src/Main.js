import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { store as alertStore } from 'react-notifications-component';

import RenderRoutes from './components/RenderRoutes';
import storageService from './services/storage.service';
import appStore from './store/app.store';

import './styles/Main.scss';
import InstallMetamaskAlert from './pages/Home/components/InstallMetamaskAlert';

const Main = observer(() => {
  const { ethereum } = window;
  useEffect(() => {
    if (ethereum && ethereum.isMetaMask) {
      ethereum.on('accountsChanged', () => window.location.reload());
      ethereum.on('chainChanged', () => window.location.reload());
      ethereum.on('close', () => window.location.reload());
      ethereum.on('networkChanged', () => window.location.reload());
    } else {
      alertStore.addNotification({
        content: InstallMetamaskAlert,
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
      });
    }
    if (!storageService.get('auth')) {
      appStore.setAuth(false);
    } else {
      appStore.setAuth(true);
    }
    return <div>Loading...</div>;
  }, [appStore.auth, storageService, ethereum]);
  return <RenderRoutes />;
});

export default Main;
