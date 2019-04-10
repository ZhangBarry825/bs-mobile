<template>
  <div class="content">
    <div class="top">
      确认支付
    </div>
    <div class="items">
      <div class="item">
        <div class="title">订单信息</div>
        <div class="line">订单号：{{orderDetail.order_id}}</div>
        <div class="line">收货人：{{orderDetail.contacts}}</div>
        <div class="line">联系方式：{{orderDetail.phone}}</div>
        <div class="line">收货地址：{{orderDetail.address}}</div>
      </div>

      <div class="item">
        <div class="title">明细</div>
        <div class="line">快递费用：<span>￥{{orderDetail.express_cost}}</span></div>
        <div class="line">订单金额：<span>￥{{orderDetail.price - orderDetail.express_cost}}</span></div>
      </div>

      <div class="item payType">
        <div class="title">选择支付方式</div>
        <div class="line">
          <div class="box">
            <img src="../../assets/images/cw_xx.png">
            <a>余额支付</a>
          </div>
          <input type="radio" value="1" id="score1" checked>
        </div>
      </div>
    </div>


    <div class="goods">
      <div class="item" v-for="(item,index) in orderDetail.goods">
        <div class="line commodity">
          <div class="left" :style="'background-image: url('+item.pic1+')'"></div>
          <div class="right">
            <div class="title">{{item.name}}</div>
            <div class="type">淡蓝色-Large</div>
            <div class="price">
              <span>￥{{item.price}}</span>
              <a>x{{item.num}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="bottom">
      <div class="tip">应支付：<span>￥{{orderDetail.price}}</span></div>
      <div class="right">
        <div class="cancel" @click="cancelOrder">取消订单</div>
        <div class="pay" @click="submit">支付</div>
      </div>
    </div>
    <div class="blank" style="width: 100%;height: 50px"></div>
    <GoBack :goHome="true"></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Pay",
    components: {
      GoBack: GoBack
    },
    data() {
      return {
        order_id: '',
        orderDetail: {}
      }
    },
    methods: {
      cancelOrder(){
        this.$Modal.confirm({
          title: '注意',
          content: '确定取消订单吗？',
          onOk:()=>{
            dataPost('/api/home/order/delete', {
              id: [this.orderDetail.id],
            }, (response, all) => {
              this.$router.push({path: '/mine'})
            });
          },
          onCancel:()=>{
            console.log('否')
          }
        });
      },
      submit() {
        dataPost('/api/home/order/update', {
          id: this.orderDetail.id,
          status: 1,
        }, (response, all) => {
          console.log(response.data, 555)
          this.$Modal.success({
            title: '成功',
            content: '支付成功！',
            onOk:()=>{
              this.$router.push({path: '/mine'})
            }
          });

        });

        // this.$router.push({path: '/mine'})
      },
      getDetail() {
        dataPost('/api/home/order/detail', {
          order_id: this.order_id
        }, (response, all) => {
          console.log(response.data, 555)
          this.orderDetail = response.data
        });
      }
    },
    mounted() {
      console.log(this.$route.params.order_id, 1)
      this.order_id = this.$route.params.order_id

      this.getDetail()
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
      color: #262626;
    }
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }

    .items {
      width: 100%;
      padding: 10px;
      padding-bottom: 0;
      box-sizing: border-box;
      .item:last-child {
        margin-bottom: 0;
      }
      .item {
        width: 100%;
        border-radius: 5px;
        background-color: white;
        padding: 5px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border: 1px solid gainsboro;
        .title {
          width: 100%;
          border-bottom: 1px solid gainsboro;
          display: flex;
          align-items: center;
          height: 30px;
          font-weight: bold;
        }
        .line {
          width: 100%;
          border-bottom: 1px solid gainsboro;
          display: flex;
          align-items: center;
          padding: 10px 0;
          font-size: 13px;
          span {
            color: red;
          }
        }
        .line:last-child {
          border-bottom: none;
        }
      }

      .payType {
        justify-content: space-between;
        align-items: center;
        .line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          box-sizing: border-box;
          .box {
            display: flex;
            align-items: center;
            height: 100%;
            img {
              width: 25px;
              height: 25px;
            }
            a {
              margin-left: 5px;
            }
          }
        }
        input {
          margin-right: 10px;
        }
      }
    }
    .goods {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      .item {
        background-color: white;
        width: 100%;
        border: 1px solid gainsboro;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-size: 13px;
        padding: 5px;
        .line {
          padding: 5px 0;
          width: 100%;
          border-bottom: 1px solid gainsboro;
          .price {
            color: red;
            font-weight: bold;
          }
        }
        .commodity {
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
        .line:last-child {
          border-bottom: none;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 50px;
      background-color: white;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      padding: 5px;
      box-sizing: border-box;
      .tip {
        color: #444444;
        span {
          color: red;
          font-size: 20px;
        }
      }
      .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .cancel {
          margin-right: 10px;
          color: grey;
        }
        .pay {
          width: 100px;
          height: 30px;
          background-color: #FF6735;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

    }
  }

</style>
