import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const RADARR: AppRouteRecordRaw = {
  path: '/radarr',
  name: 'radarr',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.radarr',
    requiresAuth: true,
    icon: 'icon-play-circle',
    order: 2,
  },
  children: [
    {
      path: '/radarr/title',
      name: 'radarrTitle',
      component: () => import('@/views/radarr/title/index.vue'),
      meta: {
        locale: 'menu.radarr.title',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/radarr/rule',
      name: 'radarrRule',
      component: () => import('@/views/radarr/rule/index.vue'),
      meta: {
        locale: 'menu.radarr.rule',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/radarr/example',
      name: 'radarrExample',
      component: () => import('@/views/radarr/example/index.vue'),
      meta: {
        locale: 'menu.radarr.example',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default RADARR;
