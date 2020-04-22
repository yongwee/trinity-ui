export default {
  // Route titles
  routes: {
    // FX Token
    fxTokenOpenPosition: 'FX Token Open Position',
    fxTokenClosedPosition: 'FX Token Closed Position',

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

    // Trade enrichment module
    tradeEnrichment: 'Trade Enrichment',
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
    createTokenNameInput: 'Token Name',
    createTokenDescriptionInput: 'Description',
    createTokenInvestorInput: 'Investor',
    createTokenAmountInput: 'Amount',
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
    importAsXml: 'Import as XML',

    stepDownloadEnrichedTrade: 'Step 2: Download Enriched Trade',
    downloadEnrichedTrade: 'Download Enriched Trade',
    downloadEnrichedTradeCaption: 'Download enriched trade as CSV',

    uploaderText: 'Drop XML file here, or click to browse.',
    uploaderError: 'Please select a XML file',
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
