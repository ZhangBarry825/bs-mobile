<template>
  <div class="content">
    <div class="top">
      购物车
    </div>
    <div class="items-trolley">
      <!--<div class="empty">-->
        <!--<img src="../../assets/images/cart.png">-->
        <!--<a>您的购物车是空的，您可以先</a>-->
        <!--<a class="a2">逛逛首页</a>-->
      <!--</div>-->
      <div class="item">
        <div class="check">
          <input type="checkbox">
        </div>
        <div  @click="goDetail" class="left" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
        <div  @click="goDetail" class="right">
          <div class="title">Gucci️18ss酒神系列最新链条款</div>
          <div class="type">浅蓝色-Normal</div>
          <div class="price">￥552</div>
        </div>
      </div>

      <div class="item">
        <div class="check">
          <input type="checkbox">
        </div>
        <div  @click="goDetail" class="left" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
        <div  @click="goDetail" class="right">
          <div class="title">Gucci️18ss酒神系列最新链条款</div>
          <div class="type">浅蓝色-Normal</div>
          <div class="price">￥552</div>
        </div>
      </div>

      <div class="item">
        <div class="check">
          <input type="checkbox">
        </div>
        <div  @click="goDetail" class="left" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
        <div  @click="goDetail" class="right">
          <div class="title">Gucci️18ss酒神系列最新链条款</div>
          <div class="type">浅蓝色-Normal</div>
          <div class="price">￥552</div>
        </div>
      </div>


      <div class="total">
        <a>合计：<span>￥225</span></a>
        <div class="submit">结算</div>
      </div>
    </div>

    <div class="suggestion">
      <div class="title">---猜你喜欢---</div>
      <div class="items">
        <div class="item" @click="goDetail">
          <div class="pic" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="title">2018新款百搭斜挎包水貂毛口袋包链条包单肩包</div>
          <div class="price">￥228.5</div>
        </div>
        <div class="item"  @click="goDetail">
          <div class="pic" :style="'background-image: url('+require('../../assets/images/5c14791447.jpg')+')'"></div>
          <div class="title">Gucci️18ss酒神系列最新链条款</div>
          <div class="price">￥228.5</div>
        </div>
        <div class="item"  @click="goDetail">
          <div class="pic" :style="'background-image: url('+require('../../assets/images/5c6e6d31e4.jpg')+')'"></div>
          <div class="title">2018新款百搭斜挎包水貂毛口袋包链条包单肩包</div>
          <div class="price">￥228.5</div>
        </div>
        <div class="item"  @click="goDetail">
          <div class="pic" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="title">Gucci️18ss酒神系列最新链条款</div>
          <div class="price">￥228.5</div>
        </div>
        <div class="item"  @click="goDetail">
          <div class="pic" :style="'background-image: url('+require('../../assets/images/5c14791447.jpg')+')'"></div>
          <div class="title">2018新款百搭斜挎包水貂毛口袋包链条包单肩包</div>
          <div class="price">￥228.5</div>
        </div>
        <div class="item"  @click="goDetail">
          <div class="pic" :style="'background-image: url('+require('../../assets/images/5c14791447.jpg')+')'"></div>
          <div class="title">2018新款百搭斜挎包水貂毛口袋包链条包单肩包</div>
          <div class="price">￥228.5</div>
        </div>

      </div>
    </div>

    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="4"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";

  export default {
    name: "Trolley",
    components: {
      BottomBar: BottomBar
    },
    methods:{
      goDetail(){
        this.$router.push({path: '/commodity'})
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
    .items-trolley {
      width: 100%;
      background-color: white;
      min-height: 200px;
      padding: 10px 0;
      .empty {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 200px;
          height: auto;
        }
        a {

        }
        .a2 {
          border: 1px solid #e30e0e;
          color: #e30e0e;
          padding: 1px 5px;
          margin-top: 10px;
          border-radius: 5px;
        }
      }
      .item{
        width: 100%;
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border-radius:10px;
        margin-bottom: 5px;
        .check{
          width: 20px;
          height: 80px;
          display: flex;
          flex-direction: row;
          align-items: center;
          input{
            width: 15px;
            height: 15px;
          }
        }
        .left{
          width: 80px;
          height: 80px;
          border-radius: 3px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .right{
          width:-webkit-calc(100% - 100px);
          width:-moz-calc(100% - 100px);
          width:calc(100% - 100px);
          height: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title{
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-size: 15px;
          }
          .type{
            font-size: 13px;
            color: grey;
          }
          .price{
            color: red;
          }
        }
      }
      .item:first-child{
        border-top: none;
      }
      .total{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        width: 100%;
        text-align: right;
        align-items: center;
        a{
          span{
            color: red;
          }
        }
        .submit{
          background-color: #ff784c;
          color: white;
          padding: 7px 12px;
          border-radius: 10px;
          margin-left: 15px;
          margin-right: 15px;
        }
      }
    }
    .suggestion {
      width: 100%;
      .title {
        width: 100%;
        text-align: center;
        padding: 10px 0;
        color: #e30e0e;
      }
      .items {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
        .item {
          background-color: white;
          height: 220px;
          width: 50%;
          border: 10px solid #f8f8f8;
          box-sizing: border-box;
          margin: 0;
          border-top: 5px solid #f8f8f8;
          border-bottom: 5px solid #f8f8f8;
          display: flex;
          flex-direction: column;
          .pic {
            width: 100%;
            height: 140px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .title {
            color: black;
            text-align: left;
            padding: 2px;

            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .price {
            font-size: 20px;
            color: red;
            padding: 5px 0;
          }
        }
        .item:nth-child(n) {
          border-right: 5px solid #f8f8f8;
        }
        .item:nth-child(2n) {
          border-left: 5px solid #f8f8f8;
          border-right: 10px solid #f8f8f8;
        }

      }
    }
  }

</style>
