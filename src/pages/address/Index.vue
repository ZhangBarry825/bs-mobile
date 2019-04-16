<template>
  <div class="content">
    <div class="top">
      我的地址
    </div>

    <div class="items">
      <div class="item" v-for="(item,index) in addressList.rows">
        <div class="name">{{item.contacts}}</div>
        <div class="detail">
          <a>{{item.contacts}}<span>{{item.phone}}</span><img @click="deleteItem(item)" src="../../assets/images/delete.png"></a>
          <a class="address">{{item.address}}</a>
        </div>
      </div>

      <div class="empty" v-if="addressList.count<1">
        <img src="../../assets/images/addresss.png">
        <a>暂无地址记录</a>
      </div>
    </div>

    <div class="add" @click="addAddress">
      <div class="button">添加</div>
    </div>

    <div class="blank" style="width: 100%;height: 50px"></div>
    <BottomBar :item="5"></BottomBar>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import BottomBar from "../../components/BottomBar";
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Address",
    components: {
      BottomBar: BottomBar,
      GoBack: GoBack,
    },
    data() {
      return {
        info:{},
        page_num: 1,
        page_size: 1000,
        addressList: {
          count:0,
          rows:[]
        }
      }
    },
    methods: {
      deleteItem(item){
        this.$Modal.confirm({
          title: '注意',
          content: '是否删除？',
          onOk: () => {
            dataPost(this.GLOBALDATA.serverUrl+'/home/address/delete', {
              id: item.id
            }, (response, all) => {
              this.getList()
              console.log(response)
            });
          }
        });
      },
      addAddress() {
        this.$router.push({path: '/addaddress'})
      },
      getList() {
        dataPost(this.GLOBALDATA.serverUrl+'/home/address/lists', {
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
      this.info=JSON.parse(localStorage.getItem('info'))
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
    .items {
      width: 100%;

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
          width: calc(100% - 60px);
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          a {
            width: 100%;
            span {
              font-size: 13px;
              margin-left: 10px;
              color: grey;
            }
            img{
              width: 20px;
              float: right;
            }
          }
          .address {
            font-size: 13px;
          }

        }
      }
      .empty {
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
    }

    .add {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      .button {
        width: 90%;
        border-radius: 5px;
        background-color: #169bd5;
        padding: 10px;
        text-align: center;
        color: white;
      }
    }
  }
</style>
