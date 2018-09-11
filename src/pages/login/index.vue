<template>
  <div class="login">
    <div class="c">dddd</div>
    <div class='title'>
      <div class="bold">
        领金豆 抽大奖
      </div>
      <text class='bold'>
        钱包抽奖助手 每天签到领金豆
      </text>
    </div>
    <div class="img">
      <img mode="widthFix" src="/static/img/login.png" alt="">
    </div>

    <button class="button" @getuserinfo='getUserInfo' open-type='getUserInfo'>
      去抽奖
    </button>
  </div>
</template>
<style scoped>
  @import './index.less';
</style>
<script>
import share from '@/common/js/share.js'
import AuthService from '@/services/authService'
export default {
  data () {
    return ({

    })
  },
  components: {

  },
  methods: {
    getUserInfo (e) {
      AuthService.wxLogin(e.mp.detail).then((res) => {
        if (res.code === 0) {
          this.$navigateBack()
        }
      })
    }
  },
  onLoad () {

  },
  onHide () {
  },
  onShow () {

  },
  onShareAppMessage: share()
}
</script>
