<template>
  <div class="mod-user">
    <div class="account item">
      <span>账号:</span><span>{{userInfo.account}}</span>
    </div>
    <div class="name item">
      <span>姓名:</span><span>{{type[userInfo.type]}}</span>
    </div>
    <div class="type item">
      <span>类型:</span><span>{{type[userInfo.type]}}</span>
    </div>
    <div class="menu">
      <el-button class="change" type="text" @click="changePassword = true">修改密码</el-button>
      <el-button class="logoff" type="text" @click="logOff">注销</el-button>
    </div>
    <el-dialog title="修改密码" v-model="changePassword">
      <el-form class="form-box">
        <el-form-item>
          <el-input placeholder="旧密码" type="password" auto-complete="off" v-model="oldPassword" @focus="hideWarn"></el-input>
          <span v-show="passwordErr">密码错误!</span>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="新密码" type="password" auto-complete="off" v-model="newPassword" @focus="hideWarn"></el-input>
          <span v-show="newErr">新旧密码相同!</span>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="重复新密码" type="password" auto-complete="off" v-model="repeatPassword" @focus="hideWarn"></el-input>
          <span v-show="repeatErr">两次密码不一致!</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePassword = false">取 消</el-button>
        <el-button type="primary" @click="changePas">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      passwordErr: false,
      newErr: false,
      repeatErr: false,
      type: ["根管理员","学生","教师","xx管理员","xx管理员"],
      changePassword: false
    };
  },
  props:['userInfo'],
  methods: {
    logOff(){
      this.$confirm('确认注销当前用户？', '注销提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/api/logoff').then((response) => {
            location.reload();
          });
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消注销'
          });
        });
    },
    changePas(){
      this.passwordErr = false;
      this.repeatErr = false;
      this.newErr = false;
      if(this.oldPassword != this.userInfo.password){
        this.passwordErr = true;
      }else if(this.oldPassword === this.newPassword){
        this.newErr = true;
      }else if(this.newPassword != this.repeatPassword){
        this.repeatErr = true;
      }else{
        let data = {
          account: this.userInfo.account,
          newPassword: this.newPassword
        };
        axios.post('/api/changePassword',data).then((response) => {
          console.log(response.data);
        })
        this.$alert('修改密码成功', '修改密码', {
          confirmButtonText: '确定',
          callback: action => {
            location.reload();
          }
        });
      }
    },
    hideWarn(){
      this.passwordErr = false;
      this.repeatErr = false;
      this.newErr = false;
    }
  }
}
</script>

<style lang="less">
  .mod-user{
    padding: 10px 18px;
    background:#475669;
    color: #fff;
    .item{
      margin-bottom: 5px;
      font-size: 14px;
      span{
        margin-right: 15px;
      }
    }
    .menu{
      height: 25px;
      .logoff,.change{
        font-size: 12px;
      }
    }
    .el-dialog{
      max-width: 500px;
      .form-box{
        span{
          margin-left: 5px;
          margin-bottom: -10px;
          color: red;
          font-size: 12px;
        }
        .el-form-item{
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
