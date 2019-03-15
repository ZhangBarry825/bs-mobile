<template>
  <div class="content">
    <div class="top">
      申请分销商
    </div>
    <div class="detail">
      <div class="form">
        <div class="clarify">
          申请成为分销商需要或满足以下条件之一：<br>
          1、有过消费记录<br>
          2、消费额达到 ￥200<br>
          3、直接购买分销资格<br>
        </div>

        <div class="type">
          <a>目前消费总额:</a>
          <span>￥200.5</span>
        </div>
        <div class="type">
          <a>分销资格价格:</a>
          <span>￥200</span>
        </div>
        <div class="type">
          <a>推荐人昵称:</a>
          <span>大番薯</span>
        </div>
        <div class="type">
          <a>推荐人会员ID:</a>
          <span>154114</span>
        </div>
      </div>
      <div class="submit">
        <div class="button">申请成销商</div>
      </div>
    </div>


    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="3"></BottomBar>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import GoBack from "../../components/GoBack";

  export default {
    name: "Apply",
    components: {
      BottomBar: BottomBar,
      GoBack:GoBack
    },
    data() {
      return {

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
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }
    .detail {
      font-size: 15px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      .tip {
        width: 100%;
        a {

        }
        span {
          color: red;
        }
      }
      .form {
        margin-top: 10px;
        width: 100%;
        background-color: white;
        div {
          box-sizing: border-box;
          padding: 5px 10px;
          border-bottom: 1px solid gainsboro;
        }
        .type {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          a {
            width: 100px;
            display: block;
          }
          span{
            color: red;
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
  }
</style>
