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

    // Trade enrichment module
    tradeEnrichment: 'Trade Enrichment',
  },

  // FX Token
  fxTokenOpenPosition: {
    title: 'FX Token Open Position',

    createToken: 'Create FX Token',
    search: 'Search',
    tokenSelectLabel: 'FX Token Code',

    // Create token
    createTokenSectionHeader: 'Create FX Token',

    // History
    txHistoryTab: 'Transaction History',
    navHistoryTab: 'NAV History',
  },

  fxTokenClosedPosition: {
    title: 'FX Token Closed Position',

    // History
    txHistoryTab: 'Transaction History',
    navHistoryTab: 'NAV History',
  },

  // Investor Risk
  investorRisk: {
    title: 'Investor Risk',

    selectLabel: 'Investor',
  },

  // Fee Adjustment module
  feeAdjustment: {
    title: 'Fee Adjustment',
    addScheduleLabel: 'Add fee schedule',
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

    approved: 'Approved',
    rejected: 'Rejected',

    viewDetails: 'View Details',
    download: 'Download',

    emptyHistoryMessage: 'There are currently no items in history.',
  },

  // Trade Enrichment module
  tradeEnrichment: {
    title: 'Trade Enrichment',

    stepUploadTrade: 'Upload Trade',
    uploadTrade: 'Upload Trade',
    importAsXml: 'Import as XML',

    stepDownloadEnrichedTrade: 'Download Enriched Trade',
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
      deny: 'Reject',
    },
    submissionDialog: {
      submitting: 'Submitting',
      successTitle: 'Success',
      successLabel: 'Submission completed successfully',
      failureTitle: 'Failed',
      failureLabel: 'Submission failed, please try again',
    }
  },
};
