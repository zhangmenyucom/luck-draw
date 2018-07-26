<template>
  <div class="list">

  </div>
</template>

<script>
  import config from 'config'
  export default {
    data () {
      return {

      }
    },
    onPullDownRefresh () {

    },
    components: {

    },
    methods: {

    },
    onLoad () {
      // 调用应用实例的方法获取全局数据

    },
    onShareAppMessage () {
      return config.share
    }
  }
</script>

<style scoped>
  @import '../../common/util.less';

</style>
