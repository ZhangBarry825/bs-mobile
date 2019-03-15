<template>
  <div class="content">
    <div class="top">
      完善资料
    </div>

    <div class="form">
      <div class="type avatar">
        <div class="pic" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
        <div class="tip" >
          上传头像
        </div>
      </div>
      <div class="type">
        <a>昵称:</a>
        <input type="text">
      </div>
      <div class="type">
        <a>绑定手机:</a>
        <input type="number">
      </div>

    </div>
    <div class="submit">
      <div class="button">确定</div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";

  export default {
    name: "Info",
    components: {
      GoBack: GoBack
    },
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

    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }

    .form {
      margin-top: 10px;
      width: 100%;
      background-color: white;
      .type {
        box-sizing: border-box;
        padding: 5px 10px;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        a {
          width: 80px;
          display: block;
        }
        select, input {
          border: 0 solid grey;
          height: 25px;
          font-size: 14px;
        }
      }
      .avatar{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .pic{
          width: 70px;
          height: 70px;
          border-radius: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .tip{
          width: 80px;
          background-color: #169bd5;
          margin: 10px;
          color: white;
          display: flex;
          justify-content: center;
          padding: 5px 10px;

        }
      }
    }
    .submit{
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      .button{
        width: 90%;
        background-color: #169bd5;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:5px ;
        height: 40px;
      }
    }
  }
</style>
