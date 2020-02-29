<template>
    <div>
        <b-navbar class="header" toggleable="lg" type="light" variant="light">
            <router-link to="/" class="navbar-brand">vuePlan</router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link to="/acadplan" activeClass="active" tag="li"><a>Academic Plan</a></router-link>
                <router-link to="/gradprogress" activeClass="active" tag="li"><a>Graduation Progress</a></router-link>
                <router-link to="/moduleinfo" activeClass="active" tag="li"><a>Module Information</a></router-link>
                <router-link to="/reviews" activeClass="active" tag="li"><a>Module Reviews</a></router-link>
                <router-link to="/sepmapping" activeClass="active" tag="li"><a>SEP Mapping</a></router-link>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
    a:hover {
        color: #F76C6C;
    }
    b-navbar {
        background-color: #24305E;
        position: sticky;
    }
    /* .navbar.navbar-light.bg-light{
        background-color: #FAFAFA!important;
    } */
</style>