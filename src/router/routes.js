import { routes as routeConfig } from 'src/config';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // FX Token
      {
        path: '/fxtokenopenposition',
        component: () => import('pages/FxToken/FXTokenOpenPosition/Layout.vue'),
        children: [
          {
            path: '',
            name: routeConfig.fxTokenOpenPosition.name,
            component: () => import('pages/FxToken/FXTokenOpenPosition/Home.vue')
          },
          {
            path: 'createtoken',
            name: routeConfig.fxTokenOpenPositionCreateToken.name,
            component: () => import('pages/FxToken/FXTokenOpenPosition/CreateToken.vue')
          },
          {
            path: 'history',
            name: routeConfig.fxTokenOpenPositionHistory.name,
            component: () => import('pages/FxToken/FXTokenOpenPosition/History.vue')
          },
        ]
      },
      {
        path: '/fxtokenclosedposition',
        name: routeConfig.fxTokenClosedPosition.name,
        component: () => import('pages/FxToken/FXTokenClosedPosition.vue'),
      },

      // Investor Risk
      {
        path: '/investorrisk',
        name: routeConfig.investorRisk.name,
        component: () => import('pages/InvestorRisk/InvestorRisk.vue'),
      },

      // Fee Adjustment module
      {
        path: '/feeadjustment',
        name: routeConfig.feeAdjustment.name,
        component: () => import('pages/FeeAdjustmentModule/FeeAdjustment.vue'),
      },
      {
        path: '/feeapproval',
        name: routeConfig.feeApproval.name,
        component: () => import('pages/FeeAdjustmentModule/FeeApprovalList.vue'),
      },
      {
        path: '/feehistory',
        name: routeConfig.feeHistory.name,
        component: () => import('pages/FeeAdjustmentModule/FeeHistory.vue'),
      },

      // Trade Enrichment module
      {
        path: '/tradeenrichment',
        name: routeConfig.tradeEnrichment.name,
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
