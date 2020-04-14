import { routes as routeConfig } from 'src/config';
import ProxyLayout from 'src/components/ProxyLayout';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // FX Token
      {
        path: '/fxtokenopenposition',
        component: ProxyLayout,
        children: [
          {
            path: '',
            name: routeConfig.fxTokenOpenPosition.name,
            meta: {
              titleKey: routeConfig.fxTokenOpenPosition.titleKey,
            },
            component: () => import('pages/FxToken/FXTokenOpenPosition/Home.vue')
          },
          {
            path: 'createtoken',
            name: routeConfig.fxTokenOpenPositionCreateToken.name,
            meta: {
              titleKey: routeConfig.fxTokenOpenPositionCreateToken.titleKey,
            },
            component: () => import('pages/FxToken/FXTokenOpenPosition/CreateToken.vue')
          },
          {
            path: 'history',
            name: routeConfig.fxTokenOpenPositionHistory.name,
            meta: {
              titleKey: routeConfig.fxTokenOpenPositionHistory.titleKey,
            },
            component: () => import('pages/FxToken/FXTokenOpenPosition/History.vue')
          },
        ],
      },
      {
        path: '/fxtokenclosedposition',
        name: routeConfig.fxTokenClosedPosition.name,
        meta: {
          titleKey: routeConfig.fxTokenClosedPosition.titleKey,
        },
        component: () => import('pages/FxToken/FXTokenClosedPosition.vue'),
      },

      // SP Token
      {
        path: '/sptoken',
        component: ProxyLayout,
        children: [
          {
            path: '',
            name: routeConfig.spToken.name,
            meta: {
              titleKey: routeConfig.spToken.titleKey,
            },
            component: () => import('pages/SPToken/Home.vue')
          },
          {
            path: 'createtoken',
            name: routeConfig.spTokenCreateToken.name,
            meta: {
              titleKey: routeConfig.spTokenCreateToken.titleKey,
            },
            component: () => import('pages/SPToken/CreateToken.vue')
          },
        ],
      },

      // Investor Risk
      {
        path: '/investorrisk',
        name: routeConfig.investorRisk.name,
        meta: {
          titleKey: routeConfig.investorRisk.titleKey,
        },
        component: () => import('pages/InvestorRisk/InvestorRisk.vue'),
      },

      // Fee Adjustment module
      {
        path: '/feeadjustment',
        name: routeConfig.feeAdjustment.name,
        meta: {
          titleKey: routeConfig.feeAdjustment.titleKey,
        },
        component: () => import('pages/FeeAdjustmentModule/FeeAdjustment.vue'),
      },
      {
        path: '/feeapproval',
        name: routeConfig.feeApproval.name,
        meta: {
          titleKey: routeConfig.feeApproval.titleKey,
        },
        component: () => import('pages/FeeAdjustmentModule/FeeApprovalList.vue'),
      },
      {
        path: '/feehistory',
        name: routeConfig.feeHistory.name,
        meta: {
          titleKey: routeConfig.feeHistory.titleKey,
        },
        component: () => import('pages/FeeAdjustmentModule/FeeHistory.vue'),
      },

      // Trade Enrichment module
      {
        path: '/tradeenrichment',
        name: routeConfig.tradeEnrichment.name,
        meta: {
          titleKey: routeConfig.tradeEnrichment.titleKey,
        },
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
