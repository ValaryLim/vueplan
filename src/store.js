// store.js is used to manage the state of authentication

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    // state contains user object which holds
    // info about logged-in user
    state: {
        user: {
            loggedIn: false,
            data: null
        }
    },
    
    // getters used to access data stored in the state
    getters: {
        user(state){
            // returns user object from the state
            return state.user
        }
    },
    
    // mutations make changes to our state
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        }
    },
    
    // actions commit mutations
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                commit("SET_USER", null);
            }
        }
    }
});