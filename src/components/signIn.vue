<template>
  <div class="model" v-if='isModel'>
    <div class="signIn">
      <div class="cen">
        <div class="title">
          — 签到 —
        </div>
        <img src="https://oss.qianbaocard.org/20180914/768b41f939f24ea5af400df8beb04a02.png">
        <div class='explain'>
          签到第{{number+1}}天
        </div>
        <button @tap.stop="bindgetuserinfo" type="">领取{{signInRule}}金豆</button> 
      </div>
    </div>
  </div>
</template>

<script>
  import FootprintsActivities from '@/services/footprintsActivities'
  import DailyFootprintsService from '@/services/dailyFootprintsService'
  import ScoreRulesService from '@/services/scoreRulesService'
  import { getUserInfo } from '@/utils'
  export default {
    props: [`isLogin`],
    watch: {
      isLogin (val) {
        console.log('val', val)
        if (val) {
          this.judgeSignIn().then((res) => {
            this.isModel = !res
          })
        }
      }
    },
    data () {
      return {
        isModel: false,
        number: 0, // 连续签到天数
        signInRule: 0 // 签到获取的积分
      }
    },
    methods: {
      bindgetuserinfo (e) {
        FootprintsActivities.add({
          type: 'SIGN_IN'
        }).then((res) => {
          if (res.code === 0) {
            this.isModel = false
          }
        })
      },
      getScoreRules (number) {
        ScoreRulesService.getList().then((res) => {
          if (res.code === 0) {
            const goldBeanRules = JSON.parse(res.data.filter((rule) => rule.type === 2)[0].rule)
            this.signInRule = parseInt(goldBeanRules.base) + ((number) > parseInt(goldBeanRules.maxStep) ? parseInt(goldBeanRules.maxStep) : (number)) * parseInt(goldBeanRules.stepAdd)
          }
        })
      },
      judgeSignIn () { // 判断今天是否签到
        const userInfo = getUserInfo()
        return DailyFootprintsService.getList({
          userId: userInfo.id,
          pageNum: 1,
          pageSize: 1,
          type: 'SIGN_IN'
        }).then(res => {
          if (res.code === 0) {
            if (res.data.length > 0) {
              const scoreCounters = res.data[0]
              const oldScoreCounters = this.$getStorageSync('scoreCounters')
              if (oldScoreCounters.number !== scoreCounters.number) {
                this.$setStorageSync('scoreCounters', scoreCounters)
              }
              // 记录最新签到信息
              this.scoreCounters = scoreCounters

              // 对比今天是否签到 上一次是否是昨天
              const lastSignInTime = scoreCounters.lastOperationTime
              if (lastSignInTime) {
                const date = new Date()
                const strDate = date.getFullYear() + '' + this.check(date.getMonth() + 1) + this.check(date.getDate())
                date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
                const strPreDate = date.getFullYear() + '' + this.check(date.getMonth() + 1) + this.check(date.getDate())
                if (strDate === lastSignInTime) {
                  // 上一次签到是今天
                  this.getScoreRules(scoreCounters.number)
                  this.number = scoreCounters.number
                  return true
                } else if (strPreDate === lastSignInTime) {
                  // 上一次签到是昨天
                  this.getScoreRules(scoreCounters.number)
                  this.number = scoreCounters.number
                  return false
                } else {
                  // 上一次签到是昨天之前 断开了
                  this.getScoreRules(0)
                  this.number = 0
                  return false
                }
              }
            }

            // 没有上一次签到信息
            this.getScoreRules(0)
            this.number = 0
            return false
          } else {
            // error
            return false
          }
        })
      },
      check (str) {
        str = str.toString()
        if (str.length < 2) {
          str = '0' + str
        }
        return str
      }
    }
  }
</script>

<style scoped>
  @import '../common/less/util.less';
  .model{
    position: fixed;
    top:0;
    left:0;
    bottom: 0;
    right:0;
    background: RGBA(0, 0, 0, 0.6);
    z-index: 199999;
  }
  .signIn{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 260*@2;
    transform:translate(-50%, -50%);
    box-sizing: border-box;
    border-width: 76*@2 10*@2 10*@2;
    border-style: solid;
    border-color: transparent;
    -webkit-border-image:url(https://oss.qianbaocard.org/20180914/7b0e9c5fc57f482c97d47c34c541b03c.png) 152 20 20 stretch;
  }
  .cen{
    margin: -52*@2 0 0;
    text-align: center;
    .title{
      font-size: 18*@2;
    }
    >img{
      width: 108*@2;
      height: 106*@2;
      margin-top: 35*@2;
    }
    .explain{
      color: RGBA(240, 145, 66, 1);
      font-size: 18*@2;
      margin-top: 35*@2;
    }
    button {
      margin-top: 20*@2;
      margin-bottom: 10*@2;
      width: 180*@2;
      height: 40*@2;
      line-height: 40*@2;
      font-size: 16*@2;
      font-family:PingFangSC-Regular;
      background: RGBA(243, 185, 19, 1);
      color: RGBA(255, 255, 255, 1);
      border-radius: 2*@2;
    }
  }
</style>
