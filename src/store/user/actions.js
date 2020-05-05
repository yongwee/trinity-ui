import Vue from 'vue';
import { LocalStorage } from 'quasar';
import { role, URI, authTokens } from 'src/config';

/**
 * Clears user data.
 * @param {Object} context
 */
function clearData({ commit }) {
  LocalStorage.remove(authTokens.key);
  commit('resetUser');
}

/**
 * Makes a http request to fetch user information and commits it to state.
 * @param {Object} context
 */
async function fetchUser({ commit }) {
  const mockRole = role.broker;
  const mockBrokerCode = 'CGML-ES';

  commit('setRole', mockRole);
  commit('setBrokerCode', mockBrokerCode);
}

/**
 * Makes a http request to fetch user role and accessible routes.
 * @param {Object} context
 * @param {boolean} forced - force a fetch
 */
async function fetchUserInfo({ commit, state }, forced) {
  if (!forced && state.fetched) {
    return;
  }

  const { data } = await Vue.prototype.$axios.get(URI.userInfo);

  commit('setUserInfo', data);
}

export {
  clearData,
  fetchUser,
  fetchUserInfo,
}
