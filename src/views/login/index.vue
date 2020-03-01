<template>
  <div class="login">
    <!-- <h1>我是登录页面</h1> -->
    <el-card class="login-card">
      <!-- 图标 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:20px;padding:0 10px;">
        <!-- 每一个表单容器 -->
       <el-form-item>
         <!-- 表单域 -->
         <el-input placeholder="请输入手机号"></el-input>
       </el-form-item>
       <el-form-item>
         <el-input style="width:60%" placeholder="验证码"></el-input>
         <el-button plain style="float:right">发送验证码</el-button>
       </el-form-item>
       <el-form-item>
         <el-checkbox>我已阅读同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <el-form-item>
         <el-button style="width:100%" type="primary">登录</el-button>
       </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>
// lang让里面内容可以用less scope 让中间的属性只能自己使用，不是全局的
<style lang='less' scoped>
.login{
  background-image: url('../../assets/img/bgc.jpg');
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  // 转换成flex 垂直居中
  align-items: center;
  .login-card{
    background-color: rgba(0,0,0,.2);
    border: 0;
    width: 440px;
    height: 350px;

    .title {
      text-align: center;
      img{
        height: 40px;
      }
    }

  }

}

</style>
