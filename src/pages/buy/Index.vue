<template>
  <div class="content">
    <GoBack></GoBack>
    <div class="top">
      我的订单
    </div>

    <div class="address" @click="displayAddress">
      <a class="tip" v-if="!choosed">选择地址</a>


      <div class="info" v-if="choosed">
        <a>收货人：张三 <span>1008611</span></a>
        <a>收货地址：北京北京市海淀区上地三街嘉华大厦XXX号北京北京市海淀区上地三街嘉华大厦XXX号</a>
      </div>
      <a class="right">></a>


    </div>
    <div class="border"></div>

    <div class="store">
      大番薯的店
    </div>

    <div class="commodity">
      <div class="left" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
      <div class="right">
        <div class="title">2018新款潮百搭斜挎包蕾丝羽毛包链2018新款潮百搭斜挎包蕾丝羽毛包链</div>
        <div class="type">淡蓝色-Large</div>
        <div class="price">
          <a>￥218.00</a>
          <a>x1</a>
        </div>
      </div>
    </div>

    <div class="num">
      <div class="tip">购买数量</div>
      <div class="number">
        <div class="pre" @click="decreaseNum">-</div>
        <input oninput="if(value>1000)value=1000" type="number" v-model="num">
        <div class="next" @click="addNum">+</div>
      </div>
    </div>

    <div class="total">
      <div class="price">小计：<span>￥218</span></div>
      <div class="express">
        <a>运费</a>
        <span>￥12</span>
      </div>
    </div>

    <div class="bottom">
      <div class="price">
        共<span> {{num}} </span>件商品 合计：<span>￥{{num*218+12}}</span>
      </div>
      <div class="button" @click="pay">确认订单</div>
    </div>


    <Address :isDisplay="isDisplay" v-on:cancelDis="cancelDisplay" v-on:chooseAddress="chooseAddress"></Address>

  </div>
</template>

<script>

  import Address from "../../components/Address";
  import GoBack from "../../components/GoBack";
  import { Message } from 'element-ui';

  export default {
    name: "Buy",
    data() {
      return {
        num: 1,
        isDisplay: false,
        address: {},
        choosed: false
      }
    },
    components: {
      Address: Address,
      GoBack: GoBack
    },
    methods: {
      decreaseNum() {
        if (this.num > 1) {
          this.num--
        }
      },
      addNum() {
        if (this.num < 1000) {
          this.num++
        }
      },
      cancelDisplay() {
        this.isDisplay = false
      },
      displayAddress() {
        this.isDisplay = true
      },
      chooseAddress(e) {
        this.choosed = true
        this.isDisplay = false

      },
      pay() {
        if(this.choosed ){
          this.$router.push({path: '/pay'})
        }else {
          Message({
            showClose: true,
            message: '请先选择地址！',
            type: 'warning'
          });
        }
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
    .address {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: white;
      align-items: center;
      .tip {
        padding: 5px 0;
      }
      .info {
        width: calc(100% - 20px);
        padding: 5px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        a {
          margin-bottom: 5px;
          span {
            color: #444444;
            font-size: 14px;
            margin-left: 10px;
          }
        }
      }
      .right {
        width: 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .border {
      background-color: white;
      width: 100%;
      height: 5px;
      background-image: url("../../assets/images/border.png");
    }
    .store {
      width: 100%;
      padding: 10px;
      font-size: 13px;
      color: grey;
      box-sizing: border-box;
      background-color: white;
    }
    .commodity {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      .left {
        width: 100px;
        height: 100px;
        background-position: center;
        background-size: cover;
      }
      .right {
        width: calc(100% - 100px);
        height: 100%;
        padding: 5px;
        box-sizing: border-box;
        .title {
          font-size: 13px;
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
          font-size: 13px;
          margin-top: 10px;
        }
        .price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          a:first-child {
            color: red;
          }
          a:last-child {
            color: #444444;
          }
        }
      }
    }

    .num {
      width: 100%;
      padding: 10px;
      color: #444444;
      box-sizing: border-box;
      background-color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .number {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        input {
          width: 30px;
          border: none;
          text-align: center;
        }
        .pre, .next {
          width: 30px;
          height: 30px;
          background-color: gainsboro;
          display: flex;
          flex-direction: row;
          justify-content: center;
          font-size: 20px;
          align-items: center;
        }
      }
    }

    .total {
      width: 100%;
      padding: 10px;
      color: #444444;
      box-sizing: border-box;
      background-color: white;
      display: flex;
      flex-direction: column;
      .price {
        width: 100%;
        span {
          color: red;
        }
        text-align: right;
      }
      .express {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span {
          color: red;
        }
      }
    }

    .bottom {
      width: 100%;
      height: 50px;
      z-index: 5555;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: row;
      background-color: white;
      justify-content: flex-end;
      align-items: center;
      .price {
        max-width: calc(100% - 100px);
        padding: 0 20px;
        span {
          color: red;
        }
      }
      .button {
        width: 100px;
        background-color: red;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }
  }
</style>
