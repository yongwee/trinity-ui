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
    navBarTitleKey: 'routes.fxTokenOpenPosition',
    titleKey: 'fxTokenOpenPosition.title',
    name: 'fxToken/openPosition',
  },
  fxTokenOpenPositionCreateToken: {
    name: 'fxToken/openPosition/createToken',
    titleKey: 'fxTokenOpenPosition.createTokenTitle',
  },
  fxTokenOpenPositionHistory: {
    name: 'fxToken/openPosition/history',
    titleKey: 'fxTokenOpenPosition.historyTitle',
  },
  fxTokenClosedPosition: {
    navBarTitleKey: 'routes.fxTokenClosedPosition',
    titleKey: 'fxTokenClosedPosition.title',
    name: 'fxToken/closedPosition',
  },

  // Fee schedule module
  feeAdjustment: {
    navBarTitleKey: 'routes.feeAdjustment',
    titleKey: 'feeAdjustment.title',
    name: 'feeSchedule/adjustment',
  },
  feeApproval: {
    navBarTitleKey: 'routes.feeApproval',
    titleKey: 'feeApprovalList.title',
    name: 'feeSchedule/approval',
  },
  feeHistory: {
    navBarTitleKey: 'routes.feeHistory',
    titleKey: 'feeHistory.title',
    name: 'feeSchedule/history',
  },

  // Investor Risk
  investorRisk: {
    navBarTitleKey: 'routes.investorRisk',
    titleKey: 'investorRisk.title',
    name: 'investorRisk',
  },

  // SP Token
  spToken: {
    navBarTitleKey: 'routes.spToken',
    titleKey: 'spToken.title',
    name: 'spToken/home',
  },
  spTokenCreateToken: {
    navBarTitleKey: 'routes.spTokenCreateToken',
    titleKey: 'spToken.createTokenTitle',
    name: 'spToken/createToken',
  },

  // Trade enrichment module
  tradeEnrichment: {
    navBarTitleKey: 'routes.tradeEnrichment',
    titleKey: 'tradeEnrichment.title',
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
const brokerURL = host + '/broker';

export const URI = {
  // Fee schedule
  feeSchedule: feeScheduleURL,
  feeScheduleCompleted: feeScheduleURL + '/completed',
  feeScheduleApprove: feeScheduleURL + '/approve/{id}',
  feeScheduleDeny: feeScheduleURL + '/deny/{id}',
  feeSchedulePending: feeScheduleURL + '/pending',
  feeSchedulePendingIndividual: feeScheduleURL + '/pending/{id}',

  // Broker
  broker: brokerURL,

  // SP Token
  spToken: spTokenURL,
  spTokenCreate: spTokenURL + '/issue',
  spTokenById: spTokenURL + '/issue/{id}',

  // Trade enrichment
  tradeEnrich: tradeEnrichURL,
}
