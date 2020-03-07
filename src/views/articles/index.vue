<template>
  <el-card>
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

<style>

</style>
