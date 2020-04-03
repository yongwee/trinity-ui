import { role } from 'src/config';

/**
 * Makes a http request to fetch user role and commits it to state.
 * 
 * @param {Object} context
 */
async function fetchRole({ commit }) {
  const mockRole = role.counterParty;

  commit('setRole', mockRole);
}

export {
  fetchRole,
}
