<template>
  <div class="content">
    <div class="top">
      我的订单
    </div>
    <div class="toggle">
      <div class="type type1" @click="toggleTab(1)" v-bind:class="{ active: toggle==1 }">待付款</div>
      <div class="type type2" @click="toggleTab(2)" v-bind:class="{ active: toggle==2 }">待发货</div>
      <div class="type type3" @click="toggleTab(3)" v-bind:class="{ active: toggle==3 }">待收货</div>
      <div class="type type4" @click="toggleTab(4)" v-bind:class="{ active: toggle==4 }">已完成</div>
      <div class="type type5" @click="toggleTab(5)" v-bind:class="{ active: toggle==5 }">售后</div>
    </div>

    <div class="items">
      <!--<div class="empty">-->
        <!--<img src="../../assets/images/order.png">-->
        <!--<a>暂无订单</a>-->
      <!--</div>-->
      <div class="item">
        <div class="orderNum" @click="goDetail">
          <a>订单号：1125445224</a>
        </div>
        <div class="goods">
          <div class="left" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="right">
            <div class="title">2018新款百搭斜挎包水貂毛口袋包链条包单肩包2018新款百搭斜挎包水貂毛口袋包链条包单肩包2018新款百搭斜挎包水貂毛口袋包链条包单肩包</div>
            <div class="type">淡蓝色-Large</div>
            <div class="price">
              <span>￥218</span>
              <a>x1</a>
            </div>
          </div>
        </div>
        <div class="total">
          <a>合计：</a>
          <span>￥218</span>
        </div>
        <div class="buttons">
          <div class="button" v-if="toggle!=4 && toggle!=5">取消订单</div>
          <div class="button" v-if="toggle==4">申请退货</div>
          <div class="button" v-if="toggle==5">退货中</div>
          <div class="button confirm" v-if="toggle==3">确认收货</div>
          <div class="button confirm" v-if="toggle==1" @click="goPay">付款</div>
        </div>
      </div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import Address from "../../components/Address";
  import GoBack from "../../components/GoBack";

  export default {
    name: "Order",
    data() {
      return {
        toggle: 1
      }
    },
    methods: {
      toggleTab(val) {
        this.toggle = val
      },
      goDetail(){
        this.$router.push({path: '/orderdetail'})
      },
      goPay(){
        this.$router.push({path: '/pay'})
      }
    },
    components: {
      Address: Address,
      GoBack: GoBack
    },
    mounted() {
      if (this.$route.params.type) {
        this.toggle = this.$route.params.type
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
    .toggle {
      display: flex;
      flex-direction: row;
      .type {
        height: 40px;
        width: 50%;
        background-color: gainsboro;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .active {
        background-color: #ff6702;
        color: white;
      }
    }
    .items {
      width: 100%;
      height: calc(100% - 86px);
      overflow: scroll;
      box-sizing: border-box;
      padding: 5px;
      .empty {
        background-color: #f8f8f8;
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
      .item{
        margin-bottom: 5px;
        background-color: white;
        width: 100%;
        border: 1px solid gainsboro;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-size: 13px;
        padding: 5px;
        .orderNum{
          width: 100%;
          border-bottom: 1px solid gainsboro;
          padding: 5px 0;
          box-sizing: border-box;
          font-size: 14px;
        }
        .goods{
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          padding: 10px 0;
          box-sizing: border-box;
          .left{
            height: 70px;
            width: 70px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 5px;
          }
          .right{
            padding-left: 5px;
            box-sizing: border-box;
            width: calc(100% - 70px);
            height: 100%;
            .title{
              width: 100%;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .type{
              width: 100%;
              color: grey;
              margin-top: 5px;
            }
            .price{
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
              span{
                color: red;
              }
            }
          }
        }
        .total{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          border-bottom: 1px solid gainsboro;
          padding-bottom: 10px;
          box-sizing: border-box;
          span{
            color: red;
          }
        }
        .buttons{
          width: 100%;
          margin-top: 5px;
          padding: 5px 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-end;
          .button{
            font-size: 15px;
            margin-left: 5px;
            padding: 2px 10px;
            border: 1px solid grey;
            color: grey;
            border-radius: 14px;
          }
          .confirm{
            color: #ff6702;
            border: 1px solid #ff6702;
          }
        }
      }
    }
  }
</style>
