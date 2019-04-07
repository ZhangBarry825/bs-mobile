<template>
  <div class="type-content" v-if="isDisplay">
    <div class="bottom">
      <div class="first">
        <div class="title">
          <a>商品规格</a>
          <div class="cancel" @click="cancel">x</div>
        </div>
        <div class="top">
          <div class="pic" :style="'background-image: url('+require('../assets/images/5c06487cee.jpg')+')'"></div>
          <div class="price">
            <a>￥{{price}}</a>
            <span>库存{{stock}}件</span>
          </div>
        </div>

        <div class="type-title">分类</div>
        <div class="type-items">
          <div class="item" v-for="(item,index) in specification" v-bind:class="{ active: type == index }" @click="select(index)">{{item.name}}</div>
        </div>
      </div>
      <div class="bottom-bottom">
        <div class="buttons">
          <div class="button button1" @click="goTrolley">加入购物车</div>
          <div class="button button2" @click="goBuy">立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TypeDetail",
    data(){
      return{
        type:0,
      }
    },
    methods:{
      select(num){
        this.type=num
      },
      cancel(){
        // this.isDisplay=false
        this.$emit("cancelDis",false)
      },
      goBuy(){
        this.$emit("goBuy",this.specification[this.type])
      },
      goTrolley(){
        this.$emit("goTrolley",this.specification[this.type])
      }
    },
    props:{
      isDisplay: {
        type: Boolean,
        default() {
          return false
        }
      },
      specification: {
        type: Array,
        default() {
          return []
        }
      },
      price: {
        type: Number,
        default() {
          return 0.00
        }
      },
      stock: {
        type: Number,
        default() {
          return 0
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .type-content {
    width: 100%;
    height: 100%;
    z-index: 5555;
    background-color: rgba(0, 0, 0, 0.29);
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    a{
      color: #262626;
    }
    .bottom {
      width: 100%;
      background-color: white;
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .first{
        width: 100%;
        .title {
          width: 100%;
          height: 50px;
          border-bottom: 1px solid gainsboro;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          position: relative;
          color: grey;
          a{
            width: 100%;
            text-align: center;
          }
          div{
            position: absolute;
            width: 20px;
            height: 20px;
            right: 15px;
            border: 1px solid grey;
            color: grey;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .top {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          .pic {
            border-radius: 5px;
            width: 100px;
            height: 100px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
          .price {
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            a {
              color: red;
              font-size: 20px;
            }
            span {
              color: grey;
              font-size: 14px;
              margin-top: 5px;
            }
          }
        }
        .type-title {
          margin-top: 10px;
          padding: 10px;
          box-sizing: border-box;
          width: 100%;
          height: 50px;
          border-top: 1px solid gainsboro;
        }
        .type-items {
          padding: 0 10px;
          box-sizing: border-box;
          width: 100%;
          max-height: 200px;
          overflow: scroll;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .item {
            margin-bottom: 5px;
            margin-right: 5px;
            padding: 5px;
            border: 1px solid gainsboro;
            border-radius: 5px;
            background-color: #f4f4f4;
          }
          .active{
            color: #ff6e30;
            border: 1px solid #ff6e30;
            background-color: white;
          }
        }
      }

      .bottom-bottom {

        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        .buttons {
          display: flex;
          height: 40px;
          .button {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
          }
          .button1 {
            background-color: #ff6e30;
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
          }
          .button2 {
            background-color: #ff3802;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
          }
        }
      }
    }
  }
</style>
