<template>
  <div class="content">
    <div class="top">
      <input type="text" placeholder="请输入关键词..." v-model="keyword">
      <div class="search" :style="'background-image: url('+require('../../assets/images/sss.png')+')'"
           @click="searchKeyword"></div>
    </div>
    <div class="middle">
      <div class="left">
        <div class="item" :class="{'active':activeIndex==index}" @click="selectType(item,index)"
             v-for="(item,index) in typeList.rows">{{item.name}}
        </div>
      </div>
      <div class="right">
        <div class="title">{{typeList.rows[activeIndex].name}}</div>
        <div class="items">
          <div class="item" v-for="(item,index) in typeList.rows[activeIndex].children" @click="searchType(item)">
            <div class="img" :style="'background-image: url('+item.avatar+')'"></div>
            <div class="title-detail">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="2"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Class",
    components: {
      BottomBar: BottomBar
    },
    data() {
      return {
        keyword: '',
        page_num: 1,
        page_size: 1000,
        typeList: {
          rows: [
            {
              name: ''
            }
          ],
          count: 0
        },
        activeIndex: 0
      }
    },
    methods: {
      searchKeyword() {
        if (this.keyword == '') {
          this.$Modal.warning({
            title: '注意',
            content: '请先输入关键词!',
          });
        } else {
          this.$router.push({
            path: '/goodsList',
            query: {
              keyword: this.keyword
            }
          })
        }
      },
      searchType(item) {
        console.log(item.type_id)
        this.$router.push({
          path: '/goodsList',
          query: {
            type_id: item.type_id
          }
        })
      },
      getTypeList() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/goodsType/lists', {
          page_num: this.page_num,
          page_size: this.page_size,
          level: 1
        }, (response, all) => {
          console.log(response.data)
          this.typeList = response.data
        });
      },
      selectType(item, index) {
        this.activeIndex = index
      }
    },
    mounted() {
      this.getTypeList()
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
    .top {
      background-color: white;
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
    .middle {
      width: 100%;
      display: flex;
      flex-direction: row;
      .left {
        width: 150px;
        background-color: white;
        .item {
          font-size: 15px;
          width: 100%;
          height: 40px;
          border: 1px solid gainsboro;
          border-bottom: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }
        .active {
          background-color: #f8f8f8;
          border-right: none;
          border-left: 2px solid #ff6633;
          color: #ff6633;
        }
      }
      .right {
        width: 100%;
        .title {
          width: 100%;
          height: 40px;
          color: gray;
          font-size: 15px;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: 10px;
          box-sizing: border-box;
        }
        .items {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 10px;
          padding-right: 10px;
          box-sizing: border-box;
          .item {
            width: 30%;
            height: 80px;
            background-color: white;
            padding: 5px;
            box-sizing: border-box;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .img {
              width: 80%;
              height: 50px;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
            }
            .title-detail {
              font-size: 13px;
              margin-top: 5px;
              color: grey;
            }
          }
        }
      }
    }
  }
</style>
