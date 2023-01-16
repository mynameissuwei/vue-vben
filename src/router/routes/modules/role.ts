import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/role',
  name: 'Role',
  component: LAYOUT,
  redirect: '/role/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '角色权限',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'RolePage',
      component: () => import('/@/views/role/index.vue'),
      meta: {
        title: '角色权限',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
