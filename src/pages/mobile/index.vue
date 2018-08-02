<template>
  <div class="mobile">
    <div>
      <span>手机号</span>
      <input maxlength='11' v-model="mobile" placeholder='请输入正确的手机号' />
    </div>
    <div>
      <input v-model="c" type="number" placeholder='验证码'>
      <button @tap='captcha' class="antialiased">{{countDown === 0 ? '获取验证码' : countDown}}</button>
    </div>
    <button @tap='changePhone'>确&nbsp;&nbsp;&nbsp;定</button>
  </div>
</template>
<script>
  import AccountService from '@/services/accountService'
  import share from '@/common/js/share.js'
  export default{
    data () {
      return {
        mobile: '',
        countDown: 0,
        userInfo: {},
        c: ''
      }
    },
    methods: {
      captcha () {
        if (this.countDown !== 0) return

        const that = this
        AccountService.captcha({
          phone: this.mobile,
          type: 30
        }).then((res) => {
          if (res.code === 0) {
            this.countDown = 60
            const countDown = setInterval(() => {
              --that.countDown
              if (that.countDown <= 0) {
                clearInterval(countDown)
              }
            }, 1000)
          }
        })
      },
      changePhone () {
        AccountService.changePhone({
          phone: this.mobile,
          captcha: this.c
        }).then((res) => {
          if (res.code === 0) {
            this.$setStorageSync('userInfo', res.data)
            this.$navigateBack()
          }
        })
      }
    },
    onShareAppMessage: share()
  }
</script>
<style scoped>
  @import './index.less';
</style>