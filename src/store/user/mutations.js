import { role } from 'src/config';

const roles = Object.values(role);

/**
 * Sets role of user into state.
 * 
 * @param {Object} state
 * @param {string} role
 */
function setRole(state, newRole) {
  if (roles.indexOf(newRole) === -1) {
    throw new Error('Tried to set invalid role: ' + newRole);
  }

  state.role = newRole;
}

export {
  setRole,
}
