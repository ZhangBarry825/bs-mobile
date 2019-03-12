<template>
  <div class="content">

    <div class="top">
      新增地址
    </div>

    <div class="items">
      <div class="item">
        <div class="left">收货人:</div>
        <div class="right">
          <input type="text">
        </div>
      </div>
      <div class="item">
        <div class="left">手机号码:</div>
        <div class="right">
          <input type="number">
        </div>
      </div>
      <div class="item">
        <div class="left">省份:</div>
        <div class="right">
          <select name="" id="">
            <option value="1">北京</option>
          </select>
        </div>
      </div>
      <div class="item">
        <div class="left">城市:</div>
        <div class="right">
          <select name="" id="">
            <option value="1">北京市</option>
          </select>
        </div>
      </div>
      <div class="item">
        <div class="left">区县:</div>
        <div class="right">
          <select name="" id="">
            <option value="1">海淀区</option>
            <option value="1">昌平区</option>
          </select>
        </div>
      </div>

      <div class="item">
        <div class="left">详细地址:</div>
        <div class="right">
          <input type="text">
        </div>
      </div>

      <div class="item">
        <div class="button" @click="submit">确认提交</div>
      </div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  export default {
    name: "Add",
    components:{
      GoBack:GoBack
    },
    methods:{
      submit(){
        this.$router.go(-1);
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
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }
    .items{
      width: 100%;
      background-color: white;
      padding: 10px;
      box-sizing: border-box;
      .item{
        width: 100%;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        padding: 5px 0;
        .left{
          width: 80px;
        }
        .right{
          input{
            border: none;
          }
          select{
            width: 100px;
          }
        }
        .button{
          margin-top: 10px;
          width: 100%;
          border-radius: 5px;
          background-color: #FF6735;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6px 0;
        }
      }
      .item:last-child{
        border-bottom: none;
      }
    }
  }
</style>
