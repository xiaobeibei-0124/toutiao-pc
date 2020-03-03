<template>
  <!-- 使用elementUI container布局 -->
  <el-container>
    <el-aside style="width:230px;">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 中间二级路由及头部 -->
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>中间二级路由</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '@/components/home/layout-aside'
import layoutHeader from '@/components/home/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}

</script>

<style>

</style>
