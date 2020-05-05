import Vue from 'vue';
import { URI } from 'src/config';

/**
 * Fetches and stores broker data.
 * Fetching will be skipped if broker data already exists in store.
 *
 * @param {Object} context
 * @param {Boolean} forced - forces a fetch to be perform even if broker data exists in state
 */
async function fetchBrokers ({ commit, state }, forced) {
  const existingBroker = state.brokers;

  if (existingBroker && !forced) {
    return existingBroker;
  }

  const { data: brokerMap } = await Vue.prototype.$axios.get(URI.broker);

  commit('setBrokers', brokerMap);
}

export {
  fetchBrokers,
}
