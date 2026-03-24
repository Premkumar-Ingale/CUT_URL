import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '../RootLayout';
import { store } from '../store/slice/store';
import DashboardPage from '../pages/DashboardPage';

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
