<template>
  <div class="content">
    <GoBack></GoBack>
    <div class="top">
      我的订单
    </div>

    <div class="address" @click="displayAddress">
      <a class="tip" v-if="!choosed">选择地址</a>
      <div class="info" v-if="choosed">
        <a>收货人：{{contacts}} <span>{{phone}}</span></a>
        <a>收货地址：{{address}}</a>
      </div>
      <a class="right">></a>
    </div>
    <div class="border"></div>

    <div class="store">
      <!--大番薯的店-->
    </div>

    <div v-for="(item,index) in goodsList">
      <div class="commodity">
        <div class="left" :style="'background-image: url('+item.detail.pic1+')'"></div>
        <div class="right">
          <div class="title">{{item.detail.name}}</div>
          <div class="type">{{item.specification.name}}</div>
          <div class="price">
            <a>￥{{item.detail.price}}</a>
            <a>x1</a>
          </div>
        </div>
      </div>
      <div class="num">
        <div class="tip">购买数量</div>
        <div class="number">
          <div class="pre" @click="decreaseNum(index)">-</div>
          <input oninput="if(value>1000)value=1000" type="number" v-model="goodsList[index].num">
          <div class="next" @click="addNum(index)">+</div>
        </div>
      </div>
    </div>
    <div class="total">
      <!--<div class="price">小计：<span>￥218</span></div>-->
      <div class="express">
        <a>运费</a>
        <span>￥{{expressCost}}</span>
      </div>
      <div class="remark">
        <a>订单备注：</a>
        <Input v-model="remark" :rows="1" type="textarea" placeholder="请输入订单备注..."/>
      </div>
      <div class="blank" style="width: 100%;height: 50px"></div>
    </div>

    <div class="bottom">
      <div class="price">
        共<span> {{totalNum}} </span>件商品 合计：<span>￥{{totalAccount}}</span>
      </div>
      <div class="button" @click="pay">确认订单</div>
    </div>


    <Address :isDisplay="isDisplay" v-on:cancelDis="cancelDisplay" v-on:chooseAddress="chooseAddress"></Address>

  </div>
</template>

