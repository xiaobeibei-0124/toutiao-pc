<template>
  <el-card>
    <!-- 引入自定义面包屑导航 -->
    <bread-crumb slot="header">
    <!-- 放置定义好的具名插槽 -->
      <template slot="title">
        图片素材
      </template>
    </bread-crumb>
    <!-- 活页标签 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部图片" name="all">全部图片</el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">收藏图片</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
