import React from 'react';
import {observer} from 'mobx-react-lite';

import RenderRoutes from './components/RenderRoutes';
import './styles/Main.scss';

const Main = observer(() => <RenderRoutes />);

export default Main;
