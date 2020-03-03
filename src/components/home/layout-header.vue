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
        <img src="../../assets/img/avatar.jpg" alt="">

        <!-- 下拉选项 -->
        <el-dropdown trigger="click">
          <span>用户昵称</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {

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
