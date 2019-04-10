<template>
  <div class="content">
    <div class="top">
      订单详情
    </div>

    <div class="items">
      <div class="item">
        <div class="line">
          <a>订单编号:</a>
          <a>{{orderDetail.order_id}}</a>
        </div>
        <div class="line">
          <a>下单时间:</a>
          <a>{{format(orderDetail.create_time)}}</a>
        </div>
        <div class="line" v-if="orderDetail.status>0">
          <a>付款时间:</a>
          <a>{{format(orderDetail.pay_time)}}</a>
        </div>
        <div class="line" v-if="orderDetail.status==7">
          <a>退款时间:</a>
          <a>{{format(orderDetail.refund_time)}}</a>
        </div>
        <div class="line">
          <a>订单状态:</a>
          <a>{{orderDetail.status|statusF}}</a>
        </div>
        <div class="line">
          <a>订单总价:</a>
          <a class="price">￥{{orderDetail.price}}</a>
        </div>
        <div class="line">
          <a>实际支付:</a>
          <a class="price" v-if="orderDetail.status>0">￥{{orderDetail.price}}</a>
          <a class="price" v-if="orderDetail.status==0">￥0.00</a>
        </div>
        <div class="line" v-if="orderDetail.status>1">
          <a>物流公司:</a>
          <a>{{orderDetail.express_company|ExpressF}}</a>
        </div>
        <div class="line"  v-if="orderDetail.status>1">
          <a>物流编号:</a>
          <a>{{orderDetail.express_code}}</a>
        </div>
        <div class="line">
          <a>订单备注:</a>
          <a class="price">{{orderDetail.remark}}</a>
        </div>
      </div>
      <div class="item">
        <div class="line">
          <a>收货人:</a>
          <a>{{orderDetail.contacts}}</a>
        </div>
        <div class="line">
          <a>联系电话:</a>
          <a>{{orderDetail.phone}}</a>
        </div>
        <div class="line">
          <a>收货地址:</a>
          <a>{{orderDetail.address}}</a>
        </div>
      </div>
      <div class="item" v-for="(item,index) in orderDetail.goods"  @click="goGoods(item)">
        <div class="line commodity">
          <div class="left" :style="'background-image: url('+item.pic1+')'"></div>
          <div class="right">
            <div class="title">{{item.name}}</div>
            <div class="type">{{item.type}}</div>
            <div class="price">
              <span>￥{{item.price}}</span>
              <a>x{{item.num}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";
  import {parseTime} from "../../../plugins/functions";

  export default {
    name: "OrderDetail",
    components: {
      GoBack: GoBack,
    },
    data(){
      return{
        order_id:'',
        orderDetail:{

        }
      }
    },
    methods:{
      goGoods(item) {
        this.$router.push({path: '/commodity?goods_id=' + item.goods_id})
      },
      format(val){
        return parseTime(val)
      },
      getDetail(){
        dataPost('/api/home/order/detail', {
          order_id: this.order_id,
        }, (response, all) => {
          console.log(response)
          this.orderDetail=response.data
        });
      }
    },
    mounted(){
      this.order_id=this.$route.query.order_id
      this.getDetail()
    },
    filters:{
      ExpressF:function(val){
        switch (val) {
          case 1:
            return "顺丰快递"
          case 2:
            return "中通快递"
          case 3:
            return "圆通快递"
          case 4:
            return "申通快递"
          case 5:
            return "其他"
          default :
            return ''
        }
      },
      statusF:(val)=>{
        switch (val) {
          case 0:
            return '待付款'
          case 1:
            return '待发货'
          case 2:
            return '待收货'
          case 3:
            return '已完成'
          case 4:
            return '待退款'
          case 5:
            return '商家同意退款'
          case 6:
            return '商家拒绝退款'
          case 7:
            return '已退款'
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
    .items{
      width: 100%;
      height: calc(100% - 86px);
      overflow: scroll;
      box-sizing: border-box;
      padding: 5px;
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
        .line{
          padding: 5px 0;
          width: 100%;
          border-bottom: 1px solid gainsboro;
          .price{
            color: red;
            font-weight: bold;
          }
        }
        .commodity{
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
        .line:last-child{
          border-bottom: none;
        }
      }
    }
  }
</style>
