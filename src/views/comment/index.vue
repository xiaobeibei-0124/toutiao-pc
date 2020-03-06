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
        <!-- 自定义表格可以用定义域插槽获取表格中的数值 -->
        <!-- slot-scope='自定义名称'可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="openAndClose(obj.row)">{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- 防止分页组件 -->
      <el-row style="height:80px" type="flex" justify="center" align="middle">
        <!-- 拉取数据渲染页面后总数 每页显示的数量 所在第几页 -->
        <el-pagination background layout="prev, pager, next"
        :current-page='page.currentPage'
        :page-size="page.pageSize"
        :total="page.total"
        @current-change='changePage'>
        </el-pagination>
      </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0, // 默认总数是0
        currentPage: 1, // 默认页码第一页
        pageSize: 10 // 默认每页显示10条
      },
      list: []
    }
  },
  methods: {
    changePage (newpage) {
      // alert(newpage)
      this.page.currentPage = newpage // newpage是点击的那页就传哪页
      // 重新拉取数据
      this.getcomments()
    },
    getcomments () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage, // 分页时传递所点击的页数
          per_page: this.page.pageSize // 每页显示几条
        }
      }).then(res => {
        this.list = res.data.results
        // 获取完数据后将总数赋值给total
        this.page.total = res.data.total_count
      })
    },
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    openAndClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // 弹窗提示是否要进行这项操作
      this.$confirm(`是否确定${mess}评论`).then(() => {
        // 点击确定后调接口修改后台数据
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString() // 之前将id设置为bigint型，转化为字符串型
          },
          data: {
            allow_comment: !row.comment_status // 如果页面是打开状态就关闭评论 传是否允许评论的值
          }
        }).then(() => {
          this.$message.success(`${mess}评论成功`)
          this.getcomments()
        }).catch(() => {
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getcomments()
  }
}
</script>

<style>

</style>
