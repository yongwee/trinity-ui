
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/feeadjustment',
        name: 'feeSchedule/adjustment',
        component: () => import('pages/cpUser/FeeAdjustmentModule/FeeAdjustment.vue'),
      },
      {
        path: '/feeapproval',
        name: 'feeSchedule/approvallist',
        component: () => import('pages/cpUser/FeeAdjustmentModule/FeeApprovalList.vue'),
      },
      {
        path: '/feehistory',
        name: 'feeSchedule/history',
        component: () => import('pages/cpUser/FeeAdjustmentModule/FeeHistory.vue'),
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
