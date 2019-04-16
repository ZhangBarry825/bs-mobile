<template>
  <div class="content">
    <div class="top">
      完善资料
    </div>

    <div class="form">
      <div class="type avatar">
        <Upload
          class="avatar-uploader"
          :action="this.GLOBALDATA.serverUrl+'/admin/upload/upload'"
          name="files"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </Upload>

      </div>

      <div class="type">
        <a>昵称:</a>
        <Input v-model="postForm.nickname" placeholder="请输入昵称"/>
      </div>
      <div class="type">
        <a>姓名:</a>
        <Input v-model="postForm.name" placeholder="请输入姓名"/>
      </div>
      <div class="type">
        <a>绑定手机:</a>
        <Input v-model="postForm.phone" placeholder="请输入手机"/>
      </div>
      <!--<div class="type">-->
        <!--<a>密码:</a>-->
        <!--<Input v-model="postForm.password" placeholder="请输入密码"  type="password"/>-->
      <!--</div>-->
      <!--<div class="type">-->
        <!--<a>确认密码:</a>-->
        <!--<Input v-model="postForm.repeat_password" placeholder="请重复密码" type="password"/>-->
      <!--</div>-->

      <!--<div class="type">-->
        <!--<a>推荐人:</a>-->
        <!--<Input v-model="postForm.referrer_id" placeholder="请输入推荐人ID"/>-->
      <!--</div>-->
    </div>
    <div class="submit">
      <div class="button" @click="submitForm">确定</div>
    </div>
    <GoBack></GoBack>
  </div>
</template>

<script>
  import GoBack from "../../components/GoBack";
  import { Upload } from 'element-ui';
  import {dataPost} from "../../../plugins/axiosFn";
  export default {
    name: "Info",

    data() {
      return {
        postForm: {
          id:'',
          avatar:'',
          nickname:'',
          name:'',
          phone:'',
          // password:'',
          // repeat_password:'',
          // referrer_id:''
        },
        imageUrl: ''
      }
    },
    methods:{
      handleAvatarSuccess(res, file) {
        console.log(res)
        this.imageUrl = this.GLOBALDATA.absoluteUrl+'/'+res.data
        this.postForm.avatar=res.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$Modal.info({
            title: '注意',
            content: '上传头像图片只能是 JPG 格式!'
          });
        }
        if (!isLt2M) {
          this.$Modal.info({
            title: '注意',
            content: '上传头像图片大小不能超过 2MB!'
          });
        }
        return isJPG && isLt2M;
      },
      submitForm(){
        if(this.postForm.avatar==''){
          this.$Modal.info({
            title: '注意',
            content: '请上传头像!'
          });
        }else if(this.postForm.nickname==''){
          this.$Modal.info({
            title: '注意',
            content: '请填写昵称!'
          });
        }else if(this.postForm.name==''){
          this.$Modal.info({
            title: '注意',
            content: '请填写姓名!'
          });
        }else if(this.postForm.phone==''){
          this.$Modal.info({
            title: '注意',
            content: '请填写手机号!'
          });
        }else if(!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.postForm.phone))){
          this.$Modal.info({
            title: '注意',
            content: '手机号格式错误!'
          });
        }else {
          dataPost(this.GLOBALDATA.serverUrl+'/home/membership/updateMembership', {
            id:this.postForm.id,
            avatar:this.postForm.avatar,
            nickname:this.postForm.nickname,
            name:this.postForm.name,
            phone:this.postForm.phone,
          },(response, all)=>{
            console.log(response)
            this.fetchDetail()
            this.$Modal.info({
              title: '成功',
              content: '保存成功！',
              onOk: () => {
                // this.$router.push({path: '/'})
              }
            });
          });
        }
        console.log(this.postForm)
      },
      fetchDetail(){
        dataPost(this.GLOBALDATA.serverUrl+'/home/user/info', {

        },(response, all)=>{
          console.log(response.data)
          localStorage.setItem('info',JSON.stringify(response.data))
          this.postForm=response.data
          this.imageUrl=this.GLOBALDATA.absoluteUrl+'/'+response.data.avatar
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
          width: 90px;
          display: block;
        }
        select, input {
          border: 0 solid grey;
          height: 25px;
          font-size: 14px;
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 100%;
        }

        .avatar-uploader{
          height: 80px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items:center;
          .ivu-upload-list-file{
            display: none;
            opacity: 0;
          }
        }
        .el-icon-plus{
          line-height: 80px;
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-self: center;
          border-radius: 100%;
          background-color: gainsboro;
        }
        ul{
          display: none;
        }
      }
      .avatar {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .pic {
          width: 80px;
          height: 80px;
          border-radius: 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .tip {
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
    .submit {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      .button {
        width: 90%;
        background-color: #169bd5;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        height: 40px;
      }
    }
  }
</style>
