<template>
  <div class="content">
    <div class="top">
      修改密码
    </div>

    <div class="form">
      <div class="type">
        <a>原始密码:</a>
        <Input v-model="postForm.old_password" placeholder="请输入原始密码" type="password"/>
      </div>
      <div class="type">
        <a>新密码:</a>
        <Input v-model="postForm.password" placeholder="请输入新密码" type="password"/>
      </div>
      <div class="type">
        <a>确认密码:</a>
        <Input v-model="postForm.repeat_password" placeholder="请重复密码" type="password"/>
      </div>
    </div>
    <div class="submit">
      <div class="button" @click="submitForm">确定</div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import {dataPost} from "../../../plugins/axiosFn";

  export default {
    name: "Password",
    data(){
      return{
        postForm:{
          old_password:'',
          repeat_password:'',
          password:'',
        }
      }
    },
    methods:{
      submitForm(){
        if(this.postForm.old_password==''){
          this.$Modal.info({
            title: '注意',
            content: '请输入原始密码!'
          });
        }else if(this.postForm.password==''){
          this.$Modal.info({
            title: '注意',
            content: '请输入新密码!'
          });
        }else if(this.postForm.password.length<6){
          this.$Modal.info({
            title: '注意',
            content: '密码长度不能小于6位!'
          });
        }else if(this.postForm.repeat_password!=this.postForm.password){
          this.$Modal.info({
            title: '注意',
            content: '重复密码不一致!'
          });
        }else {
          console.log(this.postForm)
          dataPost(this.GLOBALDATA.serverUrl+'/home/membership/resetPassword', {
            id:this.postForm.id,
            password:this.postForm.password,
            old_password:this.postForm.old_password,
          },(response, all)=>{
            console.log(response)
            this.$Modal.info({
              title: '成功',
              content: '保存成功!'
            });
          });
        }

      },
      fetchDetail(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/user/info', {
        },(response, all)=>{
          console.log(response.data)
          this.postForm.id=response.data.id
        });

      }
    },
    mounted(){
      this.fetchDetail()
    },
    components: {
      GoBack: GoBack
    },
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
    a{
      color:#262626;
    }
    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }

    .form {
      margin-top: 10px;
      width: 100%;
      background-color: white;
      .type {
        box-sizing: border-box;
        padding: 5px 10px;
        border-bottom: 1px solid gainsboro;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        a {
          width: 100px;
          display: block;
        }
        select, input {
          border: 0 solid grey;
          height: 25px;
          font-size: 14px;
        }
      }
      .avatar{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .pic{
          width: 70px;
          height: 70px;
          border-radius: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .tip{
          width: 80px;
          background-color: #169bd5;
          margin: 10px;
          color: white;
          display: flex;
          justify-content: center;
          padding: 5px 10px;

        }
      }
    }
    .submit{
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      .button{
        width: 90%;
        background-color: #169bd5;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:5px ;
        height: 40px;
      }
    }
  }
</style>
