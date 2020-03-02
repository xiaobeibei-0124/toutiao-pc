<template>
  <div class="login">
    <!-- <h1>我是登录页面</h1> -->
    <el-card class="login-card">
      <!-- 图标 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <!-- :model :rules 与data中验证数据进行绑定 为验证数据做准备 -->
      <!-- ref 设置属性，使方法中可以获得该对象实例 用于手动校验信息 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px;padding:0 10px;">
        <!-- 每一个表单容器 -->
          <!-- prop 输入所需校验的字段名 -->
       <el-form-item prop="mobile">
         <!-- 表单域 -->
          <!-- v-model 将表单数据进行双向绑定传入data中 进行后期验证 -->
         <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
       </el-form-item>
       <!-- 验证码 -->
       <el-form-item prop="code">
         <el-input v-model="loginForm.code" style="width:60%" placeholder="验证码"></el-input>
         <el-button plain style="float:right">发送验证码</el-button>
       </el-form-item>
       <!-- 复选框 -->
       <el-form-item prop="checked">
         <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <el-form-item>
         <!-- 给登录按钮添加点击事件 -->
         <el-button @click="login" style="width:100%" type="primary">登录</el-button>
       </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 设置代码校验所用的数据
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      // 设置验证规则
      loginRules: {
        // 手机号码的校验规则
        mobile: [{ required: true, message: '您的手机号码不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '您输入的号码格式不正确' }],
        // 正则表达式：/中间写数据/ ^开头 $结尾 \d 0-9数字 {9}9位
        // 验证码的校验规则
        code: [{ required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码错误' }],
        // 复选框的校验规则
        checked: [{
          // validator 自定义校验函数
          // rule 当前函数体中自定义的校验规则
          // value 选用自定义校验函数所对应的value值
          validator: function (rule, value, callback) {
            // callback 无论校验成功失败都要执行一个回调函数 如果失败需要在函数中 new Error 抛出错误的信息
            value ? callback() : callback(new Error('勾选此项完成登录'))
          }
        }]
      }
    }
  },
  // 设置手动校验方法 点击登录进行校验
  methods: {
    login () {
      // this.$refs.loginForm 获取当前实例对象
      // validate 1.可以使用promise格式 执行成功后会进入到then中 失败进入到catch中
      //  2.也可以传入一个函数 function(boolean值){if(trun){success}else{failure}}
      this.$refs.loginForm.validate().then(() => {

      })
    }
  }
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
