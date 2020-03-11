import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import { routes } from './routes.js';

import firebase from 'firebase';
import store from './store.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBm9ZkRvTPHK5CQ-uZMSQt1RsekW9efOcs",
  authDomain: "vueplan.firebaseapp.com",
  databaseURL: "https://vueplan.firebaseio.com",
  projectId: "vueplan",
  storageBucket: "vueplan.appspot.com",
  messagingSenderId: "475166877841",
  appId: "1:475166877841:web:8556ab02c27653d0573730",
  measurementId: "G-F3KW9HJ91K"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

var database = firebase.firestore();
export default database;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
