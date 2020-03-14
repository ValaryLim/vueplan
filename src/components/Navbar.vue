<template>
    <div class="headerStyle">
        <nav>
            <div class="header-title">
                <router-link to="/register" v-if="!user.loggedIn">
                    <a class="header-title-first">vue</a>
                    <a class="header-title-second">Plan</a>
                    <img class="vuePlanLogo" 
                        src = "https://drive.google.com/uc?id=13rb1mMEJuxAVwmd6aqe1EWNGECgTGYH-" 
                        alt="vuePlanLogo">
                </router-link>
                <router-link to="/acadplan" v-if="user.loggedIn">
                    <a class="header-title-first">vue</a>
                    <a class="header-title-second">Plan</a>
                    <img class="vuePlanLogo" 
                        src = "https://drive.google.com/uc?id=13rb1mMEJuxAVwmd6aqe1EWNGECgTGYH-" 
                        alt="vuePlanLogo">
                </router-link>
            </div>
            <div class="header-tabs">
                <span class="header-tab"><router-link to="/acadplan" v-if="user.loggedIn"><a>Academic Plan</a></router-link></span>            
                <span class="header-tab"><router-link to="/gradprogress" v-if="user.loggedIn"><a>Graduation Progress</a></router-link></span>
                <span class="header-tab"><router-link to="/moduleinfo" v-if="user.loggedIn"><a>Module Information</a></router-link></span>
                <span class="header-tab"><router-link to="/sepmapping" v-if="user.loggedIn"><a>SEP Mapping</a></router-link></span>
                <span class="header-tab header-tab-dropdown">
                    <button class="dropdown-button" v-if="user.loggedIn">
                        <em v-if="user.loggedIn">{{user.data.email}}</em>
                        <em v-if="!user.loggedIn">User  </em>
                        <font-awesome-icon icon="caret-down" />
                    </button>
                    <span class="dropdown-content">
                        <div class="logged-in" v-if="user.loggedIn">
                            <a href="/userprofile">Account</a>
                            <a @click.prevent="signOut">Logout</a>
                        </div>
                        <div class="logged-out" v-if="!user.loggedIn">
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                        </div>
                    </span>
                </span>
            </div>
        </nav>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCaretDown);

import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
    components: {
        FontAwesomeIcon
    },

    computed: {
        ...mapGetters({
            // map `this.user` to `this.$store.getters.user`
            user: "user"
        })
    },
    methods: {
        signOut() {
            firebase
            .auth()
            .signOut()
            .then(() => {
                this.$router.replace({
                    name: "Home"
                });
            });
        }
    }
};
</script>

<style scoped>
/** image style */
.vuePlanLogo {
    width: 8%;
    height: 8%;
    padding-bottom: 50px;
}

/** main header style */
.headerStyle {
    overflow: hidden;
    background: white;
    padding: 10px;
    text-align: center;
    align-content: center;
    margin-bottom: 30px;
}

/** header title - vuePlan */
.header-title {
    margin-top: 30px;
    font-size: 60px;
    font-weight: bold;
}

.header-title .header-title-first {
    color: grey;
}

.header-title .header-title-second {
    color: #24305E;
} 

/** header tabs */
span {
    padding: 20px;
    display: inline-block;
}

a {
    color: #24305E;
}

/* add bolding to tabs that are hovered */
a:hover, .header-tab-dropdown:hover .dropdown-button {
    text-decoration: none;
    font-weight: bold;
}

.router-link-active {
    font-weight: bold;
}

/** header tabs - dropdown */
.header-tab-dropdown {
    float: inherit;
}

/* dropdown button */
.header-tab-dropdown .dropdown-button {
    border: none;
    outline: none;
    color: #24305E;
    background-color: inherit;
    font-family: inherit;
}

/* dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  float:inline-end;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* links inside the dropdown */
.dropdown-content a {
  padding: 12px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* add a grey background color to dropdown links on hover */
.dropdown-content a:hover {
    background-color: #EBEFF2;
}

/* show the dropdown menu on hover */
.header-tab-dropdown:hover .dropdown-content {
  display: block;
}
</style>
