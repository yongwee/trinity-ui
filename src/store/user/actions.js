import Vue from 'vue';
import { LocalStorage } from 'quasar';
import { URI, authTokens } from 'src/config';

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
  fetchUserInfo,
}
