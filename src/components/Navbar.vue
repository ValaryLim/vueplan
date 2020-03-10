<template>
    <div id="header">
        <div id="main">
            <router-link to="/"><a id="main-first">vue</a><a id="main-second">Plan</a></router-link>
        </div>
        <b-navbar toggleable="lg" type="light" variant="light">
            <!-- <router-link to="/" class="navbar-brand">vuePlan</router-link> -->

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link to="/acadplan" activeClass="active" tag="li"><a class="nav-tab">Academic Plan</a></router-link>
                <router-link to="/gradprogress" activeClass="active" tag="li"><a class="nav-tab">Graduation Progress</a></router-link>
                <router-link to="/moduleinfo" activeClass="active" tag="li"><a class="nav-tab">Module Information</a></router-link>
                <router-link to="/sepmapping" activeClass="active" tag="li"><a class="nav-tab">SEP Mapping</a></router-link>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav>
                <b-nav-item-dropdown>
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
    #header {
        background: #fff;
    }

    #main {
        font-size: 60px;
        font-weight: bold;
        padding: 25px;
    }

    #main #main-first {
        color: grey;
    }

    #main #main-second {
        color: #24305E;
    }

    .nav-tab {
        padding: 20px;
    }
</style>