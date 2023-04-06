import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SONARR: AppRouteRecordRaw = {
  path: '/sonarr',
  name: 'sonarr',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.sonarr',
    requiresAuth: true,
    icon: 'icon-live-broadcast',
    order: 1,
  },
  children: [
    {
      path: '/sonarr/title',
      name: 'sonarrTitle',
      component: () => import('@/views/sonarr/title/index.vue'),
      meta: {
        locale: 'menu.sonarr.title',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/sonarr/tmdb',
      name: 'sonarrTmdb',
      component: () => import('@/views/tmdb/title/index.vue'),
      meta: {
        locale: 'menu.sonarr.tmdb',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/sonarr/rule',
      name: 'sonarrRule',
      component: () => import('@/views/sonarr/rule/index.vue'),
      meta: {
        locale: 'menu.sonarr.rule',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/sonarr/example',
      name: 'sonarrExample',
      component: () => import('@/views/sonarr/example/index.vue'),
      meta: {
        locale: 'menu.sonarr.example',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SONARR;
