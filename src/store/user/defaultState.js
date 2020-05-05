export default function() {
  return {
    username: null,
    name: null,
    role: null,
    brokerCode: null,
    pageNames: null,
    accessibleRoutes: [],
    defaultRoute: null,
    sessionExpired: true,
    fetched: false, // flag for marking if this bunch of info has been fetched
  };
}
