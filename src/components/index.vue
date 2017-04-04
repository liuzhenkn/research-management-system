<template>
  <div id="modIndex">
    <div class="top-wrapper">

    </div>
    <div class="side-wrapper">
      <sideNav></sideNav>
    </div>
    <div class="content-wrapper">
      <router-link to="/"></router-link>
      <router-link to="/apply"></router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import sideNav from './sideNav/sideNav.vue';

    export default {
      components: {
        sideNav: sideNav
      }
    }
</script>
