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
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
            <el-card class="img-card" v-for="item in list" :key="item.id" :body-style="{ padding: '0px' }">
              <img :src='item.url' >
              <!-- 图标区域 -->
              <el-row class='operate' type="flex" align="middle" justify="space-around">
                <i class="el-icon-star-on"></i>
                <i class="el-icon-delete-solid"></i>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    // 监听标签变换 当标签变换是重新拉取数据
    changeTab () {
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        method: 'get',
        params: { // query和header中的参数
          collect: this.activeName === 'collect' // 传递的是布尔值 所以看现在点击的活动名称是否是收藏的
        },
        data: {} // body中的参数
      }).then(res => {
        this.list = res.data.results
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
