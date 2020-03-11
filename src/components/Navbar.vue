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
                        <em>User</em>
                    </template>
                    <div class="logged-in">
                        <b-dropdown-item href="#">Account</b-dropdown-item>
                        <b-dropdown-item href="#">Logout</b-dropdown-item>
                    </div>
                    <div class="logged-out">
                        <b-dropdown-item href="#">Login</b-dropdown-item>
                        <b-dropdown-item href="#">Register</b-dropdown-item>
                    </div>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style>
    a {
        padding: 10px;
        color: #24305E;
    }
</style>