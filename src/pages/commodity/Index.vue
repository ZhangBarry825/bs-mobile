<template>
  <div class="content">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :style="'background-image: url('+pic1+')'">
        </div>
        <div class="swiper-slide" :style="'background-image: url('+pic2+')'">
        </div>
        <div class="swiper-slide" :style="'background-image: url('+pic3+')'">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="title">
      {{detail.name}}
    </div>
    <div class="price">
      <a>￥{{detail.price||0}}元<span>￥{{detail.primary_price||0}}元</span></a>
    </div>
    <div class="saleNum">库存 {{detail.stock||0}} 件</div>

    <div class="type" @click="typeDetail">
      <a>商品规格</a>
      <a>></a>
    </div>

    <TypeDetail :isDisplay="isDisplay" v-on:cancelDis="cancelDisplay" v-on:goBuy="goBuy"
                v-on:goTrolley="goTrolley" :specification="detail.specification" :price="detail.price" :stock="detail.stock" :pic="pic1"></TypeDetail>

    <div class="comment" @click="holdOn">
      <a>商品评价</a>
      <a>></a>
    </div>

    <div class="detail">
      <div class="detail-title">
        <a>商品详情</a>
      </div>

      <div class="detail-content" >
        <div v-html="detail.content"></div>
      </div>
    </div>


    <div class="blank" style="width: 100%;height: 50px"></div>
    <div class="bottom">
      <div class="item" @click="goHome">
        <img src="../../assets/images/nsy.png">
        <a>首页</a>
      </div>
      <div class="item" @click="typeDetail">
        <img src="../../assets/images/mall2.png">
        <a>购物车</a>
      </div>
      <div class="item buy" @click="typeDetail">
        立即购买
      </div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import {Message} from 'element-ui';
  import TypeDetail from "../../components/TypeDetail";
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Commodity",
    components: {
      TypeDetail: TypeDetail,
      GoBack: GoBack
    },
    data() {
      return {
        id: '',
        isDisplay: false,
        pic1: '',
        pic2: '',
        pic3: '',
        detail: {}
      }
    },
    mounted() {
      new Swiper('.swiper-container', {
        autoplay: true,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
        },

        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })
      this.id = this.$route.query.id
      console.log(this.$route.query.id)
      this.getDetail()
    },

    methods: {
      typeDetail() {
        this.isDisplay = true
      },
      goHome() {
        this.$router.push({path: '/home'})
      },
      cancelDisplay() {
        this.isDisplay = false
      },
      goBuy(e) {
        let list=[
          {
            detail:this.detail,
            specification:e,
            num:1
          }
        ]
        this.$router.push({
          name: 'Buy',
          params: {
            goodsList:list,
            ifNew:true
          }
        })
      },
      goTrolley(e) {
        console.log(e)
        this.isDisplay = false
      },
      holdOn() {
        Message({
          showClose: true,
          message: '敬请期待！',
          type: 'success'
        });
      },
      getDetail() {
        dataPost('/api/home/goods/detail', {
          id: this.id
        }, (response, all) => {
          console.log(response.data)
          this.pic1 = response.data.pic1
          this.pic2 = response.data.pic2
          this.pic3 = response.data.pic3
          this.detail = response.data
        });
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
    a {
      color: #262626;
    }
    .swiper-container {
      width: 100%;
      height: 400px;
      .swiper-slide {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .title {
      background-color: white;
      width: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
    }
    .price {
      background-color: white;
      width: 100%;
      padding: 5px 5px;
      box-sizing: border-box;
      font-size: 20px;
      a {
        color: red;
      }
      span {
        color: grey;
        font-size: 15px;
        margin-left: 10px;
        text-decoration: line-through;
      }
    }
    .saleNum {
      color: grey;
      background-color: white;
      width: 100%;
      padding: 0 10px;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
    .type, .comment {
      margin-top: 5px;
      background-color: white;
      width: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
      border-top: 1px solid gainsboro;
      border-bottom: 1px solid gainsboro;
      display: flex;
      justify-content: space-between;
      a:last-child {
        color: grey;
      }
    }
    .detail {
      margin-top: 10px;
      background-color: white;
      width: 100%;
      box-sizing: border-box;
      .detail-title {
        width: 100%;
        padding: 10px 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
      }
      .detail-content {
        width: 100%;
        padding: 10px 0;
        box-sizing: border-box;
        overflow: hidden;
        div{
          width: 100%;
          /deep/p{
            width: 100%;
            display: block;
          }
          /deep/img{
            width: 100%;
          }
        }
      }
    }
    .bottom {
      width: 100%;
      height: 50px;
      background-color: white;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      font-size: 13px;
      .item {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: grey;
        justify-content: center;
        img {
          width: 25px;
          height: 25px;
        }
      }
      .buy {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FF6735;
        color: white;
        font-size: 15px;
      }
    }
  }
</style>
