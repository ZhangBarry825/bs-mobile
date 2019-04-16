<template>
  <div class="content">
    <div class="top">
      提现申请
    </div>
    <div class="detail">
      <div class="tip">
        <a>可提现佣金：<span>￥{{info.commission}}</span></a>
      </div>
      <div class="form">
        <div class="clarify">申请提现后，系统会自动扣除您提现的总金额的1.00%的手续费，99%店主会手动将钱打入您的账号；若全部转入余额则不扣除手续费。</div>
        <div class="type">
          <a>提现方式</a>
          <Select v-model="type" style="width:200px;border: none;">
            <Option value="1">转入余额</Option>
            <Option value="2" disabled>银行卡转账</Option>
            <Option value="3" disabled>支付宝转账</Option>
            <Option value="4" disabled>微信转账</Option>
          </Select>
        </div>
        <div class="type" v-if="type==3 && type==4">
          <a>账号:</a>
          <input type="text">
        </div>
        <div class="type" v-if="type==2">
          <a>户名:</a>
          <input type="text">
        </div>
        <div class="type" v-if="type==2">
          <a>开户行:</a>
          <input type="text">
        </div>
        <div class="type">
          <a>提现金额:</a>
          <Input v-model="account" placeholder="请输入提现金额" type="number" style="width:200px;border: none;"/>
        </div>
      </div>
      <div class="submit">
        <div class="button" @click="applySubmit">申请提现</div>
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
    name: "Encash",
    components: {
      BottomBar: BottomBar,
      GoBack: GoBack,
    },
    data() {
      return {
        type: '',
        info:{},
        account:''
      }
    },
    methods:{
      getInfo(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/user/info', {
        }, (response, all) => {
          localStorage.setItem('info',JSON.stringify(response.data))
          this.info = response.data
          this.info.avatar = this.GLOBALDATA.serverUrl+'/' + response.data.avatar
        })
      },
      applySubmit(){
        if(this.type==''){
          this.$Modal.warning({
            title: '提示',
            content: '请选择提现方式！',
          })
        }else if(this.account==''){
          this.$Modal.warning({
            title: '提示',
            content: '请输入提现金额！',
          })
        }else if(this.account>this.info.commission){
          this.$Modal.warning({
            title: '提示',
            content: '提现金额大于可提现佣金！',
          })
        }else {
          dataPost(this.GLOBALDATA.serverUrl+'/home/encash/newEncash', {
            nickname:this.info.nickname,
            membership_id:this.info.membership_id,
            account:this.account,
            encash_type:this.type,
          }, (response, all) => {
            console.log(response.data)
            this.$Modal.success({
              title:'提示',
              content:'提现申请成功！等待审核通过'
            })
          })
        }
      }
    },
    mounted(){
      let info = JSON.parse(localStorage.getItem('info'))
      this.info = info
      this.getInfo()
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
    .detail {
      font-size: 15px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      .tip {
        width: 100%;
        a {

        }
        span {
          color: red;
        }
      }
      .form {
        margin-top: 10px;
        width: 100%;
        background-color: white;
        div {
          box-sizing: border-box;
          padding: 5px 10px;
          border-bottom: 1px solid gainsboro;
        }
        .type {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          a {
            width: 80px;
            display: block;
          }
          select, input {
            border: 1px solid grey;
            height: 25px;
            font-size: 14px;
          }
        }
      }
      .submit{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        .button{
          width: 90%;
          background-color: #169bd5;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius:5px ;
          height: 40px;
        }
      }
    }

  }
</style>
