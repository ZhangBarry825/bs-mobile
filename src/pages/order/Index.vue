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
      <div class="empty" v-if="!orderNow.count>0">
        <img src="../../assets/images/order.png">
        <a>暂无订单</a>
      </div>
      <div class="item" v-for="(item,index) in orderNow.rows">
        <div class="orderNum" @click="goDetail">
          <a>订单号：{{item.order_id}}</a>
        </div>
        <div class="goods" v-for="(item1,index1) in item.goods" @click="goGoods(item1)">
          <div class="left" :style="'background-image: url('+item1.pic1+')'"></div>
          <div class="right">
            <div class="title">{{item1.name}}</div>
            <div class="type">{{item1.type}}</div>
            <div class="price">
              <span>￥{{item1.price}}</span>
              <a>x{{item1.num}}</a>
            </div>
          </div>
        </div>
        <div class="total">
          <a>合计：</a>
          <span>￥{{item.price-item.express_cost}}</span>
        </div>
        <div class="buttons">
          <div class="button" v-if="toggle!=4 && toggle!=5 && toggle!=3" @click="cancelOrder(item)">取消订单</div>
          <div class="button" v-if="toggle==3" @click="refundOrder(item)">申请退货</div>
          <!--<div class="button" v-if="toggle==4">申请退货</div>-->
          <div class="button" v-if="toggle==5">退货中</div>
          <div class="button confirm" v-if="toggle==3" @click="confirmGoods(item)">确认收货</div>
          <div class="button confirm" v-if="toggle==1" @click="goPay(item)">付款</div>
        </div>
      </div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import Address from "../../components/Address";
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Order",
    data() {
      return {
        refund_express_company:5,
        refund_express_code:'',
        toggle: 1,
        info: '',
        orderOne: {},
        orderTwo: {},
        orderThree: {},
        orderFour: {},
        orderFive: {},
        orderNow: {
          count:0,
          rows:[]
        }
      }
    },
    methods: {
      toggleTab(val) {
        this.toggle = val
        switch (this.toggle) {
          case 1:
            this.orderNow = this.orderOne
            break;
          case 2:
            this.orderNow = this.orderTwo
            break;
          case 3:
            this.orderNow = this.orderThree
            break;
          case 4:
            this.orderNow = this.orderFour
            break;
          case 5:
            this.orderNow = this.orderFive
            break;
        }
        console.log(this.orderNow)
      },
      goDetail() {
        this.$router.push({path: '/orderdetail'})
      },
      goGoods(item){
        this.$router.push({path: '/commodity?goods_id=' + item.goods_id})
      },
      confirmGoods(item){
        this.$Modal.confirm({
          title: '注意',
          content: '是否确认收货？',
          onOk:()=>{
            dataPost('/api/home/order/update', {
              id: item.id,
              status:3,
              querenshouhuo:true
            }, (response, all) => {
              this.fetchDetail()
              console.log(response)
            });
          }
        });
      },
      goPay(item) {
        this.$router.push({
          name: 'Pay',
          params: {
            order_id: item.order_id
          }
        })

      },
      fetchDetail() {
        dataPost('/api/home/order/listCount', {
          membership_id: this.info.membership_id
        }, (response, all) => {
          console.log(response.data)
          this.orderOne = response.data['result0']
          this.orderTwo = response.data['result1']
          this.orderThree = response.data['result2']
          this.orderFour = response.data['result3']
          this.orderFive = response.data['result4']

          switch (this.toggle) {
            case 1:
              this.orderNow = this.orderOne
              break;
            case 2:
              this.orderNow = this.orderTwo
              break;
            case 3:
              this.orderNow = this.orderThree
              break;
            case 4:
              this.orderNow = this.orderFour
              break;
            case 5:
              this.orderNow = this.orderFive
              break;
          }
        });

      },
      refundOrder(item){
        this.$Modal.confirm({
          title: '注意',
          content: '确定申请退货吗？',
          onOk:()=>{
            dataPost('/api/home/order/update', {
              id:item.id,
              status:4
            }, (response, all) => {
              console.log(response)
            });
          }
        });
        console.log(item)
      },
      cancelOrder(item){
        console.log(item)
        this.$Modal.confirm({
          title: '注意',
          content: '确定取消订单吗？',
          onOk:()=>{
            dataPost('/api/home/order/delete', {
              id: [item.id],
            }, (response, all) => {
              this.fetchDetail()
            });
          }
        });
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
      this.info = JSON.parse(localStorage.getItem('info'))
      this.fetchDetail()
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
      a {
        color: black;
      }
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
      .item {
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
        .orderNum {
          width: 100%;
          border-bottom: 1px solid gainsboro;
          padding: 5px 0;
          box-sizing: border-box;
          font-size: 14px;
        }
        .goods {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          padding: 10px 0;
          box-sizing: border-box;
          .left {
            height: 70px;
            width: 70px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 5px;
          }
          .right {
            padding-left: 5px;
            box-sizing: border-box;
            width: calc(100% - 70px);
            height: 100%;
            .title {
              width: 100%;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .type {
              width: 100%;
              color: grey;
              margin-top: 5px;
            }
            .price {
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
              span {
                color: red;
              }
            }
          }
        }
        .total {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          border-bottom: 1px solid gainsboro;
          padding-bottom: 10px;
          box-sizing: border-box;
          span {
            color: red;
          }
        }
        .buttons {
          width: 100%;
          margin-top: 5px;
          padding: 5px 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-end;
          .button {
            font-size: 15px;
            margin-left: 5px;
            padding: 2px 10px;
            border: 1px solid grey;
            color: grey;
            border-radius: 14px;
          }
          .confirm {
            color: #ff6702;
            border: 1px solid #ff6702;
          }
        }
      }
    }
  }
</style>
