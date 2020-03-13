<template>
    <el-card  shadow="never">
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form style="margin-left:20px" label-width="100px" :model="formItem" :rules="formRules" ref="myForm">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入您的标题" style="width:60%" v-model="formItem.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 将input换为quill-editor 引用富文本编辑器 -->
        <quill-editor style="width:90%;height:350px" v-model="formItem.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:130px">
        <!-- 给单选框添加值改变事件监视 -->
        <el-radio-group v-model="formItem.cover.type" @change="changeType">
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
    // 上传图片改变类型事件
    changeType () {
      if (this.formItem.cover.type === 1) {
        // 点击单图模式
        this.formItem.cover.images = ['']
      } else if (this.formItem.cover.type === 3) {
        // 三图模式
        this.formItem.cover.images = ['', '', '']
      } else {
        // 无图模式
        this.formItem.cover.images = []
      }
    },
    // 根据id获取文章详情数据
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.formItem = res.data
      })
    },
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
        const { articleId } = this.$route.params // 是否有id值 来判断是修改还是新增
        //  发布正式文章 发布草稿文章
        //  修改正式文章  修改草稿文章
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles',
          method: articleId ? 'put' : 'post',
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
    const { articleId } = this.$route.params
    // && 运算符 如果前面为true 才会执行后面的逻辑 是否存在id
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
