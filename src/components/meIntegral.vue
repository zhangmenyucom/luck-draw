<template>
  <div class="meIntegral">
    <span>
      我的金豆：{{score}}
    </span>
    <a v-if="!isHideJump" open-type="switchTab" href="/pages/obtainGoldBean/index" class='right' @click="getBean">
      赚金豆>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['score', 'getBean', 'isHideJump']
  }
</script>

<style scoped>
  @import '../common/less/util.less';
  .meIntegral{
    height: 35*@2;
    background: RGBA(0, 0, 0, 0.8);
    line-height: 35*@2;
    font-size: 13*@2;
    color: #fff;
    padding:0 15*@2;
    .right{
      color: RGBA(255, 221, 62, 1)
    }
  }
</style>
