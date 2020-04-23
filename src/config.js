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
    navBarTitleKey: 'routes.fxTokenOpenPosition', // note: i18n key
    titleKey: 'fxTokenOpenPosition.title', // note: i18n key
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
  fxTokenDataEntry: {
    navBarTitleKey: 'routes.fxTokenDataEntry',
    titleKey: 'fxTokenDataEntry.title',
    name: 'fxToken/dataEntry/home',
  },
  fxTokenDataEntryEnterSpotPrice: {
    navBarTitleKey: 'routes.fxTokenDataEntry',
    titleKey: 'fxTokenDataEntry.enterSpotPriceTitle',
    name: 'fxToken/dataEntry/enterSpotPrice',
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

  // Base Cash Token
  baseCashToken: {
    navBarTitleKey: 'routes.baseCashToken',
    titleKey: 'baseCashToken.title',
    name: 'baseCashToken/home',
  },
  baseCashTokenCreateToken: {
    navBarTitleKey: 'routes.baseCashTokenCreateToken',
    titleKey: 'baseCashToken.createTokenTitle',
    name: 'baseCashToken/createToken',
  },
  baseCashTokenHistory: {
    navBarTitleKey: 'routes.baseCashToken',
    titleKey: 'baseCashToken.historyTitle',
    name: 'baseCashToken/history',
  },

  // Risk module
  riskModule: {
    navBarTitleKey: 'routes.riskModule',
    titleKey: 'riskModule.title',
    name: 'riskModule/home',
  },

  // FX-Cash Trade
  executeFxCashTrade: {
    navBarTitleKey: 'routes.ExecuteFxCashTrade',
    titleKey: 'fxCashTrade.executeTitle',
    name: 'fxCashTrade/execute',
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
  [role.ops]: [routes.fxTokenOpenPosition, routes.fxTokenClosedPosition, routes.spToken, routes.baseCashToken],
  [role.market]: [routes.fxTokenOpenPosition, routes.fxTokenClosedPosition, routes.executeFxCashTrade],
  [role.creditRisk]: [routes.riskModule, routes.fxTokenClosedPosition, routes.executeFxCashTrade],
  [role.counterParty]: [routes.fxTokenDataEntry, routes.fxTokenOpenPosition, routes.fxTokenClosedPosition],
  [role.broker]: [routes.feeAdjustment, routes.feeApproval, routes.feeHistory],
  [role.esi]: [routes.feeApproval, routes.feeHistory, routes.tradeEnrichment],
}

// ======================== URI ========================
const host = 'https://mmglnzhrm6.execute-api.ap-southeast-1.amazonaws.com/dev/v1';
// const host = 'http://localhost:4444/v1';

const feeScheduleURL = host + '/feeSchedule';
const spTokenURL = host + '/SPToken';
const riskURL = host + '/Risk'
const tradeEnrichURL = host + '/tradeEnrich';
const brokerURL = host + '/broker';
const baseCashTokenURL = host + '/baseCashToken';
const tradesURL = host + '/Trades';

export const URI = {
  // Fee schedule
  feeSchedule: feeScheduleURL,
  feeScheduleCompleted: feeScheduleURL + '/completed',
  feeScheduleLatest: feeScheduleURL + '/latest/{brokerId}',
  feeScheduleLatestDownload: feeScheduleURL + '/latest/download/{brokerId}',
  feeScheduleApprove: feeScheduleURL + '/approve/{id}',
  feeScheduleReject: feeScheduleURL + '/reject/{id}',
  feeSchedulePending: feeScheduleURL + '/pending',
  feeSchedulePendingIndividual: feeScheduleURL + '/pending/{id}',

  // Broker
  broker: brokerURL,
  brokerByCode: brokerURL + '/{brokerCode}',

  // SP Token
  spToken: spTokenURL,
  spTokenCreate: spTokenURL + '/issue',
  spTokenById: spTokenURL + '/issue/{id}',

  // Risk
  riskInvestor: riskURL + '/investors',
  riskManage: riskURL + '/manage',

  // Base Cash Token
  baseCashToken: baseCashTokenURL,
  baseCashTokenById: baseCashTokenURL + '/{id}',
  baseCashTokenIssue: baseCashTokenURL + '/issue',
  baseCashTokenIssueById: baseCashTokenURL + '/issue/{id}',
  baseCashTokenTransferHistory: baseCashTokenURL + '/transferHistory',
  baseCashTokenTransferHistoryById: baseCashTokenURL + '/transferHistory/{id}',
  baseCashTokenTransfer: baseCashTokenURL + '/transfer',

  // Trades
  tradesExecute: tradesURL + '/execute/{id}',
  tradesCancel: tradesURL + '/cancel/{id}',
  tradesCompleted: tradesURL + '/completed',
  tradesPending: tradesURL + '/pending',

  // Trade enrichment
  tradeEnrich: tradeEnrichURL,
}
