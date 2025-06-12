import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export const routeConfig = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    component: Home
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '*',
    component: NotFound
  }
};

export const routes = Object.values(routeConfig);