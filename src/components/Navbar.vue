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
                    <em v-if="!$auth.isAuthenticated" class="button is-xl is-dark">User</em>
                    <em v-if="$auth.isAuthenticated" class="is-size-3 has-background-dark welcome">{{ $auth.user.nickname }}</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item>
                    <div class="buttons">
                        <!-- Check that the SDK client is not currently loading before accessing is methods -->
                        <div v-if="!$auth.loading">
                            <!-- show login when not authenticated -->
                            <a v-if="!$auth.isAuthenticated" @click="login" class="button is-dark"><strong>Sign in</strong></a>
                            <!-- show logout when authenticated -->
                            <a v-if="$auth.isAuthenticated" @click="logout" class="button is-dark"><strong>Log out</strong></a>
                        </div>
                    </div>
                </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        // Log the user in
        login() {
        this.$auth.loginWithRedirect();
        },
        // Log the user out
        logout() {
        this.$auth.logout({
            returnTo: window.location.origin
        });
        }
    }
}
</script>

<style>
    a {
        padding: 10px;
        color: #24305E;
    }
</style>