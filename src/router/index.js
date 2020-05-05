import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import { routes as routeConfig } from 'src/config';

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

function routeIsAccessible(toRoute, accessibleRoutes) {
  for (const route of accessibleRoutes) {
    if (route.name === toRoute.name) {
      return true;
    }
  }

  return false;
}

export default function ({ store, /* ssrContext */ }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.meta.skipBeforeEachRouteGuard) {
      return next();
    }

    const { state } = store;

    store.dispatch('user/fetchUserInfo')
      .then(() => {
        if (routeIsAccessible(to, state.user.accessibleRoutes)) {
          return next();
        }

        // Move to default route if 'to' route is not accessible
        next({ name: state.user.defaultRoute.name })
      })
      .catch(err => {
        console.log(err);
        // Move to login if error occured
        const loginRouteName = routeConfig.login.name;

        from.name === loginRouteName
          ? next(false)
          : next({ name: loginRouteName });
      });
  });

  return Router
}
