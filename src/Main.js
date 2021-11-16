import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import storageService from './services/storage.service';
import appStore from './store/app.store';

import './styles/Main.scss';
import RenderRoutes from './components/RenderRoutes';
import { ethereum } from './utils/constants';

const Main = observer(() => {
  useEffect(() => {
    if (ethereum) {
      ethereum.on('accountsChanged', () => window.location.reload());
      ethereum.on('chainChanged', () => window.location.reload());
    }
    if (storageService.get('auth')) {
      appStore.setAuth(true);
    }
    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('chainChanged', () => window.location.reload());
        ethereum.removeListener('accountsChanged', () =>
          window.location.reload(),
        );
      }
    };
  }, [appStore.auth, storageService, ethereum]);

  return <RenderRoutes />;
});

export default Main;