<script>

  import Address from "../../components/Address";
  import GoBack from "../../components/GoBack";
  import {Message} from 'element-ui';
  import {dataPost} from "../../../plugins/axiosFn";
  import {Modal} from 'iview';

  export default {
    name: "Buy",
    data() {
      return {
        totalNum: 0,
        remark: '',
        totalAccount: 0,
        expressCost: 0,
        isDisplay: false,
        choosed: false,
        specification: [],
        contacts: '',
        phone: '',
        address: '',
        goodsList: [
          {
            detail: {},
            specification: {},
            num: 1
          }
        ],
        ifTrolley: false
      }
    },
    watch: {
      goodsList: {
        handler: function (newName, oldName) {
          let total = 0;
          let maxExpressCost = 0;
          let totalNum = 0;
          for (let i = 0; i < newName.length; i++) {
            if (newName[i].detail.express_cost > maxExpressCost) {
              maxExpressCost = newName[i].detail.express_cost
            }
            total += newName[i].num * newName[i].detail.price
            totalNum += newName[i].num
          }
          this.totalAccount = total + maxExpressCost
          this.expressCost = maxExpressCost
          this.totalNum = totalNum

          let buyDetail = {
            totalNum: this.totalNum,
            totalAccount: this.totalAccount,
            expressCost: this.expressCost,
            specification: this.specification,
            goodsList: this.goodsList,
            remark: this.remark
          }
          localStorage.setItem('buyDetail', JSON.stringify(buyDetail))
        },
        deep: true
      }
    },
    components: {
      Address: Address,
      GoBack: GoBack
    },
    methods: {
      decreaseNum(index) {
        if (this.goodsList[index].num > 1) {
          this.goodsList[index].num--
        }
      },
      addNum(index) {
        if (this.goodsList[index].num < 1000) {
          this.goodsList[index].num++
        }
      },
      cancelDisplay() {
        this.isDisplay = false
      },
      displayAddress() {
        this.isDisplay = true
      },
      chooseAddress(e) {
        console.log(e,123)
        this.contacts=e.contacts
        this.phone=e.phone
        this.address=e.address
        this.choosed = true
        this.isDisplay = false

      },
      pay() {
        if (this.choosed) {
          dataPost(this.GLOBALDATA.serverUrl+'/home/user/info', {}, (response, all) => {
            let info = response.data
            let shopper = JSON.parse(localStorage.getItem('shopper'))
            let postForm = {}
            let specification = []
            console.log(this.goodsList)
            for (let i = 0; i < this.goodsList.length; i++) {
              specification.push(
                {
                  goods_id: this.goodsList[i].detail.goods_id,
                  name: this.goodsList[i].detail.name,
                  price: this.goodsList[i].detail.price,
                  pic1: this.goodsList[i].detail.pic1,
                  pic2: this.goodsList[i].detail.pic2,
                  pic3: this.goodsList[i].detail.pic3,
                  express_cost: this.goodsList[i].detail.express_cost,
                  num: this.goodsList[i].num,
                  type: this.goodsList[i].specification.name,
                }
              )
            }
            if (shopper) {
              postForm.shopper = shopper.nickname
              postForm.shopper_id = shopper.membership_id
            } else {
              postForm.shopper = '总店'
              postForm.shopper_id = 0
            }
            postForm.nickname = info.nickname
            postForm.membership_id = info.membership_id
            postForm.name = info.name
            postForm.status = 0
            postForm.contacts = this.contacts
            postForm.phone = this.phone
            postForm.address = this.address
            postForm.price = this.totalAccount
            postForm.express_cost = this.expressCost
            postForm.remark = this.remark || ''
            console.log(postForm)
            console.log(specification)


            dataPost(this.GLOBALDATA.serverUrl+'/home/order/create', {
              shopper: postForm.shopper,
              shopper_id: postForm.shopper_id,
              nickname: postForm.nickname,
              membership_id: postForm.membership_id,
              name: postForm.name,
              status: postForm.status,
              contacts: postForm.contacts,
              phone: postForm.phone,
              address: postForm.address,
              price: postForm.price,
              express_cost: postForm.express_cost,
              remark: postForm.remark,
              specification: specification
            }, (response, all) => {
              console.log(response.data, 5000)
              this.$router.push({
                name: 'Pay',
                params: {
                  order_id: response.data.order_id
                }
              })

              //删除购物车内容
              if (this.ifTrolley) {
                console.log(this.goodsList, '购物车跳转1')

                let localStorageTrolley = localStorage.getItem('trolley');
                if (localStorageTrolley != null) {
                  let trolley = JSON.parse(localStorageTrolley)
                  for (let i = 0; i < trolley.length; i++) {
                    for (let j = 0; j < this.goodsList.length; j++) {
                      if (trolley[i]['trolleyId'] == this.goodsList[j]['trolleyId']) {
                        trolley.splice(i, 1)
                      }
                    }
                  }
                  localStorage.setItem('trolley', JSON.stringify(trolley))
                  console.log(trolley, '购物车跳转2')
                }

              }
            });
          });
        } else {
          Modal.warning({
            title: '注意',
            content: '请先选择地址!',
          });
        }
      },
    },
    mounted() {
      this.goodsList = this.$route.params.goodsList
      console.log(this.goodsList)
      console.log(this.$route.params.ifBack)
      this.ifTrolley = this.$route.params.ifTrolley
      if (!this.$route.params.ifNew) {
        let buyDetail = JSON.parse(localStorage.getItem('buyDetail'))
        if (buyDetail) {
          this.totalNum = buyDetail.totalNum
          this.totalAccount = buyDetail.totalAccount
          this.expressCost = buyDetail.expressCost
          this.specification = buyDetail.specification
          this.goodsList = buyDetail.goodsList
          this.remark = buyDetail.remark
        }
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
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }
    .address {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: white;
      align-items: center;

      .tip {
        padding: 5px 0;
      }
      .info {
        width: calc(100% - 20px);
        padding: 5px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        a {
          margin-bottom: 5px;
          span {
            color: #444444;
            font-size: 14px;
            margin-left: 10px;
          }
        }
      }
      .right {
        width: 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .border {
      background-color: white;
      width: 100%;
      height: 5px;
      background-image: url("../../assets/images/border.png");
    }
    .store {
      width: 100%;
      padding: 10px;
      font-size: 13px;
      color: grey;
      box-sizing: border-box;
      background-color: white;
    }
    .commodity {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      .left {
        width: 100px;
        height: 100px;
        background-position: center;
        background-size: cover;
      }
      .right {
        width: calc(100% - 100px);
        height: 100%;
        padding: 5px;
        box-sizing: border-box;
        .title {
          font-size: 13px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .type {
          width: 100%;
          color: grey;
          font-size: 13px;
          margin-top: 10px;
        }
        .price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          a:first-child {
            color: red;
          }
          a:last-child {
            color: #444444;
          }
        }
      }
    }

    .num {
      width: 100%;
      padding: 10px;
      color: #444444;
      box-sizing: border-box;
      background-color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .number {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        input {
          width: 30px;
          border: none;
          text-align: center;
        }
        .pre, .next {
          width: 30px;
          height: 30px;
          background-color: gainsboro;
          display: flex;
          flex-direction: row;
          justify-content: center;
          font-size: 20px;
          align-items: center;
        }
      }
    }

    .total {
      width: 100%;
      padding: 10px;
      color: #444444;
      box-sizing: border-box;
      background-color: white;
      display: flex;
      flex-direction: column;
      .price {
        width: 100%;
        span {
          color: red;
        }
        text-align: right;
      }
      .express {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span {
          color: red;
        }
      }
      .remark {
        padding: 10px 0;
        box-sizing: border-box;
        a {
          display: block;
          margin-bottom: 10px;
        }
      }
    }

    .bottom {
      width: 100%;
      height: 50px;
      z-index: 5555;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: row;
      background-color: white;
      justify-content: flex-end;
      align-items: center;
      .price {
        max-width: calc(100% - 100px);
        padding: 0 20px;
        span {
          color: red;
        }
      }
      .button {
        width: 100px;
        background-color: red;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }
  }
</style>
