export default {
  // Route titles
  routes: {
    // FX Token
    fxTokenOpenPosition: 'FX Token Open Position',
    fxTokenClosedPosition: 'FX Token Closed Position',
    fxTokenDataEntry: 'FX Token Data Entry',

    // Fee Adjustment module
    feeAdjustment: 'Fee Adjustment',
    feeApproval: 'Fee Approval',
    feeHistory: 'Fee History',

    // Investor risk
    investorRisk: 'Investor Risk',

    // SP Token
    spToken: 'SP Token',

    // Base Cash Token
    baseCashToken: 'Base Cash Token',

    // Risk Module
    riskModule: 'Risk Module',

    // Fx Cash Trade
    ExecuteFxCashTrade: 'Execute FX-Cash Trade',

    // Trade enrichment module
    tradeEnrichment: 'Trade Enrichment',
  },

  // App
  userProfileBtn: {
    welcomeMessage: 'Welcome, {name}',
  },

  sessionExpirationHelper: {
    sessionExpiringTitle: 'Session expiring soon',
    sessionExpiringMessage: 'Your session is about to expire, would you like to extend it?\nYou will lose any unsaved changes if you choose not to extend your session.',

    sessionExpiredTitle: 'Session expired',
    sessionExpiredMessage: 'Your session has expired. Please log out and log back in to continue.',

    sessionExtendedTitle: 'Session extended',
    sessionExtendedMessage: 'Your session has been extended.',

    sessionNotExtendedTitle: 'Session not extended',
    sessionNotExtendedMessage: 'Your request for session extension has failed. Please try again, or log out and log back in.',

    extendSessionBtnLabel: 'Extend Session',
    logOutBtnLabel: 'Log Out',
  },

  // Login
  login: {
    usernameInputLabel: 'Username',
    passwordInputLabel: 'Password',
    loginBtnLabel: 'Login',

    usernameInputErrorLabel: 'Username is required',
    passwordInputErrorLabel: 'Password is required',

    invalidCredentialsErrorLabel: 'Invalid username or password',
    serverErrorLabel: 'Something went wrong. Please try again later',
  },

  // FX Token
  fxTokenOpenPosition: {
    title: 'FX Token Open Position',

    // Home
    createToken: 'Create FX Token',
    search: 'Search',
    tokenSelectLabel: 'FX Token Code',

    // Create token
    createTokenTitle: 'Create FX Token',
    createTokenSectionHeader: 'Create FX Token',

    // History
    historyTitle: 'History',
    txHistoryTab: 'Transaction History',
    navHistoryTab: 'NAV History',
  },

  fxTokenClosedPosition: {
    title: 'FX Token Closed Position',

    // History
    historyTitle: 'History',
    txHistoryTab: 'Transaction History',
    navHistoryTab: 'NAV History',
  },

  fxTokenDataEntry: {
    title: 'FX Token Data Entry',

    enterSpotPriceBtnLabel: 'Enter Spot Price',

    searchLabel: 'Search',

    enterSpotPriceTitle: 'Enter Spot Price',
    enterSpotPriceFxTokenInputLabel: 'FX Token',
    enterSpotPricePriceInputLabel: 'Price',

    enterSpotPriceFxTokenInputError: 'Please select a FX token',
    enterSpotPricePriceInputError: 'Please provide a value for price',
  },

  // Investor Risk
  investorRisk: {
    title: 'Investor Risk',

    selectLabel: 'Investor',
  },

  // SP Token
  spToken: {
    title: 'SP Token',

    // Home
    createToken: 'Create SP Token',
    selectLabel: 'SP Token Code',

    // Create Token
    createTokenTitle: 'Create SP Token',

    createTokenCodeInput: 'Token Code',
    createTokenClientIdInput: 'Client ID',
    createTokenProductTypeInput: 'Product Type',
    createTokenUnderlyingInput: 'Underlying',
    createTokenNotionalAmountPerFixingInput: 'Notional Amount Per Fixing',
    createTokenIndicativeSpotPriceInput: 'Indicative Spot Price',
    createTokenStrikeRateInput: 'Strike Rate',
    createTokenKnockOutPriceInput: 'Knock Out Price',
    createTokenTenorInput: 'Tenor',
    createTokenFixingPageInput: 'Fixing Page',
    createTokenNoOfFixingInput: 'No. of Fixing',
    createTokenCounterpartyIdInput: 'Counterparty ID',
    createTokenOpsIdInput: 'Token Ops ID',

    createTokenTenorInputSuffix: 'year(s)',

    createTokenCodeInputError: 'Please provide a value for token code',
    createTokenClientIdInputError: 'Please provide a value for client ID',
    createTokenProductTypeInputError: 'Please provide a value for product type',
    createTokenUnderlyingInputError: 'Please provide a value for underlying',
    createTokenNotionalAmountPerFixingInputError: 'Please provide a value for notional amount per fixing',
    createTokenIndicativeSpotPriceInputError: 'Please provide a value for indicative spot price',
    createTokenStrikeRateInputError: 'Please provide a value for strike rate',
    createTokenKnockOutPriceInputError: 'Please provide a value for knock out price',
    createTokenTenorInputError: 'Please provide a value for tenor',
    createTokenFixingPageInputError: 'Please provide a value for fixing page',
    createTokenNoOfFixingInputError: 'Please provide a value for no. of fixing',
    createTokenCounterpartyIdInputError: 'Please provide a value for counterparty ID',
    createTokenOpsIdInputError: 'Please provide a value for token ops id',

    // View Token
    viewTokenHeader: 'View {tokenName}',
  },

  //Base Cash Token
  baseCashToken: {
    title: 'Base Cash Token',

    // Home
    createToken: 'Mint',
    transferToken: 'Transfer',
    selectLabel: 'Base Case Code',

    viewTransferHistoryBtn: 'View Transfer History',
    viewDetailsBtn: 'View Details',

    // Create Token
    createTokenTitle: 'Create Base Cash Token',
    basicInformationSubSectionHeader: 'Basic Information',
    createTokenTypeInput: 'Token Type',
    createTokenUnderlyingInput: 'Underlying',
    createTokenTokenCodeInput: 'Token Code',
    createTokenCurrencyCodeInput: 'Currency Code',
    createTokenAmountInput: 'Amount',

    issuanceInformationSubSectionHeader: 'Issuance Information',
    createTokenIssuerIdInput: 'Issuer ID',
    createTokenIssuingAddressInput: 'Issuing Address',
    createTokenSupportingDocumentsHeader: 'Supporting Documents',

    uploaderLabel: 'Upload Supporting Documents',
    uploaderText: 'Drop supporting document files here, or click to browse.',

    createTokenTypeError: 'Please select a token type',
    createTokenUnderlyingError: 'Please provide an underlying',
    createTokenTokenCodeError: 'Please provide a token code',
    createTokenCurrencyCodeError: 'Please provide a currency code',
    createTokenAmountError: 'Please provide an amount',

    createTokenIssuerIdError: 'Please provide an issuer ID',
    createTokenIssuingAddressError: 'Please proivde an issuing address',
    uploaderError: 'Please select a file',

    // View Token
    viewTokenHeader: 'View Base Cash Token {tokenName}',
    viewTokenName: 'Token Name',
    viewTokenDescription: 'Description',
    viewTokenAmount: 'Amount',


    // Transfer Token
    transferTokenHeader: 'Transfer Base Cash Token',
    transferTokenAmount: 'Amount',
    transferTokenInvestorAccount: 'Investor Account',
    transferTokenTransfer: 'Transfer',

    // History
    historyTitle: '{tokenCode} Transfer History',
  },

  // FX Cash Trade
  fxCashTrade: {
    executeTitle: 'Execute FX-Cash Trade',

    completedTradesTab: 'Completed Trades',
    pendingTradesTab: 'Pending Trades',

    executeTradeBtnLabel: 'Execute Trade',
    cancelTradeBtnLabel: 'Cancel Trade',

    executeTradeConfirmTitle: 'Execute trade',
    cancelTradeConfirmTitle: 'Cancel trade',
    executeTradeConfirmLabel: 'Are you sure you wish to execute trade id {id}?',
    cancelTradeConfirmLabel: 'Are you sure you wish to cancel trade id {id}?',

    executeSuccessLabel: 'Trade has been executed successfully',
    cancelSuccessLabel: 'Trade has been cancelled successfully',
  },

  // Risk Module
  riskModule: {
    title: 'Risk Module',

    totalPortfolioRiskThresholdLabel: 'Total Portfolio Risk Threshold',
    availableFiatCashLabel: 'Available Fiat Cash',
    navBaseCashTokensLabel: 'NAV of all Base Cash Tokens',
    navSPTokensLabel: 'NAV of all SP Tokens',
  },

  // Fee Adjustment module
  feeAdjustment: {
    title: 'Fee Adjustment',

    clientSelectLabel: 'Client',
    cpBrokerSelectLabel: 'Counterparty Broker',
    exBrokerSelectLabel: 'Executing Broker',
    marketSelectLabel: 'Market',

    clientSelectError: 'Please select a client',
    brokerSelectError: 'Please select a broker',
    marketSelectError: 'Please select a market',

    importAsCsv: 'Import fee schedule as CSV',
    importAsCSV: 'Import as CSV',
    uploaderText: 'Drop CSV file here, or click to browse.',
    uploaderError: 'Please select a CSV file',
    successLabel: 'The schedule has been uploaded and is awaiting verification by client',
  },
  feeApprovalList: {
    title: 'Approval List',

    newSchedule: '{name} has uploaded a new fee schedule',
    review: 'Review',

    approveSuccessTitle: 'Approved Successfully',
    approveSuccessLabel: 'The schedule has been stored securely on the blockchain',
    rejectSuccessTitle: 'Rejected Successfully',
    rejectSuccessLabel: 'The schedule has been rejected',

    emptyListMessage: 'There are currently no items that are pending approval.'
  },
  feeHistory: {
    title: 'History',

    versionLabel: 'Version {version}',
    approved: 'Approved',
    rejected: 'Rejected',

    viewDetails: 'View Details',
    download: 'Download',
    viewReason: 'View Reason',

    approvedReasonHeader: 'Reason for approval',
    rejectedReasonHeader: 'Reason for rejection',

    emptyHistoryMessage: 'There are currently no items in history.',

    // download button
    downloadErrorTitle: 'Download Error',
    downloadErrorMessage: 'Unable to start download. Please try again later.',
  },
  feeAdjustmentTable: {
    directBillLabel: 'Direct Bill',
    regionLabel: 'Region',
    exchangeLabel: 'Exchange Code',
    productGroupNameLabel: 'Product Group Name',
    productNameLabel: 'Product Name',
    productTypeLabel: 'Product Type',
    currencyLabel: 'Currency',
    tradeTypeLabel: 'Trade Type',
    spreadTypeLabel: 'Spread Type',
    rateTypeLabel: 'Rate Type',
    execTypeLabel: 'Exec Type',
    defaultValueLabel: 'Default Value',
    brokerageAmountLabel: 'Brokerage Amount',
    modificationLabel: 'Modified',

    modifiedYes: 'Yes',
    modifiedNo: 'No',
  },

  // Trade Enrichment module
  tradeEnrichment: {
    title: 'Trade Enrichment',

    stepUploadTrade: 'Step 1: Upload Trade',
    uploadTrade: 'Upload Trade',
    importFileCaption: 'Import as CSV',

    stepDownloadEnrichedTrade: 'Step 2: Download Enriched Trade',
    downloadEnrichedTrade: 'Download Enriched Trade',
    downloadEnrichedTradeCaption: 'Download enriched trade as CSV',

    uploaderText: 'Drop CSV file here, or click to browse.',
    uploaderError: 'Please select a CSV file',
    successLabel: 'Trade has been enriched',

    goBackDialogTitle: 'Go back?',
    goBackDialogMessage: 'You will not be able to return to the Download Enriched Trade step until a new enrichment is submitted. Do you still want to go back?',
    goBackDialogOk: 'Go Back',
  },


  // Mixins
  mixins: {
    dirtyState: {
      title: 'Discard changes?',
      message: 'You have unsaved changes. Are you sure you want to leave without saving?',
      ok: 'Discard',
      cancel: 'Stay',
    }
  },


  // Common components
  components: {
    form: {
      submit: 'Submit',
      reset: 'Reset',
    },
    dataTable: {
      searchLabel: 'Search',
      selectLabel: 'Select',
    },
    feeAdjustmentApprovalActions: {
      reason: 'Reason',
      accept: 'Approve',
      reject: 'Reject',
    },
    submissionDialog: {
      submitting: 'Submitting',
      successTitle: 'Success',
      successLabel: 'Submission completed successfully',
      failureTitle: 'Failed',
      failureLabel: 'Submission failed, please try again',
    },
    genericErrorScreen: {
      message: 'Something went wrong, please wait awhile and try again.',
      retry: 'Retry',
    },
  },
};
