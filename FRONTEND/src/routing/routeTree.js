import { rootRoute } from '../RootLayout';
import { homeRoute } from './homepage';
import { dashboardRoute } from './dashboard';
import { authRoute } from './auth.route';
import { aboutRoute } from './about.route';

export const routeTree = rootRoute.addChildren([
  homeRoute,
  dashboardRoute,
  authRoute,
  aboutRoute,
]);

