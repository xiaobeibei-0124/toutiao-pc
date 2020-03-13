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
    background-image: url("../../assets/img/date_bg.jpg");
    height: calc(100vh - 60px);
    background-size: cover;
    font-size: 20px;
  }
</style>
