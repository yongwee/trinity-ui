import axios from 'axios';
import { LocalStorage } from 'quasar';
import { routes, authTokens } from 'src/config';

// we add it to Vue prototype
// so we can reference it in Vue files
// without the need to import axios

export default function({ Vue, router, store }) {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    config => {
      const tokens = LocalStorage.getItem(authTokens.key);

      if (!tokens) {
        return config;
      }

      const { username, accessToken } = tokens;

      return {
        ...config,
        headers: {
          ...config.headers,
          // Auth headers
          HeaderAuth1: accessToken,
          HeaderAuth2: username,
        },
      };
    }
  );

  Vue.prototype.$axios = axiosInstance;
}
