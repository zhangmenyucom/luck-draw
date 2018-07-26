<template>
  <div class="takePrize ">
    <!-- 地址展示 -->
    <div class='address'>
      <span class='title antialiased'>
        奖品配送至
      </span>
      <!-- 无地址 -->
      <div>
        选择收货地址 >
      </div>
      <!-- 无地址结束 -->
    </div>
    <!-- 地址展示结束 -->
    <!-- 活动 -->
    <div class="activitie">
      <div class="top">viod</div>
      <div class="user">
        <div class="head">
          <img :src="userInfo.avatar">
        </div>
        <text class='nickName'>
          {{userInfo.nickName}}
        </text>
        <br />
        <span class="luckyNumber">
            幸运号：3478923749
        </span>
      </div>

    </div>
    <!-- 活动结束 -->
  </div>
</template>
<script>
  import AccountService from '@/services/accountService'
  import { getUserInfo } from '@/utils'
  export default{
    data () {
      return {
        mobile: '',
        countDown: 0,
        userInfo: {}
      }
    },
    methods: {
      captcha () {
        if (this.countDown === 0) return
        const that = this
        AccountService.captcha({
          phone: this.mobile,
          type: 30
        }).then((res) => {
          if (res.code === 0) {
            this.countDown = 60
            const countDown = setInterval(() => {
              --that.countDown
              console.log(countDown)
              if (that.countDown <= 0) {
                clearInterval(countDown)
              }
            }, 1000)
          }
        })
      },
      inputChang (e) {
        console.log('e', e)
      }
    },
    onLoad () {
      const userInfo = getUserInfo()
      this.userInfo = userInfo
    }
  }
</script>
<style scoped>
  @import './index.less';
</style>