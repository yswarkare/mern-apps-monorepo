import { lazy } from 'react';

const DefaultPage = lazy(() => import('../layouts/default'));
const HomePage = lazy(() => import('../scenes/homePage'));
const LoginPage = lazy(() => import('../scenes/loginPage'));
const ProfilePage = lazy(() => import('../scenes/profilePage'));

const routes = [{
	path: '/',
	element: <DefaultPage />,
	children: [{
    path: '',
    element: <HomePage />
  },{
    path: '/login',
    element: <LoginPage />
  },{
    path: '/profile/:userId',
    element: <ProfilePage />
  }],
}];

export default routes;
