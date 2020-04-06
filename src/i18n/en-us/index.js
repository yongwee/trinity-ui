export default {
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
  },
  feeHistory: {
    title: 'History',
    approved: 'Approved',
    rejected: 'Rejected',
    viewDetails: 'View Details',
    download: 'Download',
  },

  // Common components
  components: {
    form: {
      submit: 'Submit',
      reset: 'Reset',
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
