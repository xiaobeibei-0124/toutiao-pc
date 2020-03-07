<template>
  <div>
    <el-card class="articles-choose">
    <bread-crumb slot="header">
      <template slot="title">
        内容列表
      </template>
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
        <el-date-picker type="daterange" v-model="searchForm.dateRange">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="articles">
      <!-- 下部内容区域 -->
    <el-row type="flex" align="middle" class="total" slot="header">
      <span>共找到118156条符合条件的内容</span>
    </el-row>
    <div class="article-item" v-for="item in 10" :key="item">
      <div class="left">
        <img src="http://b-ssl.duitang.com/uploads/item/201802/20/20180220165946_RiGPS.thumb.700_0.jpeg" alt="">
        <div class="info">
          <span> 132456</span>
          <el-tag class="tag">已发表</el-tag>
          <span class="date">2020-03-07</span>
        </div>
      </div>
      <div class="right">
        <i class="el-icon-edit">修改</i>
        <i class="el-icon-delete">删除</i>
      </div>
    </div>
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
      channels: [] // 用来装返回的频道数据
    }
  },
  methods: {
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannel()
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
    height: 40px;
    // border-bottom: 1px dashed #ccc;
  }
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px  0;
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
          width: 60px;
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
