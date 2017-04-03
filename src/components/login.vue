<template>
  <div id="mod-login">
    <el-card class="box-card">
      <el-input class="account" v-model="account" placeholder="请输入账号"></el-input>
      <el-input class="password" type="password" v-model="password" placeholder="请输入密码"></el-input>
      <el-button class="login-btn" @click="login">登录</el-button>
    </el-card>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
    data() {
        return {
            account : '',
            password : ''
        }
    },
    methods:{
      login() {
        let data = {
          account : this.account,
          password : this.password
        };
        console.log(data)
        axios.post('/api/login/getAccount',data)
          .then((response) => {
            // 响应成功回调
            if(response.data === 0 || response.data === 1){
              alert("用户名/密码错误")
            }else{
              location.hash = "/index";
            }
          });
        }
      },
      beforeCreate() {
        axios.get('/api/isLogin')
        .then((response) => {
          if(response.data){
            location.hash = "/index";
          }
        });
      }
    }
</script>
<style lang="less">
  #mod-login{
    margin: 0;
    padding: 0;
    font-size: 0;
    .box-card{
      width: 40%;
      margin: 0 auto;
    }
    .account,.password{
      margin: 0 0 15px 0;
    }
  }
</style>
