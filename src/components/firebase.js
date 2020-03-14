import firebase from 'firebase';
import store from '../store.js';

const firebaseConfig = {
  /* copy config details here */
  };
  
  firebase.initializeApp(firebaseConfig);
  
  firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
  });
  
  var database = firebase.firestore();
  export default database;