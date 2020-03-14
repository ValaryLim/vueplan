import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import { routes } from './routes.js';

import store from './store.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
