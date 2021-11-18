import React from 'react';
import { observer } from 'mobx-react-lite';

import './styles/Main.scss';
import RenderRoutes from './components/RenderRoutes';

const Main = observer(() => <RenderRoutes />);

export default Main;
