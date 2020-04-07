
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // Fee Adjustment module
      {
        path: '/feeadjustment',
        name: 'feeSchedule/adjustment',
        component: () => import('pages/FeeAdjustmentModule/FeeAdjustment.vue'),
      },
      {
        path: '/feeapproval',
        name: 'feeSchedule/approvallist',
        component: () => import('pages/FeeAdjustmentModule/FeeApprovalList.vue'),
      },
      {
        path: '/feehistory',
        name: 'feeSchedule/history',
        component: () => import('pages/FeeAdjustmentModule/FeeHistory.vue'),
      },

      // Trade Enrichment module
      {
        path: '/tradeenrichment',
        name: 'tradeEnrichment',
        component: () => import('pages/TradeEnrichmentModule/TradeEnrichment.vue'),
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
