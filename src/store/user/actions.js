import { role } from 'src/config';

/**
 * Makes a http request to fetch user information and commits it to state.
 * 
 * @param {Object} context
 */
async function fetchUser({ commit }) {
  const mockRole = role.broker;
  const mockBrokerCode = 'CGML-ES';

  commit('setRole', mockRole);
  commit('setBrokerCode', mockBrokerCode);
}

export {
  fetchUser,
}
