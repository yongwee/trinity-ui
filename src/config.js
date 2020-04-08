// ======================== Roles ========================
export const role = {
  cro: 'cro',
  ops: 'ops',
  market: 'market',
  creditRisk: 'creditRisk',
  counterParty: 'counterParty',
  broker: 'broker',
  esi: 'esi',
}

// ======================== Routes ========================
export const routes = {
  // Fee schedule module
  feeAdjustment: {
    titleKey: 'routes.feeAdjustment',
    name: 'feeSchedule/adjustment',
  },
  feeApproval: {
    titleKey: 'routes.feeApproval',
    name: 'feeSchedule/approval',
  },
  feeHistory: {
    titleKey: 'routes.feeHistory',
    name: 'feeSchedule/history',
  },

  // Trade enrichment module
  tradeEnrichment: {
    titleKey: 'routes.tradeEnrichment',
    name: 'tradeEnrichment',
  },
}

export const routeAccess = {
  [role.cro]: [],
  [role.ops]: [],
  [role.market]: [],
  [role.creditRisk]: [],
  [role.counterParty]: [],
  [role.broker]: [routes.feeAdjustment, routes.feeApproval, routes.feeHistory],
  [role.esi]: [routes.tradeEnrichment],
}

// ======================== URI ========================
// const host = 'http://stacspilot-720094188.ap-southeast-1.elb.amazonaws.com';
const host = 'http://localhost:4444';
const feeScheduleURL = host + '/feeSchedule';
const tradeEnrichURL = host + '/tradeEnrich';

export const URI = {
  // Fee schedule
  feeSchedule: feeScheduleURL,
  feeScheduleCompleted: feeScheduleURL + '/completed',
  feeScheduleApprove: feeScheduleURL + '/approve/{id}',
  feeScheduleDeny: feeScheduleURL + '/deny/{id}',
  feeSchedulePending: feeScheduleURL + '/pending',

  // Trade enrichment
  tradeEnrich: tradeEnrichURL,
}
