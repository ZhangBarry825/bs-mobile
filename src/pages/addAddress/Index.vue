<template>
  <div class="content">

    <div class="top">
      新增地址
    </div>

    <div class="items">
      <div class="item">
        <div class="left">收货人:</div>
        <div class="right">
          <Input v-model="postForm.contacts" placeholder="请输入收货人" style="width: 300px"/>
        </div>
      </div>
      <div class="item">
        <div class="left">手机号码:</div>
        <div class="right">
          <Input v-model="postForm.phone" placeholder="请输入收货人手机号码" style="width: 300px" type="number"/>
        </div>
      </div>
      <div class="item">
        <div class="left">省份:</div>
        <div class="right">
          <Select v-model="province" style="width:200px">
            <Option v-for="(item,index) in provinceList" :value="item.name1" :key="item.pid">{{ item.name1 }}</Option>
          </Select>
        </div>
      </div>
      <div class="item">
        <div class="left">城市:</div>
        <div class="right">
          <Select v-model="city" style="width:200px">
            <Option v-for="(item,index) in cityList" :value="item.name1" :key="item.pid">{{ item.name1 }}</Option>
          </Select>
        </div>
      </div>
      <div class="item">
        <div class="left">区县:</div>
        <div class="right">
          <Select v-model="block" style="width:200px">
            <Option v-for="(item,index) in blockList" :value="item.name1" :key="item.pid">{{ item.name1 }}</Option>
          </Select>
        </div>
      </div>

      <div class="item">
        <div class="left">详细地址:</div>
        <div class="right">
          <Input v-model="detailAddress" placeholder="请输入详细地址" style="width: 300px" />
        </div>
      </div>

      <div class="item">
        <div class="button" @click="submit">确认提交</div>
      </div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import {dataGet, dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Add",
    components: {
      GoBack: GoBack
    },
    data() {
      return {
        info: '',
        provinceList: [],
        province: '',
        cityList: [],
        city: '',
        blockList: [],
        block: '',
        detailAddress: '',


        postForm: {
          phone: '',
          contacts: '',
          address: '',
        }
      }
    },
    watch: {
      province: {
        deep: true,
        handler: function (newVal, oldVal) {
          console.log(newVal)
          for (let i = 0; i < this.provinceList.length; i++) {
            if (newVal == this.provinceList[i].name1) {
              dataPost(this.GLOBALDATA.serverUrl+'/home/address/area', {
                pid: this.provinceList[i].pid
              }, (response, all) => {
                console.log(response.data)
                this.cityList = response.data.rows
              });
            }
          }
        }
      },
      city: {
        deep: true,
        handler: function (newVal, oldVal) {
          console.log(newVal)
          for (let i = 0; i < this.cityList.length; i++) {
            if (newVal == this.cityList[i].name1) {
              dataPost(this.GLOBALDATA.serverUrl+'/home/address/area', {
                pid: this.cityList[i].pid
              }, (response, all) => {
                console.log(response.data)
                this.blockList = response.data.rows
              });
            }
          }
        }
      }
    },
    methods: {
      submit() {
        if (this.postForm.contacts == '') {
          this.$Modal.warning({
            title: '提醒',
            content: '收货人不能为空！',
          });
        } else if (this.postForm.phone == '') {
          this.$Modal.warning({
            title: '提醒',
            content: '手机号码不能为空！',
          });
        } else if (this.province == '') {
          this.$Modal.warning({
            title: '提醒',
            content: '省份不能为空！',
          });
        } else if (this.city == '') {
          this.$Modal.warning({
            title: '提醒',
            content: '城市不能为空！',
          });
        } else if (this.block == '') {
          this.$Modal.warning({
            title: '提醒',
            content: '区县不能为空！',
          });
        } else if (this.detailAddress == '') {
          this.$Modal.warning({
            title: '提醒',
            content: '详细地址不能为空！',
          });
        } else {
          this.postForm.address = this.province + this.city + this.block + this.detailAddress
          console.log(this.postForm)
          dataPost(this.GLOBALDATA.serverUrl+'/home/address/create', {
            membership_id: this.info.membership_id,
            contacts: this.postForm.contacts,
            phone: this.postForm.phone,
            address: this.postForm.address
          }, (response, all) => {
            console.log(response.data)
            this.$Modal.success({
              title: '成功',
              content: '保存成功！',
              onOk: ()=>{
                this.$router.go(-1);
              }
            });

          });
        }
      },
      ProvinceClick(item) {
        console.log(item, 123)
      },
      getProvince() {
        dataGet(this.GLOBALDATA.serverUrl+'/home/address/province', {}, (response, all) => {
          console.log(response.data)
          this.provinceList = response.data.rows
        });
      },
    },
    mounted() {
      this.info = JSON.parse(localStorage.getItem('info'))
      this.getProvince()
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
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }
    .items {
      width: 100%;
      background-color: white;
      padding: 10px;
      box-sizing: border-box;
      .item {
        width: 100%;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        padding: 5px 0;
        .left {
          width: 80px;
        }
        .right {
          input {
            border: none;
          }
          select {
            width: 100px;
          }
        }
        .button {
          margin-top: 10px;
          width: 100%;
          height: 40px;
          border-radius: 5px;
          background-color: #FF6735;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .item:last-child {
        border-bottom: none;
      }
    }
  }
</style>
