<template>
  <div class="content">
    <div class="top">
      <div class="message">
        <img src="../../assets/images/xiaoxi_X.png" @click="goMessage">
      </div>
      <div class="identity">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+info.avatar+')'"></div>
          <div class="nickname">
            <a>会员ID:{{info.membership_id}}</a>
            <a>{{info.nickname}}的店</a>
          </div>
        </div>
        <div class="right">
          <span>V</span>
          <a>普通分销商</a>
        </div>
      </div>
      <div class="turnover">
        <div class="left">
          <a>累计营销额（元）</a>
          <h2>{{info.sale_account}}</h2>
        </div>
        <div class="middle"></div>
        <div class="right">
          <a>累计营佣金（元）</a>
          <h2>{{info.commission+encashList.success_account}}</h2>
        </div>
      </div>
    </div>
    <div class="pay">
      <div class="num">
        <a>可提现佣金</a>
        <h2>￥{{info.commission}}</h2>
      </div>
      <div class="button" @click="encash">提现</div>
    </div>
    <div class="items">
      <div class="item" @click="QRcode">
        <img src="../../assets/images/ewm1.png">
        <a>二维码</a>
      </div>
      <div class="item" @click="commission">
        <img src="../../assets/images/cw_xx.png">
        <a>佣金明细</a>
      </div>
      <div class="item" @click="membership">
        <img src="../../assets/images/td.png">
        <a>我的客户</a>
      </div>
      <div class="item" @click="team">
        <img src="../../assets/images/jw.png">
        <a>我的团队</a>
      </div>
    </div>

    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="3"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Sale",
    components: {
      BottomBar: BottomBar
    },
    data() {
      return {
        info: {},
        encashList:{}
      }
    },
    methods: {
      membership() {
        this.$router.push({path: '/membership'})
      },
      QRcode() {
        this.$router.push({path: '/qrcode'})
      },
      team() {
        this.$router.push({path: '/team'})
      },
      commission() {
        this.$router.push({path: '/commission'})
      },
      encash() {
        this.$router.push({path: '/encash'})
      },
      goMessage() {
        this.$router.push({path: '/message'})
      },
      getInfo() {
        dataPost('/api/home/user/info', {
        }, (response, all) => {
          localStorage.setItem('info',JSON.stringify(response.data))
          this.info = response.data
          this.info.avatar = '/api/' + response.data.avatar
          this.judgeCondition()
        })
      },
      judgeCondition(){
        console.log('检测',this.info.status)
        if(this.info.status!=2){
          this.$router.push({path: '/apply'})
        }
      },
      getEncashList(){
        dataPost('/api/home/encash/getEncash', {
          membership_id:this.info.membership_id
        }, (response, all) => {
          console.log(response.data,963)
          this.encashList=response.data
        })
      }
    },
    mounted() {
      let info = JSON.parse(localStorage.getItem('info'))
      this.info = info
      this.getInfo()
      this.getEncashList()

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
      a {
        color: white;
      }
      width: 100%;
      background-color: #21b4f8;
      .message {
        width: 100%;
        text-align: right;
        padding: 10px;
        box-sizing: border-box;
        img {
          width: 25px;
          height: 25px;
        }
      }
      .identity {
        color: white;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        .left {
          padding-left: 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .nickname {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            justify-content: center;
            a:first-child {
              margin-bottom: 5px;
            }
          }

        }
        .right {
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          a {
            font-size: 12px;
            padding: 2px 5px;
            background-color: rgba(0, 0, 0, 0.2);
          }
          span {
            font-style: italic;
            border-radius: 3px;
            padding: 1px 3px;
            width: 20px;
            background-color: #e9cc0b;
            box-sizing: border-box;
            font-family: "宋体";
            font-size: 16px;
            font-weight: bold;
            color: #fff;
          }
        }
      }
      .turnover {
        width: 100%;
        height: 80px;
        margin-top: 20px;
        background-color: rgba(33, 162, 221, 0.8);
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        color: white;
        .left {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          a {
            font-size: 15px;
          }
          h2 {
            margin-top: 5px;
            font-size: 20px;
            font-family: 宋体;
          }
        }
        .middle {
          width: 0;
          height: 60px;
          border-left: 1px solid white;
        }
        .right {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          a {
            font-size: 15px;
          }
          h2 {
            margin-top: 5px;
            font-size: 20px;
            font-family: 宋体;
          }
        }
      }
    }
    .pay {
      width: 100%;
      height: 80px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      .num {
        font-size: 15px;
        a {

        }
        h2 {
          margin-top: 3px;
          color: red;
          font-family: 宋体;
          font-size: 23px;
        }
      }
      .button {
        font-size: 15px;
        background-color: #21b4f8;
        color: white;
        padding: 4px 12px;
      }
    }
    .items {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      background-color: white;
      box-sizing: border-box;
      .item {
        width: 33.3%;
        height: 100px;
        border: 1px solid gainsboro;
        box-sizing: border-box;
        border-top: none;
        border-right: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
        }
        a {
          font-size: 15px;
          margin-top: 5px;
        }
      }
      .item:last-child {
        border-right: 1px solid gainsboro;
      }
    }
  }
</style>
