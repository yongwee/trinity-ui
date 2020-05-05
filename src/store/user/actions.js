import Vue from 'vue';
import { LocalStorage } from 'quasar';
import { URI, authTokens, routes } from 'src/config';
import VueRouter from 'vue-router'

/**
 * Clears user data and reroute to login (if able).
 * @param {Object} context
 * @param {VueRouter} router
 */
function logout({ commit }, router) {
  if (!(router instanceof VueRouter)) {
    throw new Error('No valid vue router instance provided');
  }

  LocalStorage.remove(authTokens.key);
  commit('resetUser');

  router.push({ name: routes.login.name });
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
  logout,
  fetchUserInfo,
}
