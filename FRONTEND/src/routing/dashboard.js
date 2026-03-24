import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from '../RootLayout';
import { store } from '../store/slice/store';
import { lazy, Suspense } from 'react';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));

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
  component: () => (
    <Suspense fallback={<div className="text-center font-bold text-2xl animate-pulse mt-10">LOADING...</div>}>
      <DashboardPage />
    </Suspense>
  ),
});
