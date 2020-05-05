import defaultState from './defaultState';
import { role, pageNameToRoute } from 'src/config';

const roles = Object.values(role);

/**
 * Resets user state to default
 * @param {Object} state
 */
function resetUser(state) {
  console.trace();
  Object.assign(state, defaultState());
}
/**
 * Sets role of user into state.
 * @param {Object} state
 * @param {string} role
 */
function setRole(state, newRole) {
  if (roles.indexOf(newRole) === -1) {
    throw new Error('Tried to set invalid role: ' + newRole);
  }

  state.role = newRole;
}

/**
 * Sets broker code of user into state.
 * @param {Object} state
 * @param {string} brokerCode
 */
function setBrokerCode(state, newBrokerCode) {
  state.brokerCode = newBrokerCode;
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
  setRole,
  setBrokerCode,
  setUserInfo,
  setSessionAsExpired,
}
