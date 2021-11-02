import React, { useEffect, Suspense } from 'react';
import { observer } from 'mobx-react-lite';

import storageService from './services/storage.service';
import appStore from './store/app.store';

import './styles/Main.scss';
import RenderRoutes from './components/RenderRoutes';
import { ethereum } from './utils/constants';

const Main = observer(() => {
  useEffect(async () => {
    if (ethereum && ethereum.isMetaMask) {
      ethereum.on('accountsChanged', () => window.location.reload());
      ethereum.on('chainChanged', () => window.location.reload());
    }

    if (!storageService.get('auth')) {
      appStore.setAuth(false);
    } else {
      appStore.setAuth(true);
    }
    return <div>Loading...</div>;
  }, [appStore.auth, storageService, ethereum]);

  return (
    <Suspense fallback="Loading...">
      <RenderRoutes />
    </Suspense>
  );
});

export default Main;
