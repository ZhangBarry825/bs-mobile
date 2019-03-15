<template>
  <div class="content">
    <div class="top">
      我的地址
    </div>

    <div class="items">
      <div class="item">
        <div class="name">老白</div>
        <div class="detail">
          <a>老白<span>1008611</span></a>
          <a class="address">北京北京市海淀区上地三街嘉华大厦XXX号北京北京市海淀区上地三街嘉华大厦XXX号</a>
        </div>
      </div>

      <div class="item">
        <div class="name">燕小六</div>
        <div class="detail">
          <a>燕小六<span>1008611</span></a>
          <a class="address">北京北京市海淀区上地三街嘉华大厦XXX号</a>
        </div>
      </div>
      <!--<div class="empty">-->
      <!--<img src="../../assets/images/commission.png">-->
      <!--<a>暂无佣金记录</a>-->
      <!--</div>-->
    </div>

    <div class="add" @click="addAddress">
      <div class="button">添加</div>
    </div>

    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="5"></BottomBar>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import GoBack from "../../components/GoBack";
  export default {
    name: "Address",
    components: {
      BottomBar: BottomBar,
      GoBack: GoBack,
    },
    methods:{
      addAddress(){
        this.$router.push({path: '/addaddress'})
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
    .items {
      width: 100%;

      .item {
        width: 100%;
        background-color: white;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 5px;
        .name {
          width: 50px;
          height: 50px;
          border-radius: 100%;
          background-color: gainsboro;
          color: white;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .detail {
          max-width: calc(100% - 60px);
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          a {
            span {
              font-size: 13px;
              margin-left: 10px;
              color: grey;
            }
          }
          .address{
            font-size: 13px;
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

    .add{
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      .button{
        width: 90%;
        border-radius: 5px;
        background-color: #169bd5;
        padding: 10px;
        text-align: center;
        color: white;
      }
    }
  }
</style>
