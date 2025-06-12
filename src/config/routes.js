import HomePage from '@/components/pages/HomePage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routeConfig = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
component: HomePage
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '*',
component: NotFoundPage
  }
};

export const routes = Object.values(routeConfig);