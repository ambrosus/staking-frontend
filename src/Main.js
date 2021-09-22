import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import RenderRoutes from './components/RenderRoutes';
import storageService from './services/storage.service';
import appStore from './store/app.store';

import './styles/Main.scss';

const Main = observer(() => {
  useEffect(() => {
    if (!storageService.get('auth')) {
      appStore.setAuth(false);
    } else {
      appStore.setAuth(true);
    }
    return <div>Loading...</div>;
  }, [appStore.auth, storageService]);
  return <RenderRoutes />;
});

export default Main;
