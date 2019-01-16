<template>
 <div>
   <div class="top" :style="{'background': background || '#08090F', height: isIPhoneX ? '86px':'64px', paddingTop: isIPhoneX ? '44px':'22px'}">
     <div v-if='!hideIcone'>
      <div v-if = 'isHome' :style="{fontSize:'20px'}" class='icon iconfont icon-navbar-home' @tap='goHome'></div>
      <div v-else :style="{fontSize:'20px'}" class='icon iconfont icon-navbar-back' @tap='back'></div>
    </div>
    <div v-else />
    <div class="title" :style="{lineHeight: '42px', fontSize: '16px'}">{{title}}</div>
    <div></div>
  </div>
  <div class="heightTop" :style="{height: isIPhoneX ? '86px':'64px'}">
  </div>
</div>
</template>
<script>
  export default {
    props: [`title`, `background`, `hideIcone`, `backNum`],
    data () {
      return {
        isHome: false,
        isIPhoneX: false
      }
    },
    methods: {
      back () {
        this.$navigateBack(this.backNum || 1)
      },
      goHome () {
        this.$switchTab('/pages/index/index')
      }
    },
    onLoad () {
      const isHome = new Set([1007, 1008, 1011, 1012, 1013, 1014, 1036, 1047, 1048, 1049, '1007', '1011', 'createActivities'])
      const scene = this.$getStorageSync('topscene')
      // 判断是否是isIPhoneX
      const systemInfo = this.$getSystemInfoSync()
      this.isIPhoneX = systemInfo.model.indexOf('iPhone X') > -1
      this.isHome = scene && isHome.has(scene)
      this.$removeStorage('topscene')
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
    /*padding-top:22*@2;*/
    background: #08090F;
    color: #fff;
    /*height: 64*@2;*/
    > div{
      min-width: 100*@2;
    }
    .icon{
      /*font-size: 20*@2;*/
      padding-top: 9*@2;
      padding-left: 16*@2;
    }
    .title{
      text-align: center;
      flex:1;
      /*font-size: 16*@2;*/
      /*line-height: 42*@2;*/
    }
  }
  .heightTop{
    /*height: 64*@2;*/
  }
</style>
