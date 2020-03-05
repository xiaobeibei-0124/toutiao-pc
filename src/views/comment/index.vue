<template>
  <el-card>
    <!-- 引入定义好的面包屑组件 -->
    <bread-crumb slot='header'>
    <!-- 插入定义好的具名插槽写入相应的文字 -->
      <template slot='title'>
        评论管理
      </template>
    </bread-crumb>
    <!-- 下部表格 -->
    <el-table :data='list' stripe>
      <el-table-column prop='title' label='标题' width='600'></el-table-column>
      <!-- 给el-table-column 一个formatter属性 用来格式化内容 因为table中不显示布尔值-->
      <el-table-column :formatter='formatterBool' prop='comment_status' label='评论状态'></el-table-column>
      <el-table-column prop='total_comment_count' label='总评论数'></el-table-column>
      <el-table-column prop='fans_comment_count' label='粉丝评论数'></el-table-column>
      <el-table-column label='操作'>
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">关闭评论</el-button>
      </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getcomments () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.list = res.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getcomments()
  }
}
</script>

<style>

</style>
