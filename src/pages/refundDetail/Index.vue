<template>
  <div class="content">
    <div class="top">
      退货信息
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
        <div class="line">
          <a>订单备注:</a>
          <a class="price">{{orderDetail.remark}}</a>
        </div>
      </div>
      <div class="item">
        <div class="line">
          <a>商家收货人:</a>
          <a>{{orderDetail.refund_contacts}}</a>
        </div>
        <div class="line">
          <a>商家电话:</a>
          <a>{{orderDetail.refund_phone}}</a>
        </div>
        <div class="line">
          <a>商家地址:</a>
          <a>{{orderDetail.refund_address}}</a>
        </div>
      </div>
      <div class="item">
        <div class="line">
          <a class="title">退货信息:</a>
          <a></a>
        </div>
        <div class="line">
          <a>快递公司:</a>
          <div class="right">
            <Select v-model="orderDetail.refund_express_company" style="width:200px">
              <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="line">
          <a>快递编号:</a>
          <div class="right">
            <Input v-model="orderDetail.refund_express_code" placeholder="请输入快递编号..." type="number" style="width: 300px" />
          </div>
        </div>
      </div>
      <div class="saveButton" @click="submitForm">保存</div>
    </div>

    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";
  import {parseTime} from "../../../plugins/functions";

  export default {
    name: "RefundDetail",
    components: {
      GoBack: GoBack,
    },
    data(){
      return{
        order_id:'',
        orderDetail:{

        },
        postForm:{
          refund_express_code:'',
          refund_express_company:'',
        },
        companyList: [
          {
            value: 1,
            label: '顺丰快递'
          },
          {
            value: 2,
            label: '中通快递'
          },
          {
            value: 3,
            label: '圆通快递'
          },
          {
            value: 4,
            label: '申通快递'
          },
          {
            value: 5,
            label: '其他'
          }
        ],
        model1: ''
      }
    },
    methods:{
      submitForm(){
        this.postForm.refund_express_company=this.orderDetail.refund_express_company
        this.postForm.refund_express_code=this.orderDetail.refund_express_code
        console.log(this.postForm)
        if(this.postForm.refund_express_company==''){
          this.$Modal.warning({
            title: '提醒',
            content: '请选择快递公司！'
          });
        }else if(this.postForm.refund_express_code==''){
          this.$Modal.warning({
            title: '提醒',
            content: '请填写快递编号！'
          });
        }else {
          dataPost('/api/home/order/update', {
            id: this.orderDetail.id,
            refund_express_company: this.postForm.refund_express_company,
            refund_express_code: this.postForm.refund_express_code,
            refund_address: this.orderDetail.refund_address,
            refund_contacts: this.orderDetail.refund_contacts,
            refund_phone: this.orderDetail.refund_phone,
            status: 5,
          }, (response, all) => {
            this.$Modal.info({
              title: '提示',
              content: '保存成功！',
            })
            console.log(response)
          });

        }

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
          display: flex;
          flex-direction: row;
          align-items: center;
          .title{
            font-weight: bold;
            font-size: 14px;
          }
          .price{
            color: red;
            font-weight: bold;
          }
          .right{
            margin-left: 10px;
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
      .saveButton{
        margin-top: 10px;
        background-color: #ff6633;
        color: white;
        width: 100%;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-sizing: border-box;
        font-size: 15px;
        padding: 7px 0;
      }
    }
  }
</style>
