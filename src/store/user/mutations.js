import defaultState from './defaultState';
import { pageNameToRoute } from 'src/config';

/**
 * Resets user state to default
 * @param {Object} state
 */
function resetUser(state) {
  Object.assign(state, defaultState());
}

/**
 * Sets user's sessionExpired flag to true
 * @param {Object} state
 * @param {boolean} newSessionExpired
 */
function setSessionAsExpired(state) {
  state.sessionExpired = true;
}

/**
 * @typedef UserInfo
 * @property {string} username
 * @property {string} name
 * @property {string} brokerCode
 * @property {string} pageNames - names of accessible pages e.g. "feehistory,tradeenrich,feeapproval"
 * @property {string} role
 */
/**
 * Sets routes for user.
 * @param {Object} state
 * @param {UserInfo} newUserInfo
 */
function setUserInfo(state, newUserInfo) {
  const { pageNames = '' } = newUserInfo;

  const accessibleRoutes = pageNames
    .split(',')
    .map(pageName => {
      return pageNameToRoute[pageName];
    });

  Object.assign(state, {
    ...newUserInfo,
    accessibleRoutes,
    defaultRoute: accessibleRoutes[0],
    sessionExpired: false,
    fetched: true,
  });
}

export {
  resetUser,
  setUserInfo,
  setSessionAsExpired,
}
