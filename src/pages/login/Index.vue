<template>
  <div class="content">
    <div class="top">
      <div class="top-b">账号密码登录</div>
    </div>
    <div class="text-input">
      <input class="input1" type="text" placeholder="请输入手机号码">
      <input class="input1" type="password" placeholder="请输入密码">
      <div class="yzm">
        <input type="text" placeholder="请输入验证码">
        <img src="../../assets/images/ewm.jpg" alt="">
      </div>
      <button class="submit-button" @click="goHome">立即登录</button>
      <div class="register-text" ><a>立即注册</a></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {}
    },
    methods:{
      goHome(){
        this.$router.push({path: '/home'})
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    background-color: rgb(242,242,242);
    position: fixed;
    width: 100%;
    height: 100%;
    font-size: 15px;
    .top {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #189cd5;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      .top-b{
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
        color: #189cd5;
      }
    }
    .text-input{
      padding: 20px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .input1{
        box-sizing: border-box;
        border: none;
        height: 35px;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        margin-top: 10px;
        font-size: 15px;
      }
      .yzm{
        height: 35px;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        input{
          box-sizing: border-box;
          border: none;
          height: 35px;
          padding-left: 10px;
          padding-right: 10px;
          width: 100%;
          font-size: 15px;
        }
        img{
          width: 80px;
          height: 100%;
        }
      }
      .submit-button{
        margin-top: 15px;
        width: 100%;
        border: none;
        height: 35px;
        background-color: #189cd5;
        color:white;
      }
      .register-text{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        color: grey;
        margin-top: 10px;
        width: 100%;
        height: 35px;
      }
    }
  }


</style>
