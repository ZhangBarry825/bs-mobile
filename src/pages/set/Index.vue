<template>
  <div class="content">
    <div class="top">
      设置
    </div>
    <div class="items">
      <div class="item" @click="goInfo">
        <a>完善资料</a>
        <a>></a>
      </div>
    </div>
    <div class="items">
      <div class="item" @click="goPassword">
        <a>修改密码</a>
        <a>></a>
      </div>
    </div>

    <div class="bottom" @click="unLogin">
      退出登录
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Set",
    components: {
      GoBack: GoBack
    },
    methods:{
      unLogin(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/user/logout', {

        },(response, all)=>{
          console.log(response)
          localStorage.clear()
          this.$router.push({path: '/'})
        });

      },
      goInfo(){
        this.$router.push({path: '/info'})
      },
      goPassword(){
        this.$router.push({path: '/password'})
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #f8f8f8;
    font-size: 15px;
    color: #262626;
    a{
      color:#262626;
    }
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }
    .items{
      width: 100%;
      .item{
        font-size: 14px;
        width: 100%;
        background-color: white;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
      }
    }
    .bottom{
      font-size: 13px;
      width: 100%;
      display: flex;
      background-color: red;
      justify-content: center;
      padding: 10px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      color: white;
    }
  }
</style>
