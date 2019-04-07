<template>
  <div class="back-content" @click="goBack">
    <img src="../assets/images/gdx.png">
  </div>
</template>

<script>
  export default {
    name: "GoBack",
    methods: {
      goBack() {
        // this.$router.push({path: '/home'})
        if(this.goHome){
          this.$router.push({path: '/home'})
        }else {
          this.$router.go(-1);
        }
        // window.history.go(-1);
      }
    },
    props: {
      goHome: {
        type: Boolean,
        default() {
          return false
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .back-content {
    z-index: 555555;
    font-size: 20px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    position: absolute;
    top: 3px;
    left: 5px;
    color: #444;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
</style>
