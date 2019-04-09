<template>
  <div class="type-content" v-if="isDisplay">
    <div class="bottom">
      <div class="first">
        <div class="title">
          <a>我的地址</a>
          <div class="cancel" @click="cancel">x</div>
        </div>
        <div class="items">
          <div class="item" @click="chooseAddress(item)" v-for="(item,index) in addressList.rows">
            <div class="name">{{item.contacts}}</div>
            <div class="detail">
              <a>{{item.contacts}}<span>{{item.phone}}</span></a>
              <a class="address">{{item.address}}</a>
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
  import {dataPost} from "../../plugins/axiosFn";

  export default {
    name: "Address",
    data() {
      return {
        type: 1,
        page_num: 1,
        page_size: 1000,
        addressList: {
          count: 0,
          rows: []
        },
        info: {}
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
      chooseAddress(item) {
        console.log(item)
        this.$emit("chooseAddress", item)
      },
      addAddress() {
        this.$router.push({path: '/addaddress'})
      },
      getList() {
        dataPost('/api/home/address/lists', {
          page_num: this.page_num,
          page_size: this.page_size,
          membership_id: this.info.membership_id,
        }, (response, all) => {
          this.addressList = response.data
          console.log(response)
        });
      }
    },
    mounted() {
      this.info = JSON.parse(localStorage.getItem('info'))
      this.getList()
    },
    props: {
      isDisplay: {
        type: Boolean,
        default() {
          return false
        }
      },
    },

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
    a {
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
        .items {
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
              .address {
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
