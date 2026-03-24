import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '../RootLayout';
import DashboardPage from '../pages/DashboardPage';
import { store } from '../store/slice/store';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    if (!store.getState().auth.isAuthenticated) {
      throw redirect({
        to: '/auth',
      })
    }
  },
  component: DashboardPage,
});
