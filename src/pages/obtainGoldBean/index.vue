<template>
<div>
  <div class="list">
    <top :hideIcone='true' title='任务中心' />
    <div class="head">
      <div>
        <span class='left'>
          每日签到
        </span>
        <span class='right'>
          已连续签到{{scoreCounters.number}}天
        </span>
        <div class="c"></div>
        <div class="record">
          <div v-for='i in 7' :class="{opacity:(i +1 ) > scoreCounters.number}">
            <div class="icon">
              {{goldBean[i]}}
            </div>
            <img src="/static/img/goldBean.png" alt="" />
            <text>第{{i + 1 + number}}天</text>
          </div>
        </div>
      </div>
    </div>
    <div class="classify">
      新手任务
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-bangdingshoujihao" :style="{color:'RGBA(255, 151, 58, 1)'}"></i>
      </div>
      <div class="left" style="padding:10px 0 10px 0">
        <span class='title'>
          绑定手机号
        </span>
        <br />
        {{rule.mobile}} <img src="/static/img/goldBean.png" alt=""> <text>/&nbsp;次</text> &nbsp;&nbsp;
      </div>
      <div class="right" @click="bindPhone" style="padding:10px 0 auto 0">
        <a v-if="!userInfo.contactNumber" href="/pages/mobile/index">
          去绑定
        </a>
        <div v-else class='complete'>
          已完成
        </div>
      </div>
      <div class="c"></div>
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-wanshanziliao"></i>
      </div>
      <div class="left" style="padding:10px 0 10px 0">
        <span class='title'>
          完善资料
        </span>
        <br />
        {{rule.total}} <img src="/static/img/goldBean.png" alt=""><text>/&nbsp;次</text> &nbsp;&nbsp;
      </div>
      <div class="right" style="padding:10px 0 auto 0">
        <a v-if="!(userInfo.contactNumber && userInfo.location && userInfo.birthday)" href="/pages/editInfo/index" @click="complete">
          去完善
        </a>
        <div v-else class='complete'>
          已完成
        </div>
      </div>
      <div class="c"></div>
    </div>
    <div class="classify">
      日常任务
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-fenxiang" :style="{color:'RGBA(107, 200, 50, 1)'}"></i>
      </div>
      <div class="left" style="padding:10px 0 10px 0">
        <span class='title'>
          分享微信群
        </span>
        <br />
        {{shareRule.base}}<img src="/static/img/goldBean.png" alt=""><text>/&nbsp;次</text> &nbsp;&nbsp;
      </div>
      <div class="right" @click="shareWx" style="padding:10px 0 10px 0">
        <button v-if="shareRule.maxStep > shareNumber" open-type="share">
          领取 {{shareNumber}} /{{(shareRule.maxStep - shareNumber)<0?0:(shareRule.maxStep)}}
        </button>
        <div v-else class='complete'>
          今日已领完
        </div>
      </div>
      <div class="c"></div>
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-kanguanggao" :style="{color:'#1296db'}"></i>
      </div>
      <div class="left" style="padding:10px 0 10px 0">
        <span class='title'>
          看广告
        </span>
        <br />
        {{shareRule.base}}<img src="/static/img/goldBean.png" alt=""><text>/&nbsp;次</text> &nbsp;&nbsp;
      </div>
      <navigator  class="right" @click="toXcx" style="padding:10px 0 10px 0" target="miniProgram" open-type="navigate" :app-id="appId">
        <button v-if="shareRule.maxStep > shareNumber">
          领取
        </button>
        <div v-else class='complete'>
          今日已领完
        </div>
      </navigator>
      <div class="c"></div>
    </div>
    <signIn :signInCB = "signInCB" :showModel = "!isModel"/>
  </div>
</div>
</template>

