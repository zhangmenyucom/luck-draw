<template>
  <div class="mobile">
    <div>
      <span>手机号</span>
      <input :value="mobile" maxlength='11' v-model="mobile" placeholder='请输入正确的手机号' />
    </div>
    <div>
      <input type="number" placeholder='验证码'><button @tap='captcha' class="antialiased">{{countDown === 0 ? '获取验证码' : countDown}}</button>
    </div>
    <button>确&nbsp;&nbsp;&nbsp;定</button>
  </div>
</template>
<script>
  import AccountService from '@/services/accountService'
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
    }
  }
</script>
<style scoped>
  @import './index.less';
</style>