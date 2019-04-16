<template>
  <div class="content">
    <div class="top">
      消息详情
    </div>
    <div class="article">
      <div class="title">
       <h3>{{detail.title}}</h3>
      </div>
      <div class="time">
        {{format(detail.create_time)}}
      </div>
      <div class="content-detail">
        <div v-html="detail.content"></div>
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
    name: "MessageDetail",
    components: {
      GoBack: GoBack
    },
    data() {
      return {
        id: '',
        detail:{
          title:'',
          time:'',
          content:'',
        }
      }
    },
    methods: {
      format(val){
        return parseTime(val,'{y}/{m}/{d}')
      },
      getList() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/message/detail', {
          id: this.id
        }, (response, all) => {
          this.detail = response.data
          console.log(response)
        });
      }
    },
    mounted() {
      this.id = this.$route.query.id
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
    .article{
      width: 100%;
      background-color: white;
      padding: 5px;
      box-sizing: border-box;
      .title{
        width: 100%;
        background-color: white;
        padding: 10px 5px;
        font-size: 20px;
        box-sizing: border-box;
      }
      .time{
        color: gray;
        width: 100%;
        background-color: white;
        padding: 5px;
        box-sizing: border-box;
      }
      .content-detail{
        width: 100%;
        background-color: white;
        padding: 20px 5px;
        box-sizing: border-box;
        /deep/img{
          width: 100%;
        }
      }
    }
  }
</style>
