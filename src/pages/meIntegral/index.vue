<template>
  <div>
    <div class="meIntegral">
      <span>
        我的金豆：120
      </span>
      <text class='right'>
        赚金豆>
      </text>
    </div>
    <div class="list">
      <lists :list="activitieList" />
    </div>
  </div>
</template>

<script>
  import lists from '@/components/list'
  export default {
    data () {
      return {
        activitieList: [1]
      }
    },
    onPullDownRefresh () {

    },
    components: {
      lists
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
  .meIntegral{
    height: 35*@2;
    background: RGBA(0, 0, 0, 0.9);
    line-height: 35*@2;
    font-size: 13*@2;
    color: #fff;
    padding:0 15*@2;
    .right{
      color: RGBA(255, 221, 62, 1)
    }
  }
  .list{
    min-height: 100vh;
    background: #fff;
    padding-left: 15*@2;

  }
</style>
