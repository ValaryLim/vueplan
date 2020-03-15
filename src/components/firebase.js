import firebase from 'firebase';
import store from '../store.js';

const firebaseConfig = {
  /* copy config details here */
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