import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import storageService from './services/storage.service';
import appStore from './store/app.store';

import './styles/Main.scss';
import RenderRoutes from './components/RenderRoutes';
import { ethereum } from './utils/constants';

const Main = observer(() => {
  const handleChange = () => {
    window.location.reload();
  };
  useEffect(() => {
    if (ethereum) {
      ethereum.on('accountsChanged', handleChange);
      ethereum.on('chainChanged', handleChange);
    }
    if (storageService.get('auth')) {
      appStore.setAuth(true);
    }
    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('chainChanged', handleChange);
        ethereum.removeListener('accountsChanged', handleChange);
      }
    };
  }, [appStore.auth, storageService, ethereum]);

  return <RenderRoutes />;
});

export default Main;
