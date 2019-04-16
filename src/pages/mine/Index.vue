<template>
  <div class="content">
    <div class="top">
      <div class="message">
        <img src="../../assets/images/xiaoxi_X.png" @click="goMessage">
      </div>
      <div class="identity">
        <div class="avatar" :style="'background-image: url('+info.avatar+')'" @click="goInfo"></div>
        <div class="nickname">普通会员</div>
      </div>
      <div class="buttons">
        <div class="button" @click="GoOrder(1)">
          <img src="../../assets/images/fk.png">
          <a>待付款</a>
          <div class="num" v-if="orders.result0.count>0">{{orders.result0.count}}</div>
        </div>
        <div class="button" @click="GoOrder(2)">
          <img src="../../assets/images/fh1.png">
          <a>待发货</a>
          <div class="num" v-if="orders.result1.count>0">{{orders.result1.count}}</div>
        </div>
        <div class="button" @click="GoOrder(3)">
          <img src="../../assets/images/fh.png">
          <a>待收货</a>
          <div class="num" v-if="orders.result2.count>0">{{orders.result2.count}}</div>
        </div>
        <div class="button" @click="GoOrder(4)">
          <img src="../../assets/images/qr.png">
          <a>已完成</a>
        </div>
        <div class="button" @click="GoOrder(5)">
          <img src="../../assets/images/pj.png">
          <a>售后</a>
        </div>
      </div>
    </div>
    <div class="items">
      <div class="item" @click="balance">
        <div class="left">
          <img src="../../assets/images/yue.png">
          <a>余额 <span>￥{{info.balance|numFilter}}</span></a>
        </div>
        <div class="right">></div>
      </div>
      <div class="item"  @click="CashBack">
        <div class="left">
          <img src="../../assets/images/tuih.png">
          <a>退款/售后 <span>查看详情</span></a>
        </div>
        <div class="right">></div>
      </div>
      <div class="item" @click="address">
        <div class="left">
          <img src="../../assets/images/dizhi.png">
          <a>地址管理 <span>点击修改</span></a>
        </div>
        <div class="right">></div>
      </div>
      <div class="item" @click="goSet">
        <div class="left">
          <img src="../../assets/images/pz.png">
          <a>设置 <span>完善个人资料</span></a>
        </div>
        <div class="right">></div>
      </div>
    </div>

    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="5"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Mine",
    data(){
      return{
        info:{},
        orders:{
          result:{
            count:0,
            rows:[],
          },
          result0:{
            count:0,
            rows:[],
          },
          result1:{
            count:0,
            rows:[],
          },
          result2:{
            count:0,
            rows:[],
          },
          result3:{
            count:0,
            rows:[],
          },
          result4:{
            count:0,
            rows:[],
          },
        }
      }
    },
    components: {
      BottomBar: BottomBar
    },
    methods:{
      balance(){
        this.$router.push({path: '/balance'})
      },
      address(){
        this.$router.push({path: '/address'})
      },
      goInfo(){
        this.$router.push({
          path: '/info'
        })
      },
      GoOrder(val){
        this.$router.push({
          name: 'Order',
          params: {
            type: val
          }
        })
      },
      CashBack(){
        this.$router.push({
          name: 'Order',
          params: {
            type: 5
          }
        })
      },
      goMessage(){
        this.$router.push({path: '/message'})
      },
      goSet(){
        this.$router.push({path: '/set'})
      },
      fetchDetail(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/user/info', {
        },(response, all)=>{
          console.log(response.data)
          this.info=response.data
          this.info.avatar=this.GLOBALDATA.absoluteUrl+'/'+response.data.avatar

          dataPost(this.GLOBALDATA.serverUrl+'/home/order/listCount', {
            membership_id:this.info.membership_id
          },(response, all)=>{
            console.log(response.data)
            this.orders=response.data
          });
        });
      },
      getInfo() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/user/info', {
        }, (response, all) => {
          localStorage.setItem('info',JSON.stringify(response.data))
          this.info = response.data
          this.info.avatar = this.GLOBALDATA.absoluteUrl+'/' + response.data.avatar
        })
      },
    },
    mounted(){
      let info = JSON.parse(localStorage.getItem('info'))
      this.info = info
      this.getInfo()
      this.fetchDetail()
    },
    filters: {
      numFilter(value) {
        let realVal = parseFloat(value).toFixed(2)
        return (realVal)
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
    .top{
      width: 100%;
      background-color: #21b4f8;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .message{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        padding-bottom: 0;
        box-sizing: border-box;
        img{
          width: 25px;
          height:  25px;
        }
      }
      .identity{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .avatar{
          border-radius: 100%;
          width: 65px;
          height: 65px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .nickname{
          padding: 2px 5px;
          margin-top: 10px;
          font-size: 13px;
          border-radius: 3px;
          color: white;
          background-color: #f5c70f;
        }

      }
      .buttons{
        margin-top: 10px;
        height: 65px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: rgba(33,162,221,0.8);
        color: white;
        box-sizing: border-box;
        .button{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 25%;
          position: relative;
          img{
            width: 30px;
            height: 30px;
          }
          a{
            font-size: 13px;
            margin-top: 1px;
            color: white;
          }
          .num{
            min-width: 15px;
            height: 15px;
            font-size: 13px;
            padding: 5px 5px ;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 15px;
            top: 5px;
            color: white;
            background-color: red;
            position: absolute;
            border-radius: 100%;
          }
        }
      }
    }
    .items{
      width: 100%;
      .item{
        width: 100%;
        height: 40px;
        background-color: white;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding:0 10px;
        box-sizing: border-box;
        .left{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          img{
            width: 30px;
            height: 30px;
          }
          a{
            padding-left: 10px;
            font-size: 15px;
            text-align: center;
            span{
              color: #9d9d9d;
              font-size: 14px;
            }
          }
        }
        .right{}
      }
    }
  }
</style>