<script>
  import signIn from '@/components/signIn'
  import top from '@/components/top'
  import {getUserInfo, check} from '@/utils'
  import DailyFootprintsService from '@/services/dailyFootprintsService'
  import ScoreRulesService from '@/services/scoreRulesService'
  import share from '@/common/js/share.js'
  import getMeScores from '@/common/js/getMeScores.js'
  import MeScoresService from '@/services/meScoresService.js'
  import Footprints from '@/services/footPrints.js'
  const mta = require('@/common/js/mta_analysis.js')
  export default {
    data () {
      return {
        userInfo: {},
        display: false,
        rule: {},
        isModel: false,
        shareNumber: 0,
        shareRule: {},
        week: ['一', '二', '三', '四', '五', '六', '七'],
        goldBean: [0, 0, 0, 0, 0, 0, 0],
        complete: false,
        isGet: false,
        onPullDownRefresh: false,
        pageNum: 1,
        score: 0,
        scoreCounters: {},
        number: 0,
        appId: ''
      }
    },
    components: {
      signIn,
      top
    },
    methods: {
      getScoreRules () {
        ScoreRulesService.getList().then(res => {
          if (res.code === 0) {
            const rule = JSON.parse(res.data.filter(data => data.type === 4)[0] ? res.data.filter(data => data.type === 4)[0].rule : {})
            rule.total = Object.values(rule).reduce((total, num) => parseInt(total, 10) + parseInt(num, 10))

            const shareRule = JSON.parse(res.data.filter(data => data.type === 3)[0] ? res.data.filter(data => data.type === 3)[0].rule : {})
            this.rule = rule
            this.shareRule = shareRule
            const number = this.scoreCounters.number > 7 ? this.scoreCounters.number - 7 : 0 // 需要展示的第一天
            this.number = number
            const goldBeanRules = JSON.parse(res.data.filter((rule) => rule.type === 2)[0].rule)
            --goldBeanRules.maxStep
            this.goldBean = [...Array(7)].map((v, i) => parseInt(goldBeanRules.base) + ((i + number) > parseInt(goldBeanRules.maxStep) ? parseInt(goldBeanRules.maxStep) : (i + number)) * parseInt(goldBeanRules.stepAdd))
          }
        })
      },
      signInCB (data) {
        const signIn = this.$getStorageSync('signIn')
        if (signIn) {
          this.isModel = false
        }
        if (data.score) {
          // 签到后 直接获取积分数
          this.score = data.score
        } else {
          this.getMeScores()
        }
        this.scoreCounters = data.scoreCounters || this.$getStorageSync('scoreCounters') // 获取连续签到天数
        this.getScoreRules()
        this.getDailyFootprintsShare()
        getMeScores.start(this)
      },
      shareWx () {
        mta.Event.stat('share', {'method': '赚金豆分享'})
      },
      bindPhone () {
        mta.Event.stat('bind_phone', {'from': '赚金豆页面'})
      },
      changeDisplay () {
        this.display = !this.display
      },
      toXcx () {
        DailyFootprintsService.getList({
          userId: this.userInfo.id,
          type: 'VIEW_AD'
        }).then((res) => {
          console.log(res)
        })
      },
      getMeScores () {
        MeScoresService.getList().then(res => {
          if (res.code === 0) {
            this.score = res.data.score
          }
        })
      },
      getDailyFootprintsShare () {
        DailyFootprintsService.getList({
          userId: this.userInfo.id,
          pageNum: 1,
          pageSize: 1,
          type: 'SHARE'
        }).then((res) => {
          if (res.code === 0) {
            const scoreCounters = res.data[0]
            const lastSignInTime = scoreCounters.lastOperationTime
            if (lastSignInTime) {
              const newDate = new Date()
              const date = parseInt(newDate.getFullYear() + '' + check(newDate.getMonth() + 1) + check(newDate.getDate()), 10)
              if (date <= parseInt(lastSignInTime)) {
                this.shareNumber = res.data[0].number
              }
            }
          }
        })
      }
    },
    onLoad () {
      mta.Page.init()
      this.$setStorageSync('signIn', false)
      Footprints.add().then((res) => {
          if (res.code === 0) {
            this.appId = res.data.target.id
          }
      })
    },
    onShow () {
      const userInfo = getUserInfo()
      if (userInfo.id) {
        this.userInfo = userInfo
        this.signInCB({})
      } else {
        this.isModel = true
      }
      if (!this.$getStorageSync('getBeanMethod')) {
        mta.Event.stat('get_bean', {'from': 'tab赚金豆'})
      } else {
        mta.Event.stat('get_bean', {'from': this.$getStorageSync('getBeanMethod')})
      }
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
  @import './index.less';
</style>
