<template>
  <div class="type-content" v-if="isDisplay">
    <div class="bottom">
      <div class="first">
        <div class="title">
          <a>我的地址</a>
          <div class="cancel" @click="cancel">x</div>
        </div>
        <div class="items">
          <div class="item" @click="chooseAddress">
            <div class="name">老白</div>
            <div class="detail">
              <a>老白<span>15138389776</span></a>
              <a class="address">北京北京市海淀区上地三街嘉华大厦123号</a>
            </div>
          </div>

        </div>
      </div>
      <div class="bottom-bottom">

        <div class="buttons" @click="addAddress">
          新增地址
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Address",
    data() {
      return {
        type: 1,
      }
    },
    methods: {
      select(num) {
        this.type = num
      },
      cancel() {
        // this.isDisplay=false
        this.$emit("cancelDis", false)
      },
      chooseAddress(){
        this.$emit("chooseAddress", "北京北京市海淀区上地三街嘉华大厦123号")
      },
      addAddress(){
        this.$router.push({path: '/addaddress'})
      }
    },
    props: {
      isDisplay: {
        type: Boolean,
        default() {
          return false
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
      .first {
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
          a {
            width: 100%;
            text-align: center;
          }
          div {
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
        .items{
          width: 100%;
          height: 300px;
          overflow: scroll;

          .item {
            width: 100%;
            background-color: white;
            border-bottom: 1px solid gainsboro;
            display: flex;
            flex-direction: row;
            align-items: center;
            box-sizing: border-box;
            padding: 10px 5px;
            .name {
              width: 50px;
              height: 50px;
              border-radius: 100%;
              background-color: gainsboro;
              color: white;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
            }
            .detail {
              max-width: calc(100% - 60px);
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              a {
                span {
                  font-size: 13px;
                  margin-left: 10px;
                  color: grey;
                }
              }
              .address{
                font-size: 13px;
              }

            }
          }
        }
      }

      .bottom-bottom {

        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        .buttons {
          width: 100%;
          height: 40px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          background-color: #FF6735;
        }
      }
    }
  }
</style>
