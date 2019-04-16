<template>
  <div class="content">
    <div class="top">
      充值记录
    </div>
    <div class="items">
      <div class="item" v-for="(item, index) in chargeList.rows">
        <div class="left">
          <a>日期： {{item.create_time|formatF}}</a>
          <a>金额： <span>￥{{item.charge_account}}</span></a>
          <a>状态： 充值成功</a>
        </div>
        <div class="right">
          <a></a>
        </div>
      </div>
    </div>
    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="5"></BottomBar>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import GoBack from "../../components/GoBack";
  import {Message} from "element-ui";
  import {dataPost} from "../../../plugins/axiosFn";
  import {parseTime} from "../../../plugins/functions";

  export default {
    name: "BalanceHistory",
    components: {
      BottomBar: BottomBar,
      GoBack: GoBack,
    },
    data() {
      return {
        info: {},
        page_num:1,
        page_size:1000,
        chargeList:{}
      }
    },
    filters:{
      formatF(val){
        return parseTime(val)
      }
    },
    methods: {
      goList(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/charge/lists', {
          membership_id:this.info.membership_id,
          page_num:this.page_num,
          page_size:this.page_size,
        }, (response, all) => {
          console.log(response.data)
          this.chargeList=response.data
        });
      },
      getInfo(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/membership/getMembership', {
          id:this.info.id
        }, (response, all) => {
          console.log(response.data)
          this.info=response.data
        });
      }
    },
    mounted() {
      let info=JSON.parse(localStorage.getItem('info'))
      this.info=info
      this.getInfo()
      this.goList()
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
    a {
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
  }
</style>
