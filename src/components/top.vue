<template>
 <div>
  <!--  <div class="top">
    <div></div><div class="title">{{title}}</div><div></div>
  </div>
  <div class="heightTop">

  </div> -->
</div>
</template>

<script>
  export default {
    props: [`title`],
    data () {
      return {
        isModel: false
      }
    },
    onLoad () {
      console.log('ddd')
    }
  }
</script>

<style scoped>
  @import '../common/less/util.less';
  .top{
    left:0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99999999999999;
    display: flex;
    padding-top:22*@2;
    background: RGBA(8, 9, 15, 1);
    color: #fff;
    > div{
      min-width: 100*@2;
    }
    .title{
      text-align: center;
      flex:1;
      font-size: 16*@2;
      line-height: 42*@2;
    }
  }
  .heightTop{
    height: 64*@2;
  }
</style>
