<template>
  <div>
    <el-card class="articles-choose">
      <bread-crumb slot="header">
        <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
          <el-radio-group v-model="searchForm.status" size="medium">
            <el-radio-button :label="5">全部</el-radio-button>
            <el-radio-button :label="0">草稿</el-radio-button>
            <el-radio-button :label="1">待审核</el-radio-button>
            <el-radio-button :label="2">审核通过</el-radio-button>
            <el-radio-button :label="3">审核失败</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select placeholder="请选择" v-model="searchForm.channel_id">
            <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker type="daterange" value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="articles">
      <!-- 下部内容区域 -->
      <el-row type="flex" align="middle" class="total" slot="header">
        <span>共找到{{total_count}}条符合条件的内容</span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
          <!-- 看有无图片 没有的话用自定义的图片 有的话就用它的 返回是个数组 所以是[0] -->
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <!-- 状态栏返回的是数字，需要用过滤器初期数据 在网上填 用法：待处理的内容|过滤器名字-->
            <el-tag :type="item.status | filterType" class="tag">{{ item.status | filterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <i class="el-icon-edit" >修改</i>
          <span @click="delArticles(item.id.toString())"><i class="el-icon-delete">删除</i></span>
        </div>
      </div>
      <!-- 分页区域 -->
      <el-row style="height:50px" type='flex' align="middle" justify="center">
        <el-pagination background layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change='changePage'></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5,
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      total_count: [],
      list: [], // 接收文章列表
      defaultImg: require('../../assets/img/mydefine.jpeg'), // 用来装固定图片,地址变成了固定的变量 在编译的时候会被拷贝到对应的位置，如果直接写地址会找不到
      channels: [], // 用来装返回的频道数据
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  // 监视删选项的变化
  watch: {
    // 监视谁就写谁
    searchForm: {
      deep: true, // 固定写法 深度检测searchform中的所有数据
      handler () {
        // 条件变化时，页面置为首页
        this.page.currentPage = 1
        // 监视到发生变化后 执行此函数
        this.changeCondition()
      }
    }
  },
  methods: {
    // 删除文章
    delArticles (id) {
      this.$confirm('您确定要删除此条文章吗？').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(() => {
          this.$message.success('删除文章成功')
          this.changeCondition()
        }).catch(() => {
          this.$message.success('删除文章失败')
        })
      })
    },
    // 改变页码事件
    changePage (newpage) {
      this.page.currentPage = newpage
      this.changeCondition() // 页码变化传递页码重新刷取页面
    },
    // 搜索项变化时，先组装条件 在同意发请求 用watch 或者 change 监视数据是否发生变化 发生变化执行此方法 再重新刷新页面
    changeCondition () {
      // 组装要传递的数据
      const params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        // 看是否传递了时间 有传参的话 就有长度 &至少不为空然后才有长度 不然为空的长度会报错
        begin_pubdate:
          this.searchForm.dateRange && this.searchForm.dateRange.length
            ? this.searchForm.dateRange[0]
            : null,
        end_pubdate:
          this.searchForm.dateRange && this.searchForm.dateRange.length > 1
            ? this.searchForm.dateRange[1]
            : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      // 调用页面方法
      this.getArticles(params)
    },
    // 获取频道数据
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取具体内容
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.total_count = res.data.total_count
        this.page.total = res.data.total_count
      })
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'success'
        case 1:
          return 'warning'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  created () {
    this.getChannel()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.articles-choose {
  margin: 10px;
}
.articles {
  margin: 10px;
  .total {
    height: 30px;
    // border-bottom: 1px dashed #ccc;
  }
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100px;
        margin-left: 15px;
        .date {
          font-size: 12px;
          color: #ccc;
        }
        .tag {
          width: 80px;
          text-align: center;
        }
      }
    }
    .right {
      font-size: 12px;
      margin-right: 15px;
      cursor: pointer;
      user-select: none;
      i {
        margin: 0 5px;
      }
    }
  }
}
</style>
