<template>
  <div>
    dsddd
  </div>
</template>
<script>
  const mta = require('@/common/js/mta_analysis.js')
  export default {
    onShow (options) {
      this.$setStorageSync('scene', options.scene)
      this.$setStorageSync('topscene', options.scene)
      mta.App.init({
        'appID': '500633711',
        'eventID': '500633717',
        'statPullDownFresh': true,
        'statShareApp': true,
        'statReachBottom': true
      })
      const updateManager = wx.getUpdateManager()
      updateManager.onUpdateReady(function () {
        updateManager.applyUpdate()
      })
    }
  }
</script>
<style>
  @import (less) '../static/iconFont/iconfont.css';
  @import './common/less/util.less';
  @import (less) '../static/weui/weui.css';
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
  }
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
  view {
    font-family: DINAlternate PingFangSC-Regular;
    box-sizing: border-box;
  }
  page{
    background-size: 100% auto;
    background: #F1F1F1;
  }
  .antialiased{
    -webkit-font-smoothing: antialiased;
  }
  .bold{
    font-weight: bold;
  }
  .left{
    float: left;
  }
  .right{
    float:right;
  }
  .c{
    clear: both;
  }
  .top{
    height: 0;
    overflow: hidden;
  }
  .disableButton{
    background: #F1F1F1!important;
    color: #999!important;
    box-shadow:none!important;
  }
  button::after{
    border: none;
  }
</style>
