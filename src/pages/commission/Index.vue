<template>
  <div class="content">
    <div class="top">
      佣金明细
    </div>
    <div class="items">
      <div class="item" @click="goDetail">
        <div class="left">
          <a>日期： 2018-12-12</a>
          <a>金额： <span>￥25.6</span></a>
          <a>类型： 佣金入账</a>
          <a>状态： 已完成</a>
        </div>
        <div class="right">
          <a>[订单详情]</a>
        </div>
      </div>
      <div class="item" @click="goDetail">
        <div class="left">
          <a>日期： 2018-12-12</a>
          <a>金额： <span>￥25.6</span></a>
          <a>类型： 佣金入账</a>
          <a>状态： 已完成</a>
        </div>
        <div class="right">
          <a>[订单详情]</a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <a>日期： 2018-12-12</a>
          <a>金额： <span>￥-25.6</span></a>
          <a>类型： 佣金提现</a>
          <a>状态： 待审核</a>
        </div>
        <!--<div class="right">-->
          <!--<a>[订单详情]</a>-->
        <!--</div>-->
      </div>
      <div class="item" @click="goDetail">
        <div class="left">
          <a>日期： 2018-12-12</a>
          <a>金额： <span>￥25.6</span></a>
          <a>类型： 佣金入账</a>
          <a>状态： 已完成</a>
        </div>
        <div class="right">
          <a>[订单详情]</a>
        </div>
      </div>
    </div>
    <!--<div class="empty">-->
    <!--<img src="../../assets/images/commission.png">-->
    <!--<a>暂无佣金记录</a>-->
    <!--</div>-->
    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="3"></BottomBar>
    <GoBack></GoBack>

  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import BottomBar from "../../components/BottomBar";

  export default {
    name: "Commission",
    components: {
      BottomBar: BottomBar,
      GoBack: GoBack,
    },
    methods:{
      goDetail(){
        this.$router.push({path: '/orderDetail'})
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
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }
    .items {
      width: 100%;
      border-left: 10px solid gainsboro;
      background-color: white;
      box-sizing: border-box;
      .item {
        width: 100%;
        height: 100px;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: 15px;
        color: grey;
        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px 20px;
          box-sizing: border-box;
          span {
            color: red;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 20px;
        }
      }
    }
    .empty {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 200px;
      img {
        width: 60px;
      }
      a {
        margin-top: 10px;
        font-size: 15px;
        color: gray;
      }
    }
  }
</style>
