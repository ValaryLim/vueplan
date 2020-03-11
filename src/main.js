import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import { routes } from './routes.js'

import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

Vue.use(VueRouter);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
