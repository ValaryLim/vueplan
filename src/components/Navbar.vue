<template>
    <div class="headerStyle">
        <nav>
            <div class="header-title">
                <!-- Links user to Login Page if not logged in -->
                <router-link to="/" v-if="!user.loggedIn">
                    <a class="header-title-first">vue</a>
                    <a class="header-title-second">Plan</a>
                </router-link>
                <!-- Links user to Welcome Page if logged in -->
                <router-link to="/" v-if="user.loggedIn">
                    <a class="header-title-first">vue</a>
                    <a class="header-title-second">Plan</a>
                </router-link>
            </div>
            <!-- No tabs shown if user not logged in -->
            <div class="header-tabs" v-if="!user.loggedIn">
                <span class="header-tab"></span>
            </div>
            <!-- Show tabs when user is logged in -->
            <div class="header-tabs" v-if="user.loggedIn">
                <span class="header-tab"><router-link to="/acadplan"><a>Academic Plan</a></router-link></span>            
                <span class="header-tab"><router-link to="/gradprogress"><a>Graduation Progress</a></router-link></span>
                <span class="header-tab"><router-link to="/moduleinfo"><a>Module Information</a></router-link></span>
                <span class="header-tab"><router-link to="/sepmapping"><a>SEP Mapping</a></router-link></span>
                <span class="header-tab header-tab-dropdown">
                    <button class="dropdown-button">
                        <em>{{user.data.email}}</em>
                        <font-awesome-icon icon="caret-down" />
                    </button>
                    <span class="dropdown-content">
                        <div class="logged-in">
                            <a href="/userprofile">Account</a>
                            <a @click.prevent="signOut">Logout</a>
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