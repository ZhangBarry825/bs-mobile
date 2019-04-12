<template>
  <div class="content">
    <div class="top">
      我的客户
    </div>

    <div class="items">
      <div class="item" v-for="(item,index) in memberships">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+item.avatar+')'"></div>
          <div class="nickname">
            <a>会员ID：{{item.membership_id}}</a>
            <a>{{item.nickname}}</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥{{item.expense}}</span></a>
          <a>反佣金额：<span>￥{{item.refund_commission}}</span></a>
          <a>反佣比例：<span>{{regulationDetail.level_three}}%</span></a>
        </div>
      </div>

    </div>
    <div class="empty" v-if="!memberships.length>0">
      <img src="../../assets/images/personnel.png">
      <a>暂无客户，去推广吧</a>
    </div>
    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="3"></BottomBar>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Membership",
    components: {
      BottomBar: BottomBar,
      GoBack:GoBack
    },
    data(){
      return{
        info:{},
        memberships:[],
        regulationDetail:{}
      }
    },
    methods:{
      getMemberships(){
        dataPost('/api/home/membership/getMyMembership', {
          membership_id:this.info.membership_id
        }, (response, all) => {
          this.memberships=response.data
          for(let i=0;i<this.memberships.length;i++){
            this.memberships[i].avatar='/api'+this.memberships[i].avatar
          }
        })
      },
      getInfo() {
        dataPost('/api/home/user/info', {
        }, (response, all) => {
          localStorage.setItem('info',JSON.stringify(response.data))
          this.info = response.data
          this.info.avatar = '/api/' + response.data.avatar
        })
      },
      getRegulation() {
        dataPost('/api/home/regulation/detail', {}, (response, all) => {
          this.regulationDetail = response.data
        })
      },
    },
    mounted(){
      let info = JSON.parse(localStorage.getItem('info'))
      this.info = info
      this.getInfo()
      this.getMemberships()
      this.getRegulation()
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
      border-left: 10px solid gainsboro;
      background-color: white;
      box-sizing: border-box;
      .item{
        width: 100%;
        height: 100px;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: 15px;
        .left{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          .avatar{
            width: 60px;
            height: 60px;
            border-radius: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            margin: 0 10px;
          }
          .nickname{
            display: flex;
            flex-direction: column;
            justify-content: center;

            a:last-child{
              margin-top: 5px;
            }
          }
        }
        .right{
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 14px;
          padding-right: 10px;
          a{
            white-space:nowrap;
          }
          span{
            color: red;
          }
        }
      }
    }
    .empty{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 200px;
      img{
        width: 60px;
      }
      a{
        margin-top: 10px;
        font-size: 15px;
        color: gray;
      }
    }
  }
</style>
