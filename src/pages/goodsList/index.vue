<template>
  <div class="content">
    <div class="top">
      <input type="text" placeholder="请输入关键词..." v-model="keyword">
      <div class="search" :style="'background-image: url('+require('../../assets/images/sss.png')+')'"
           @click="searchKeyword"></div>
    </div>
    <div class="items">
      <div class="item" v-for="(item, index) in goodsList.rows" @click="goGoods(item)">
        <div class="left" :style="'background-image: url('+item.pic1+')'"></div>
        <div class="right">
          <div class="title">{{item.name}}</div>
          <div class="price">
            <a>￥{{item.price}}</a>
            <a>库存：{{item.stock}}件</a>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!goodsList.count>0">
        <img src="../../assets/images/order.png">
        <a>暂无商品</a>
      </div>
    </div>
    <BottomBar :item="2"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "GoodsList",
    components: {
      BottomBar: BottomBar
    },
    data() {
      return {
        keyword: '',
        type_id: '',
        page_num: 1,
        page_size: 10,
        goodsList: []
      }
    },
    methods: {
      goGoods(item){
        console.log(item)
        this.$router.push({path: '/commodity?id=' + item.id})
      },
      searchKeyword() {
        if(this.keyword==''){
          this.$Modal.warning({
            title: '注意',
            content: '请先输入关键词!',
          });
        }else {
          dataPost(this.GLOBALDATA.serverUrl+'/home/goods/search', {
            page_num: this.page_num,
            page_size: this.page_size,
            keyword: this.keyword
          }, (response, all) => {
            console.log(response.data)
            this.goodsList = response.data
          });
        }

      },
      searchType() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/goods/search', {
          page_num: this.page_num,
          page_size: this.page_size,
          type_id: this.type_id
        }, (response, all) => {
          console.log(response.data)
          this.goodsList = response.data
        });
      }
    },
    mounted() {
      let type_id=this.$route.query.type_id
      let keyword=this.$route.query.keyword
      if(type_id){
        this.type_id=type_id
        this.searchType()
      }
      if(keyword){
        this.keyword=keyword
        this.searchKeyword()
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
    a {
      color: black;
    }
    .top {
      background-color: white;
      border-bottom: 1px solid gainsboro;
      width: 100%;
      padding: 10px 10px;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      input {
        width: 100%;
        font-size: 15px;
        padding: 5px;
        border-right: none;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .search {
        width: 50px;
        background-color: gainsboro;
        background-size: auto 100%;
        background-position: center;
        background-repeat: no-repeat;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    .items {
      width: 100%;
      padding-bottom: 50px;
      padding-top: 10px;
      overflow: scroll;
      height: calc(100% - 58px);
      .empty {
        background-color: #f8f8f8;
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
      .item {
        height: 120px;
        width: 100%;
        background-color: white;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        .left {
          height: 100px;
          width: 100px;
          background-color: gainsboro;
          background-size: auto 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
        .right {
          width: calc(100% - 110px);
          margin-left: 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 13px;
          }
          .price {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            a:first-child {
              color: red;
              font-weight: bold;
            }
            a:last-child {
              font-size: 13px;
              color: #585858;
            }
          }
        }
      }
    }
  }
</style>
