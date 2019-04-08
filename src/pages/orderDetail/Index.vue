<template>
  <div class="content">
    <div class="top">
      订单详情
    </div>

    <div class="items">
      <div class="item">
        <div class="line">
          <a>订单编号:</a>
          <a>2225144566</a>
        </div>
        <div class="line">
          <a>下单时间:</a>
          <a>2019-2-21 12:22:02</a>
        </div>
        <div class="line">
          <a>订单状态:</a>
          <a>已付款</a>
        </div>
        <div class="line">
          <a>订单总价:</a>
          <a class="price">￥218</a>
        </div>
        <div class="line">
          <a>实际支付:</a>
          <a class="price">￥218</a>
        </div>
        <div class="line">
          <a>订单备注:</a>
          <a class="price"></a>
        </div>
      </div>
      <div class="item">
        <div class="line">
          <a>收货人:</a>
          <a>张三</a>
        </div>
        <div class="line">
          <a>联系电话:</a>
          <a>12312312312</a>
        </div>
        <div class="line">
          <a>收货地址:</a>
          <a>北京北京市海淀区上地三街嘉华大厦XXX号</a>
        </div>
      </div>
      <div class="item">
        <div class="line commodity">
          <div class="left" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="right">
            <div class="title">2018新款百搭斜挎包水貂毛口袋包链条包单肩包2018新款百搭斜挎包水貂毛口袋包链条包单肩包2018新款百搭斜挎包水貂毛口袋包链条包单肩包</div>
            <div class="type">淡蓝色-Large</div>
            <div class="price">
              <span>￥218</span>
              <a>x1</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";

  export default {
    name: "OrderDetail",
    components: {
      GoBack: GoBack,
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
      height: calc(100% - 86px);
      overflow: scroll;
      box-sizing: border-box;
      padding: 5px;
      .item{
        margin-bottom: 5px;
        background-color: white;
        width: 100%;
        border: 1px solid gainsboro;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-size: 13px;
        padding: 5px;
        .line{
          padding: 5px 0;
          width: 100%;
          border-bottom: 1px solid gainsboro;
          .price{
            color: red;
            font-weight: bold;
          }
        }
        .commodity{
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          padding: 10px 0;
          box-sizing: border-box;
          .left{
            height: 70px;
            width: 70px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 5px;
          }
          .right{
            padding-left: 5px;
            box-sizing: border-box;
            width: calc(100% - 70px);
            height: 100%;
            .title{
              width: 100%;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .type{
              width: 100%;
              color: grey;
              margin-top: 5px;
            }
            .price{
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
              span{
                color: red;
              }
            }
          }
        }
        .line:last-child{
          border-bottom: none;
        }
      }
    }
  }
</style>
