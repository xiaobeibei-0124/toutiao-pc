<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form style="margin-left:50px" label-width="100px" :model="formItem" :rules="formRules" ref="myForm">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入您的标题" style="width:60%" v-model="formItem.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" placeholder="请输入您的内容" :rows="4" style="width:80%" v-model="formItem.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formItem.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择" v-model="formItem.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 传递频道数据
      formItem: { // 设置校验规则绑定数据
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      // 自定义校验规则
      formRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在5-15之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取频道
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 点击发布校验
    publish (draft) {
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/articles',
          method: 'post',
          params: { draft }, // query参数
          data: this.formItem // data参数和绑定数据一致
        }).then(() => {
          this.$message.success('文章发布成功')
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('文章发布失败')
        })
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
