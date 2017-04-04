<template>
  <div id="app">
    <!-- <router-link to="/login"></router-link>
    <router-link to="/index"></router-link>
    <router-view></router-view> -->
    <login v-if="!isLogin" @login="loginSuccess"></login>
    <index v-if="isLogin"></index>
    <div class="hhh">
      {{isLogin}}
    </div>
  </div>
</template>

<script>
import login from './components/login';
import index from './components/index';
import axios from 'axios';
export default {
  data(){
    return {
      isLogin: false
    };
  },
  components: {
    index: index,
    login: login
  },
  methods: {
    loginSuccess() {
      this.isLogin = true;
    }
  },
  mounted() {
    axios.get('/api/isLogin')
    .then((response) => {
      console.log(response.data);
      if(response.data){
        this.isLogin = true;
      }
    });
  }
}
</script>
