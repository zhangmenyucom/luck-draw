<template>
  <div class="mobile">
    <top title='完善资料' />
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
  import top from '@/components/top'
  export default{
    data () {
      return {
        mobile: '',
        countDown: 0,
        userInfo: {},
        c: ''
      }
    },
    components: {
      top
    },
    methods: {
      captcha () {
        if (this.countDown !== 0) return
        const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!(this.mobile && myreg.test(this.mobile))) {
          this.$showToast('请填写正确的手机号！')
          return false
        }
        const that = this
        AccountService.captcha({
          phone: this.mobile,
          type: 40
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
        const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!(this.mobile && mobileReg.test(this.mobile))) {
          this.$showToast('请填写正确的手机号！')
          return false
        }
        const reg = /^\d{6}\b/
        if (!(this.c && reg.test(this.c))) {
          this.$showToast('请填写正确格式的验证码！')
          return false
        }
        AccountService.changePhone({
          contactNumber: this.mobile,
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