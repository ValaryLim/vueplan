import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import { routes } from './routes.js';

import store from './store.js';

// wait for first firebase auth change before setting up vue
import firebase from 'firebase';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(async () => {
  if (!app) {
    //wait to get user
    var user = await firebase.auth().currentUser;
    console.log(user);

    //start app
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});