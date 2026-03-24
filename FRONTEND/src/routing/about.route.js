import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../RootLayout';
import { lazy, Suspense } from 'react';

const AboutPage = lazy(() => import('../pages/AboutPage'));

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => (
    <Suspense fallback={<div className="text-center font-bold text-2xl animate-pulse mt-10">LOADING...</div>}>
      <AboutPage />
    </Suspense>
  ),
});
