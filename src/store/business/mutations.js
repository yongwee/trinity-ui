/**
 * @typedef {Object} Broker
 * @property {String} brokerMapId
 * @property {String} exBrokerCode
 * @property {String} exBrokerCoyName
 * @property {String} cpBrokerCode
 * @property {String} cpBrokerCoyName
 */
/**
 * 
 * @param {Object} state 
 * @param {Broker[]} newBrokers
 */
function setBrokers (state, newBrokers) {
  state.brokers = newBrokers;
}

export {
  setBrokers,
}
