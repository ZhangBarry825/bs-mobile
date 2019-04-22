<template>
  <div class="content">
    <div class="top">
      消息通知
    </div>
    <div class="items">
      <div class="item" v-for="(item,index) in messageList" @click="goDetail(item)">
        <div class="left"  :style="'background-image: url('+require('../../assets/images/voice.png')+')'"></div>
        <div class="right">
          <a>{{item.title}}</a>
          <span>{{format(item.create_time)}}</span>
          <a class="content_short">{{item.content_short}}</a>
        </div>
      </div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";
  import {parseTime} from "../../../plugins/functions";

  export default {
    name: "Message",
    components:{
      GoBack:GoBack
    },
    data(){
      return{
        page_num:1,
        page_size:10,
        messageList:[]
      }
    },
    methods:{
      goDetail(item){
        this.$router.push({
          path:'/messageDetail',
          query:{
            id:item.id
          }
        })
      },
      format(val){
        return parseTime(val,'{y}/{m}/{d}')
      },
      getList(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/message/lists', {
          page_num:this.page_num,
          page_size:this.page_size,
        },(response, all)=>{
          this.messageList=response.data.rows
          console.log(this.messageList)
        });
      }
    },
    mounted(){
      this.getList()
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
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            overflow: hidden;
            color:black ;
          }
          .content_short{
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 13px;
            color: grey;
          }
          span{
            width: 100%;
            color: #444;
            font-size: 13px;
          }
        }
      }
    }
  }
</style>
