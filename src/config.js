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
  // FX token
  fxTokenOpenPosition: {
    titleKey: 'routes.fxTokenOpenPosition',
    name: 'fxToken/openPosition',
  },
  fxTokenOpenPositionCreateToken: {
    name: 'fxToken/openPosition/createToken',
  },
  fxTokenOpenPositionHistory: {
    name: 'fxToken/openPosition/history',
  },
  fxTokenClosedPosition: {
    titleKey: 'routes.fxTokenClosedPosition',
    name: 'fxToken/closedPosition',
  },

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

  // Investor Risk
  investorRisk: {
    titleKey: 'routes.investorRisk',
    name: 'investorRisk',
  },

  // SP Token
  spToken: {
    titleKey: 'routes.spToken',
    name: 'spToken/home',
  },
  spTokenCreateToken: {
    titleKey: 'routes.spTokenCreateToken',
    name: 'spToken/createToken',
  },

  // Trade enrichment module
  tradeEnrichment: {
    titleKey: 'routes.tradeEnrichment',
    name: 'tradeEnrichment',
  },
}

export const routeAccess = {
  [role.cro]: [routes.fxTokenOpenPosition, routes.fxTokenClosedPosition, routes.spToken, routes.investorRisk],
  [role.ops]: [],
  [role.market]: [],
  [role.creditRisk]: [],
  [role.counterParty]: [],
  [role.broker]: [routes.feeAdjustment, routes.feeApproval, routes.feeHistory],
  [role.esi]: [routes.feeApproval, routes.feeHistory, routes.tradeEnrichment],
}

// ======================== URI ========================
const host = 'http://stacspilot-720094188.ap-southeast-1.elb.amazonaws.com/v1';
// const host = 'http://localhost:4444';
const feeScheduleURL = host + '/feeSchedule';
const spTokenURL = host + '/SPToken';
const tradeEnrichURL = host + '/tradeEnrich';

export const URI = {
  // Fee schedule
  feeSchedule: feeScheduleURL,
  feeScheduleCompleted: feeScheduleURL + '/completed',
  feeScheduleApprove: feeScheduleURL + '/approve/{id}',
  feeScheduleDeny: feeScheduleURL + '/deny/{id}',
  feeSchedulePending: feeScheduleURL + '/pending',

  // SP Token
  spToken: spTokenURL,
  spTokenCreate: spTokenURL + '/issue',
  spTokenById: spTokenURL + '/issue/{id}',

  // Trade enrichment
  tradeEnrich: tradeEnrichURL,
}
