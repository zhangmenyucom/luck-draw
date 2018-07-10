<template>
  <div class="list">
    <meActivitieList :list="activitieList" />
  </div>
</template>

<script>
  import meActivitieList from '@/components/meActivitieList'
  export default {
    data () {
      return {
        activitieList: [1]
      }
    },
    onPullDownRefresh () {

    },
    components: {
      meActivitieList
    },
    methods: {

    },
    onLoad () {
      // 调用应用实例的方法获取全局数据

    }
  }
</script>

<style scoped>
  @import '../../common/util.less';
  .list{
    min-height: 100vh;
    background: #fff;
  }
</style>
