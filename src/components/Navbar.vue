<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
            <router-link to="/" class="navbar-brand">vuePlan</router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link to="/acadplan" activeClass="active" tag="li"><a>Academic Plan</a></router-link>
                <router-link to="/gradprogress" activeClass="active" tag="li"><a>Graduation Progress</a></router-link>
                <router-link to="/moduleinfo" activeClass="active" tag="li"><a>Module Information</a></router-link>
                <router-link to="/sepmapping" activeClass="active" tag="li"><a>SEP Mapping</a></router-link>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em v-if="user.loggedIn">{{user.data.email}}</em>
                        <em v-if="!user.loggedIn">User</em>
                    </template>
                    <div class="logged-in" v-if="user.loggedIn">
                        <b-dropdown-item href="/userprofile">Account</b-dropdown-item>
                        <b-dropdown-item @click.prevent="signOut">Logout</b-dropdown-item>
                    </div>
                    <div class="logged-out" v-if="!user.loggedIn">
                        <b-dropdown-item href="/login">Login</b-dropdown-item>
                        <b-dropdown-item href="/register">Register</b-dropdown-item>
                    </div>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
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

<style>
    a {
        padding: 10px;
        color: #24305E;
    }
</style>