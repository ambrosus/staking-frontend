import React from 'react';
import RenderRoutes from './components/RenderRoutes';
import routes from './routes';
import './styles/Main.scss';

const Main = () => <RenderRoutes routes={routes} />;

export default Main;
