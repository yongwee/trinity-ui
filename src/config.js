// ======================== Auth Tokens ========================
const authTokenExpiration = 15 * 60 * 1000; // 15 mins

export const authTokens = {
  key: 'tokens', // local storage item key
  expiration: authTokenExpiration,
  expirationWarning: authTokenExpiration - 1 * 60 * 1000,
}


// ======================== Roles ========================
export const role = {
  cro: 'cro',
  ops: 'ops',
  market: 'market',
  creditRisk: 'creditrisk',
  counterParty: 'counterparty',
  broker: 'exbroker',
  esi: 'esi',
}


// ======================== Routes ========================
export const routes = {
  // Login
  login: {
    name: 'login',
  },

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

export const pageNameToRoute = {
  'feeadjustment': routes.feeAdjustment,
  'feehistory': routes.feeHistory,
  'tradeenrich': routes.tradeEnrichment,
  'feeapproval': routes.feeApproval,
}

// ======================== URI ========================
const host = 'https://mmglnzhrm6.execute-api.ap-southeast-1.amazonaws.com/dev/v1';
// const host = 'http://localhost:4444/v1';

//const loginHost = 'http://trinity-auth.ap-southeast-1.elasticbeanstalk.com';
const loginHost = 'https://lpco5zj9k6.execute-api.ap-southeast-1.amazonaws.com/dev';

const feeScheduleURL = host + '/feeSchedule';
const spTokenURL = host + '/SPToken';
const riskURL = host + '/Risk'
const tradeEnrichURL = host + '/tradeEnrich';
const brokerURL = host + '/broker';
const baseCashTokenURL = host + '/baseCashToken';
const tradesURL = host + '/Trades';
const fxTokenURL = host + '/FXToken';


export const URI = {
  // Login
  login: loginHost + '/auth',
  refreshToken: loginHost + '/refreshToken',

  // User
  userInfo: host + '/userinfo',

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
  spTokenIssue: spTokenURL + '/issue',
  spTokenByTokenCode: spTokenURL + '/{tokenCode}',

  // Risk
  riskInvestor: riskURL + '/investors',
  riskManage: riskURL + '/manage',

  // Base Cash Token
  baseCashToken: baseCashTokenURL,
  baseCashTokenByTokenCode: baseCashTokenURL + '/{tokenCode}',
  baseCashTokenIssue: baseCashTokenURL + '/issue',
  baseCashTokenIssueByTokenCode: baseCashTokenURL + '/issue/{tokenCode}',
  baseCashTokenTransferHistory: baseCashTokenURL + '/transferHistory',
  baseCashTokenTransferHistoryByTokenCode: baseCashTokenURL + '/transferHistory/{tokenCode}',
  baseCashTokenTransfer: baseCashTokenURL + '/transfer',

  // Trades
  tradesExecute: tradesURL + '/execute/{id}',
  tradesCancel: tradesURL + '/cancel/{id}',
  tradesCompleted: tradesURL + '/completed',
  tradesPending: tradesURL + '/pending',

  // Trade enrichment
  tradeEnrich: tradeEnrichURL,

  // FX Token
  fxTokenClosed: fxTokenURL + '/closed',
  fxTokenClosedByTokenCode: fxTokenURL + '/closed/{tokenCode}',
  fxTokenIssue: fxTokenURL + '/issue',
  fxTokenIssueByTokenCode: fxTokenURL + '/issue/{tokenCode}',
  fxTokenNavHistory: fxTokenURL + '/navHist',
  fxTokenNavHistoryClosed: fxTokenURL + '/navHist/closed',
  fxTokenNavHistoryOpen: fxTokenURL + '/navHist/open',
  fxTokenNavHistoryByTokenCode: fxTokenURL + '/navHist/{tokenCode}',
  fxTokenOpen: fxTokenURL + '/open',
  fxTokenOpenByTokenCode: fxTokenURL + '/open/{tokenCode}',
  fxTokenTxHistoryClosed: fxTokenURL + '/txHist/closed',
  fxTokenTxHistoryOpen: fxTokenURL + '/txHist/open',
}
