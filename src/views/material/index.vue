<template>
  <el-card>
    <!-- 引入自定义面包屑导航 -->
    <bread-crumb slot="header">
    <!-- 放置定义好的具名插槽 -->
      <template slot="title">
        图片素材
      </template>
    </bread-crumb>
    <!-- 上传文件区域 -->
    <el-row type='flex' justify="end">
      <!-- 上传组件要求必须传action属性 不传就会报错 可以给一个空字符串 show-file-list 是否显示已上传文件列表-->
      <el-upload :show-file-list="false" :http-request="uploadImg" action="">
        <el-button size="small" type='primary'>上传素材</el-button>
      </el-upload>
    </el-row>
    <!-- 活页标签 -->
    <el-tabs v-model="activeName" @tab-click="changeTab" v-loading='loading'>
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
            <el-card class="img-card" v-for="item in list" :key="item.id" :body-style="{ padding: '0px' }">
              <img :src='item.url' >
              <!-- 图标区域 -->
              <el-row class='operate' type="flex" align="middle" justify="space-around">
                <i @click="collectImg(item)" class="el-icon-star-on" :style="{color:item.is_collected ? 'red' : 'black'}"></i>
                <i @click="delImg(item)" class="el-icon-delete-solid"></i>
              </el-row>
            </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
         <div class="img-list">
            <el-card class="img-card" v-for="item in list" :key="item.id" :body-style="{ padding: '0px' }">
              <img :src='item.url' >
            </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 一个公共的分页栏 -->
    <el-row type="flex" align="middle" justify="center" style="height:80px;">
      <el-pagination @current-change='changePage' background layout="prev, pager, next"
       :total="page.total"
       :page-size='page.pageSize'
       :current-page="page.currentPage">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0, // 总页数
        pageSize: 16, // 每页显示几条
        currentPage: 1 // 默认显示第一页
      },
      loading: false
    }
  },
  methods: {
    // 点击分页获取当前点击页数
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    // 监听标签变换 当标签变换是重新拉取数据
    changeTab () {
      this.page.currentPage = 1 // 当切换选项时，分页应位于首页
      this.getMaterial()
    },
    // 收藏图片的方法
    collectImg (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: {
          collect: !item.is_collected
        }
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 删除图片的方法
    delImg (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'delete'
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 上传素材的方法
    uploadImg (params) {
      // 接口参数要求是formdata类型
      const data = new FormData()
      data.append('image', params.file) // params.file就是要上传的文件
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        // 成功了就从新提取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('文件上传失败')
      })
    },
    // 获取素材列表的方法
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        method: 'get',
        params: { // query和header中的参数
          collect: this.activeName === 'collect', // 传递的是布尔值 所以看现在点击的活动名称是否是收藏的
          page: this.page.currentPage,
          per_page: this.page.pageSize

        },
        data: {} // body中的参数
      }).then(res => {
        this.list = res.data.results
        // 获取完数据 将总数传给page
        this.page.total = res.data.total_count
        this.loading = false
      }).catch(() => {
        this.$message.error('请求错误')
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
  .img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
     .img-card{
       position: relative;
       width: 180px;
       height: 150px;
       margin: 20px 40px;
       img {
         width: 100%;
         height: 100%;
       }
       .operate {
         position: absolute;
         left: 0;
         bottom: 0;
         height: 30px;
         width: 100%;
         background: #f4f5f6;
         i {
           font-size: 20px;
         }
       }
     }
  }

</style>
