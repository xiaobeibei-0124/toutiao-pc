<template>
  <div >
    <el-calendar v-model="value" class="second-home">
    </el-calendar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date()
    }
  }
}
</script>

<style>
  .second-home {
    background-image: url("http://e.hiphotos.baidu.com/zhidao/pic/item/b64543a98226cffc7a951157b8014a90f703ea9c.jpg");
    height: calc(100vh - 60px);
    background-size: cover;
    font-size: 12px;
  }
</style>
