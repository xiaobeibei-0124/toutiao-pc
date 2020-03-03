<template>
  <!-- layout布局 -->
  <el-row class="layout-header" type="flex" align="middle">
    <!-- 左侧 -->
    <el-col :span="12" class="left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="12" class="right">
      <!-- 在放置一个el-row使右侧靠右对齐 -->
      <el-row type="flex" aligin="middle" justify="end">
        <img :src="userInfo.photo" alt="">

        <!-- 下拉选项 -->
        <el-dropdown trigger="click" @command='clickMenu'>
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  // 获取头部用户信息 头像 昵称等 需要在初始化后就要执行 对应生命周期中 created()函数
  created () {
    // 接口文档 获取用户信息需要传入token值 首先获取token
    const token = localStorage.getItem('user-token')
    // 调用接口
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'get'
    }).then(res => {
      // 成功获取，将获取到的数据传给定义好的data中
      this.userInfo = res.data.data
    })
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
        // 点击了个人信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/xiaobeibei-0124/toutiao-pc'
      } else {
        // 退出 删除本地token值 返回到登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    i {
      // 调整图标基线对齐
      vertical-align: middle;
      font-size: 23px;
    }
  }
  .right {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right:5px;
    }
  }

}

</style>
