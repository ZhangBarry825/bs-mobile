<template>
  <div class="content">
    <div class="top">
      消息通知
    </div>


    <div class="items">
      <div class="item">
        <div class="left"  :style="'background-image: url('+require('../../assets/images/voice.png')+')'"></div>
        <div class="right">
          <a>高级VIP客户通知</a>
          <span>2018/12/25</span>
          <a>热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过</a>
        </div>
      </div>
      <div class="item">
        <div class="left"  :style="'background-image: url('+require('../../assets/images/voice.png')+')'"></div>
        <div class="right">
          <a>高级VIP客户通知</a>
          <span>2018/12/25</span>
          <a>热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过</a>
        </div>
      </div>
      <div class="item">
        <div class="left"  :style="'background-image: url('+require('../../assets/images/voice.png')+')'"></div>
        <div class="right">
          <a>高级VIP客户通知</a>
          <span>2018/12/25</span>
          <a>热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过热门TOP榜单出炉，走过路过千万不要错过</a>
        </div>
      </div>



    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";

  export default {
    name: "Message",
    components:{
      GoBack:GoBack
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
      padding: 5px;
      box-sizing: border-box;
      .item:first-child{
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      .item:last-child{
        border-bottom: none;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .item{
        background-color: white;
        border-bottom: 1px solid gainsboro;
        width: 100%;
        padding: 10px 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        box-sizing: border-box;
        .left{
          width: 70px;
          height: 70px;
          background-repeat: no-repeat;
          background-size: 50px 50px;
          background-position: center;
          border-radius: 5px;
        }
        .right{
          margin-left: 8px;
          display: flex;
          width: calc(100% - 75px);
          flex-direction: column;
          font-size: 15px;
          a{
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            color:black ;
          }
          span{
            width: 100%;
            color: #444;
            font-size: 13px;
          }
          a:last-child{
            font-size: 13px;
            -webkit-line-clamp: 2;
            color: grey;
          }
        }
      }
    }
  }
</style>
