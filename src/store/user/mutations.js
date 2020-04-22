import { role } from 'src/config';

const roles = Object.values(role);

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

export {
  setRole,
  setBrokerCode,
}
