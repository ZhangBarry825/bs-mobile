<template>
  <div class="content">
    <div class="top">
      我的团队
    </div>
    <div class="toggle">
      <div class="left" @click="toggleTab(1)" v-bind:class="{ active: toggle }">一级成员</div>
      <div class="right" @click="toggleTab(0)" v-bind:class="{ active: !toggle }">二级成员</div>
    </div>

    <div class="items" v-if="toggle">
      <div class="empty" v-if="!levelTwo.length>0">
        <img src="../../assets/images/personnel.png">
        <a>暂无成员，去推广吧</a>
      </div>
      <div class="item" v-for="(item, index) in levelTwo">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+item.avatar+')'"></div>
          <div class="nickname">
            <a>会员ID：{{item.membership_id}}</a>
            <a>{{item.nickname}}</a>
          </div>
        </div>
        <div class="right">
          <a>销售总额：<span>￥{{item.sale_account}}</span></a>
          <!--<a>佣金反额：<span>￥</span></a>-->
          <a>反佣比例：<span>{{regulationDetail.level_two}}%</span></a>
        </div>
      </div>
    </div>
    <div class="items" v-if="!toggle">
      <div class="empty"v-if="!levelThree.length>0">
        <img src="../../assets/images/personnel.png">
        <a>暂无成员，去推广吧</a>
      </div>
      <div class="item"  v-for="(item, index) in levelThree">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c14791447.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>销售总额：<span>￥{{item.sale_account}}</span></a>
          <!--<a>佣金反额：<span>￥2552.5</span></a>-->
          <a>反佣比例：<span>{{regulationDetail.level_one}}%</span></a>
        </div>
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
  import {dataPost} from "../../../plugins/axiosFn";
  export default {
    name: "Team",
    components: {
      BottomBar: BottomBar,
      GoBack: GoBack,
    },
    data(){
      return{
        toggle:true,
        info: {},
        levelThree:[],
        levelTwo:[],
        regulationDetail:{}
      }
    },
    methods:{
      toggleTab(val){
        if(val){
          this.toggle=true
        }else {
          this.toggle=false
        }
      },
      getInfo() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/user/info', {
        }, (response, all) => {
          localStorage.setItem('info',JSON.stringify(response.data))
          this.info = response.data
          this.info.avatar = this.GLOBALDATA.serverUrl+'/' + response.data.avatar
        })
      },
      getMemberList(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/membership/getmembership', {
          id:this.info.id
        }, (response, all) => {
          console.log(response,852)
          this.levelTwo=response.data.levelTwo
          for (let i=0;i<response.data.levelTwo.length;i++){
            this.levelTwo[i].avatar=this.GLOBALDATA.serverUrl+this.levelTwo[i].avatar
          }
          this.levelThree=response.data.levelThree
          for (let i=0;i<response.data.levelThree.length;i++){
            this.levelThree[i].avatar=this.GLOBALDATA.serverUrl+this.levelThree[i].avatar
          }
        })
      },
      getRegulation() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/regulation/detail', {}, (response, all) => {
          console.log(response.data,123123)
          this.regulationDetail = response.data
        })
      },
    },
    mounted(){
      let info = JSON.parse(localStorage.getItem('info'))
      this.info = info
      this.getInfo()
      this.getMemberList()
      this.getRegulation()
    }
  }
</script>

<style scoped lang="less">
  .content{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #f8f8f8;
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
    .toggle{
      display: flex;
      flex-direction: row;
      .left,.right{
        height: 40px;
        width: 50%;
        background-color: gainsboro;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .active{
        background-color: #ff6702;
        color: white;
      }

    }
    .items{
      width: 100%;

      background-color: white;
      box-sizing: border-box;
      .item{
        border-left: 10px solid gainsboro;
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
      .empty{
        background-color: #f8f8f8;
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
  }
</style>

