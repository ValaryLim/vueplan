<!-- COLOUR SCHEME 
  #F76C6C
  #24305E 
  #EBEFF2-->

<template>
  <div id="app">
    <app-navbar></app-navbar>
    <div class="row">
      <div class="col-md-12">
        <!-- link allmajors data to components -->
        <router-view :allmodules="allmodules" :allmajors="allmajors"
          :sepMappings="sepMappings"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import allModules from './assets/allmoduleinfo.json';
import sepMappings from './assets/allsepmappings_sorted.json';
import allMajors from './assets/allmajors.json';

export default {
  name: 'App',
  components: {
    appNavbar: Navbar,
  },

  data() {
    return {
      /* all valid modules */
      allmodules: allModules, 
      /* list of majors & corresponding modules */
      allmajors: allMajors,
      /* list of sep mappings */
      sepMappings: sepMappings,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}

body {
  height: 100%;
  top: 0;
  margin-top: 0;
  padding: 0;
  background-color: #EBEFF2;
}

.row {
  margin: 30px;
}
</style>