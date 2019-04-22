<template>
  <div class="content">
    <div class="top">
      购物车
    </div>
    <div class="items-trolley">
      <div class="empty" v-if="ifEmpty">
        <img src="../../assets/images/cart.png">
        <a>您的购物车是空的，您可以先</a>
        <a class="a2" @click="goHome">逛逛首页</a>
      </div>
      <div class="item" v-for="(item ,index) in goodsList">
        <div class="check">
          <input type="checkbox" @click="selectItem(index,!goodsList[index].ifSelect)"
                 v-model="goodsList[index].ifSelect">
        </div>
        <div @click="goDetail(item.detail)" class="left"
             :style="'background-image: url('+item.detail.pic1+')'"></div>
        <div class="right">
          <div class="title" @click="goDetail(item.detail)">{{item.detail.name}}</div>
          <div class="type">{{item.specification.name}}</div>
          <div class="price">
            <a class="price-left">￥{{item.detail.price}}</a>
            <a class="price-right" @click="goDetele(item.trolleyId)">删除</a>
          </div>
        </div>
      </div>

      <div class="total">
        <a>合计：<span>￥{{totalAccont}}</span></a>
        <div class="submit" @click="submitForm">结算</div>
      </div>
    </div>

    <div class="suggestion">
      <div class="title">---猜你喜欢---</div>
      <div class="items">
        <div class="item" @click="goDetail(item)" v-for="(item,index) in rows">
          <div class="pic" :style="'background-image: url('+item.pic1+')'"></div>
          <div class="title">{{item.name}}</div>
          <div class="price">￥{{item.price}}</div>
        </div>
      </div>
    </div>

    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="4"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Trolley",
    components: {
      BottomBar: BottomBar
    },
    data() {
      return {
        ifEmpty: false,
        goodsList: [],
        totalAccont: 0,
        rows:[]
      }
    },
    methods: {
      goHome() {
        this.$router.push({path: '/home'})
      },
      goDetail(item) {
        console.log(item)
        this.$router.push({path: '/commodity?id=' + item.id})
      },
      goDetele(trolleyId) {
        this.$Modal.confirm({
          title: '提醒',
          content: '确定删除吗？',
          onOk: () => {
            console.log(trolleyId)
            for (let i = 0; i < this.goodsList.length; i++) {
              if (this.goodsList[i]['trolleyId'] == trolleyId) {
                this.goodsList.splice(i, 1);
                if (this.goodsList.length == 0) {
                  this.ifEmpty = true
                }
              }
            }
            let trolleyStorage = localStorage.getItem('trolley')
            let trolley = JSON.parse(trolleyStorage)
            trolley = this.goodsList
            localStorage.setItem('trolley', JSON.stringify(trolley))
          }
        });
      },
      submitForm() {
        let selectList=[]
        for (let i = 0; i < this.goodsList.length; i++) {
          if (this.goodsList[i]['ifSelect']) {
            selectList.push(this.goodsList[i])
          }
        }
        if(selectList.length==0){
          this.$Modal.info({
            title: '提示',
            content: '请先选中商品'
          });
        }else {
          console.log(selectList)
          let list = selectList
          this.$router.push({
            name: 'Buy',
            params: {
              goodsList: list,
              ifNew: true,
              ifTrolley:true
            }
          })
        }

      },
      selectItem(index, boo) {
        this.goodsList[index].ifSelect = boo
        let totalAccount = 0
        for (let i = 0; i < this.goodsList.length; i++) {
          if (this.goodsList[i]['ifSelect']) {
            totalAccount += this.goodsList[i]['detail']['price']
          }
        }
        this.totalAccont = totalAccount
        console.log(this.goodsList)
      },
      getList() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/goods/homeList', {
          page_num: 1,
          page_size: 10
        }, (response, all) => {
          this.rows = response.data.rows
        });
      }
    },

    mounted() {
      this.getList()
      let trolleyStorage = localStorage.getItem('trolley')
      if (trolleyStorage == null||trolleyStorage.length==0) {
        this.ifEmpty = true
      } else {
        this.goodsList = JSON.parse(trolleyStorage)
        for (let i = 0; i < this.goodsList.length; i++) {
          this.goodsList[i]['ifSelect'] = false
        }
        if(this.goodsList.length==0){
          this.ifEmpty = true
        }
      }
      console.log(this.goodsList)
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
    a {
      color: #262626;
    }
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
      .item {
        width: 100%;
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border-radius: 10px;
        margin-bottom: 5px;
        .check {
          width: 20px;
          height: 80px;
          display: flex;
          flex-direction: row;
          align-items: center;
          input {
            width: 15px;
            height: 15px;
          }
        }
        .left {
          width: 80px;
          height: 80px;
          border-radius: 3px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .right {
          width: -webkit-calc(100% - 100px);
          width: -moz-calc(100% - 100px);
          width: calc(100% - 100px);
          height: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp:1;
            font-size: 15px;
          }
          .type {
            font-size: 13px;
            color: grey;
          }
          .price {
            display: flex;
            justify-content: space-between;
            .price-left {
              color: red;
            }
            .price-right {
              z-index: 1000;
            }
          }
        }
      }
      .item:first-child {
        border-top: none;
      }
      .total {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        width: 100%;
        text-align: right;
        align-items: center;
        a {
          span {
            color: red;
          }
        }
        .submit {
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
          justify-content: space-between;
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
            padding: 0 2px;
            box-sizing: border-box;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp:2;
          }
          .price {
            font-size: 20px;
            color: red;
            padding: 5px 0;
            padding-bottom: 0;
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
