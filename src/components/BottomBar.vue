<template>
  <div class="box">
    <div class="content">
      <div class="item" @click="goTo(1)">
        <img src="../assets/images/ic-all2.png" v-if="item=='1'">
        <a style="color: #ff6735" v-if="item=='1'">首页</a>
        <img src="../assets/images/ic-all.png" v-if="item!='1'">
        <a v-if="item!='1'">首页</a>
      </div>
      <div class="item" @click="goTo(2)">
        <img src="../assets/images/ic-list2.png" v-if="item=='2'">
        <img src="../assets/images/ic-list.png" v-if="item!='2'">
        <a v-if="item=='2'" style="color: #ff6735">分类</a>
        <a v-if="item!='2'">分类</a>
      </div>
      <div class="item" @click="goTo(3)">
        <img src="../assets/images/money2.png" v-if="item=='3'">
        <img src="../assets/images/money.png" v-if="item!='3'">
        <a v-if="item=='3'" style="color: #ff6735">分销中心</a>
        <a v-if="item!='3'">分销中心</a>
      </div>
      <div class="item" @click="goTo(4)">
        <img src="../assets/images/mall2.png" v-if="item=='4'">
        <img src="../assets/images/mall.png" v-if="item!='4'">
        <a v-if="item=='4'" style="color: #ff6735">购物车</a>
        <a v-if="item!='4'">购物车</a>
      </div>
      <div class="item" @click="goTo(5)">
        <img src="../assets/images/user2.png" v-if="item=='5'">
        <img src="../assets/images/user.png" v-if="item!='5'">
        <a v-if="item=='5'" style="color: #ff6735">我的</a>
        <a v-if="item!='5'">我的</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BottomBar",
    methods: {
      goTo(n) {
        switch (n) {
          case 1:
            this.$router.push({path: '/home'})
            break;
          case 2:
            this.$router.push({path: '/class'})
            break;
          case 3:
            this.$router.push({path: '/sale'})
            break;
          case 4:
            this.$router.push({path: '/trolley'})
            break;
          case 5:
            this.$router.push({path: '/mine'})
            break;
        }
      }
    },
    props: ['item']
  }
</script>

<style scoped lang="less">
  .box{
    .content {
      width: 100%;
      height: 50px;
      background-color: white;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      .item {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 3px;
        img {
          width: 25px;
          height: 25px;
        }
        a {
          color: grey;
          font-size: 13px;
        }
      }
    }
  }

</style>
