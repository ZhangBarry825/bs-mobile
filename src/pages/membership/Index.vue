<template>
  <div class="content">
    <div class="top">
      我的客户
    </div>

    <div class="items">
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="avatar" :style="'background-image: url('+require('../../assets/images/5c1478d532.jpg')+')'"></div>
          <div class="nickname">
            <a>会员ID：11252</a>
            <a>大番薯吃西瓜</a>
          </div>
        </div>
        <div class="right">
          <a>消费总额：<span>￥25.25</span></a>
          <a>佣金反额：<span>￥2552.5</span></a>
        </div>
      </div>


    </div>
    <!--<div class="empty">-->
      <!--<img src="../../assets/images/personnel.png">-->
      <!--<a>暂无会员，去推广吧</a>-->
    <!--</div>-->
    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="3"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";

  export default {
    name: "Membership",
    components: {
      BottomBar: BottomBar
    },
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
