<template>
  <div class="content">
    <div class="top">
      佣金明细
    </div>
    <div class="toggle">
      <div class="left" @click="toggleTab(1)" v-bind:class="{ active: toggle }">收入</div>
      <div class="right" @click="toggleTab(0)" v-bind:class="{ active: !toggle }">支出</div>
    </div>
    <div class="items">
      <div class="item" v-if="!toggle" v-for="(item,index) in encashList.rows">
        <div class="left">
          <a>日期： {{item.create_time|timeF}}</a>
          <a>金额： <span>￥{{item.account}}</span></a>
          <a>类型： 佣金提现</a>
          <a>状态： {{item.status|statusF}}</a>
        </div>
      </div>
      <div class="item" @click="goDetail(item)" v-if="toggle" v-for="(item,index) in receiveList.rows">
        <div class="left">
          <a>日期： {{item.create_time|timeF}}</a>
          <a>金额： <span>￥{{item.commission_receive}}</span></a>
          <a>类型： 佣金入账</a>
          <a>状态： 已完成</a>
        </div>
        <div class="right">
          <a>[订单详情]</a>
        </div>
      </div>
    </div>
    <div class="empty" v-if="(toggle && receiveList.rows.length==0)||(!toggle && encashList.rows.length==0)">
      <img src="../../assets/images/commission.png">
      <a>暂无记录</a>
    </div>
    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="3"></BottomBar>
    <GoBack></GoBack>

  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import BottomBar from "../../components/BottomBar";
  import {dataPost} from "../../../plugins/axiosFn";
  import {parseTime} from "../../../plugins/functions";

  export default {
    name: "Commission",
    components: {
      BottomBar: BottomBar,
      GoBack: GoBack,
    },
    data() {
      return {
        toggle: true,
        info: {},
        receiveList: {
          rows:[]
        },
        encashList: {
          rows:[]
        }
      }
    },
    methods: {
      toggleTab(val) {
        if (val) {
          this.toggle = true
        } else {
          this.toggle = false
        }
      },
      goDetail(item) {
        console.log(item)
        this.$router.push({
          path: '/orderdetail',
          query: {
            order_id: item.order_id
          }
        })
        // this.$router.push({path: '/orderDetail'})
      },
      getInfo() {
        dataPost('/api/home/user/info', {}, (response, all) => {
          localStorage.setItem('info', JSON.stringify(response.data))
          this.info = response.data
          this.info.avatar = '/api/' + response.data.avatar
        })
      },
      getReceive() {
        dataPost('/api/home/commission/lists', {
          membership_id: this.info.membership_id,
          page_size: 10,
          page_num: 1,
        }, (response, all) => {
          this.receiveList = response.data
          console.log(response.data, 875)
        })
      },
      getEncashList() {
        dataPost('/api/home/encash/getEncash', {
          membership_id: this.info.membership_id,
          // page_size:10,
          // page_num:1,
        }, (response, all) => {
          this.encashList = response.data
          console.log(response.data, 852)
        })
      }
    },
    mounted() {
      let info = JSON.parse(localStorage.getItem('info'))
      this.info = info
      this.getInfo()
      this.getReceive()
      this.getEncashList()
    },
    filters: {
      timeF(val) {
        return parseTime(val)
      },
      statusF(val) {
        if (val == 0) {
          return '申请中'
        }
        if (val == 1) {
          return '已打款'
        }
        if (val == 2) {
          return '已驳回'
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
    .toggle {
      display: flex;
      flex-direction: row;
      .left, .right {
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
    .empty {
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
  }
</style>
