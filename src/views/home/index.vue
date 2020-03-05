<template>
  <!-- 使用elementUI container布局 -->
  <el-container>
    <el-aside style="width:230px;background-color:'#323745';">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 中间二级路由及头部 -->
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0;">
        <!-- 放入二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}

</script>

<style>

</style>
