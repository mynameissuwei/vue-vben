import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/partner',
  name: 'Partner',
  component: LAYOUT,
  redirect: '/partner/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '合作伙伴',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'PartnerPage',
      component: () => import('/@/views/partner/index.vue'),
      meta: {
        title: '合作伙伴',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
