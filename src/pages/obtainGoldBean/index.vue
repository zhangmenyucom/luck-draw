<template>
  <div class="obtainGoldBean">
    <top :hideIcone='true' title='任务中心' />
    <meIntegral :score='score' :isHideJump="true" />
    <div class="head">
      <div>
        <span class='left bold'>
          每日签到
        </span>
        <span class='right'>
          已连续签到{{scoreCounters.number}}天
        </span>
        <div class="c"></div>
        <div class="record">
          <div v-for='i in 5' :class="{opacity:(i +1 ) > scoreCounters.number}" :key="i">
            <div class="icon">
              {{goldBean[i]}}
            </div>
            <img src="/static/img/goldBean.png" alt="" />
            <text>第{{i + 1 + number}}天</text>
          </div>
        </div>
      </div>
    </div>
    <div class="headInterval">
    </div>
    <div class="classify">
      新手任务
    </div>
    <div class="list">
      <!-- #warning 绑定手机号 -->
      <!-- <div>
        <div class="left icon">
          <i class="icon iconfont icon-bangdingshoujihao" :style="{color:'RGBA(255, 151, 58, 1)'}"></i>
        </div>
        <div class="left" :class="userInfo.contactNumber ? 'noBean' : 'hasBean'">
          <span class='title'>
            绑定手机号
          </span>
          <br />
          <div class="expalin" v-if="!userInfo.contactNumber">{{rule.mobile}} <img src="/static/img/goldBean.png" alt=""> &nbsp;&nbsp;</div>
        </div>
        <div class="right" @click="bindPhone" :class="{noBean:userInfo.contactNumber}">
          <button v-if="!userInfo.contactNumber" href="/pages/mobile/index" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
            去绑定
          </button>
          <div v-else class='complete'>
            已完成
          </div>
        </div>
        <div class="c"></div>
      </div> -->
      <div>
        <div class="left icon">
          <i class="icon iconfont icon-wanshanziliao"></i>
        </div>
        <div class="left" :class="(userInfo.contactNumber && userInfo.location && userInfo.birthday) ? 'noBean' : 'hasBean'">
          <span class='title'>
            完善资料
          </span>
          <br />
          <div class="expalin" v-if="!(userInfo.contactNumber && userInfo.location && userInfo.birthday)">{{rule.total}} <img src="/static/img/goldBean.png" alt=""> &nbsp;&nbsp;</div>
        </div>
        <div class="right" :class="{noBean:(userInfo.contactNumber && userInfo.location && userInfo.birthday)}">
          <a v-if="!(userInfo.contactNumber && userInfo.location && userInfo.birthday)" href="/pages/editInfo/index" @tap="onCompleteInfo">
            去完善
          </a>
          <div v-else class='complete'>
            已完成
          </div>
        </div>
        <div class="c"></div>
      </div>
    </div>
    <div class="headInterval">
    </div>
    <div class="classify">
      日常任务
    </div>
    <div class="list">
      <div>
        <div class="left icon">
          <i class="icon iconfont icon-fenxiang" :style="{color:'RGBA(107, 200, 50, 1)'}"></i>
        </div>
        <div class="left" :class="!(shareRule.maxStep > shareNumber) ? 'noBean' : 'hasBean'">
          <span class='title'>
            分享微信群
          </span>
          <br />
          <div class="expalin" v-if="shareRule.maxStep > shareNumber">{{shareRule.base}}<img src="/static/img/goldBean.png" alt=""><text>/&nbsp;次</text> &nbsp;&nbsp;</div>
        </div>
        <button @tap="shareWx" v-if="shareRule.maxStep > shareNumber" open-type="share">领取 {{shareNumber}}/{{(shareRule.maxStep - shareNumber) <= 0 ? 0:(shareRule.maxStep)}}</button>
        <div v-else class='complete'>
          今日已领完
        </div>
        <div class="c"></div>
      </div>
      <div v-for="(item, index) in advertiseRule" :key="index">
        <div class="left icon">
          <i class="icon iconfont icon-kanguanggao" :style="{color:'#1296db'}"></i>
        </div>
        <div class="left" style="padding:10px 0 10px 0">
          <span class='title'>
            {{item.title}}
          </span>
          <br />
          <div class="expalin">{{item.score}}<img src="/static/img/goldBean.png" alt=""> &nbsp;&nbsp;</div>
        </div>
        <navigator target='miniProgram' v-if="!adAppIds[item.appId] || adAppIds[item.appId] <= 0" :app-id="item.appId" :path="item.path" @error='fail' @success="() => toXcx(item.appId, item.title)" @fail='() => toXcxFail(item.appId, item.title)' @complete='() => toXcxClick(item.appId, item.title)'>领取</navigator>
        <div v-else class='complete'>
          今日已领完
        </div>
        <div class="c"></div>
      </div>
    </div>

    <signIn :signInCB = "signInCB" :showModel = "!isModel"/>
  </div>
</template>

<script>
  import signIn from '@/components/signIn'
  import top from '@/components/top'
  import {
    getUserInfo,
    check
  } from '@/utils'
  import DailyFootprintsService from '@/services/dailyFootprintsService'
  import ScoreRulesService from '@/services/scoreRulesService'
  import BindPhoneService from '@/services/bindPhoneService'
  import share from '@/common/js/share.js'
  import meIntegral from '@/components/meIntegral'
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
        adAppIds: [],
        advertiseRule: [],
        isMiniProgram: false
      }
    },
    components: {
      signIn,
      top,
      meIntegral
    },
    methods: {
      fail (err) {
        console.log('err', err)
      },
      onCompleteInfo () {
        getApp().aldstat.sendEvent('赚金豆-去完善资料')
      },
      getPhoneNumber (e) {
        return BindPhoneService.add({
          encryptedData: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv
        }).then(res => {
          if (res.code === 0) {
            this.$setStorageSync('userInfo', res.data)
            this.userInfo = res.data
          }
        })
      },
      getScoreCounters () {
        const userInfo = getUserInfo()
        return DailyFootprintsService.getList({
          userId: userInfo.id,
          pageNum: 1,
          pageSize: 1,
          type: 'SIGN_IN'
        }).then((res) => {
          const scoreCounters = (res.code === 0 && res.data[0]) ? res.data[0] : {}
          return scoreCounters
        })
      },
      getScoreRules () {
        ScoreRulesService.getList().then(res => {
          if (res.code === 0) {
            const rule = JSON.parse(res.data.filter(data => data.type === 4)[0] ? res.data.filter(data => data.type === 4)[0].rule : '{}')
            rule.total = Object.values(rule).reduce((total, num) => parseInt(total, 10) + parseInt(num, 10))
            rule.total -= this.userInfo.contactNumber ? parseInt(rule.mobile) : 0
            rule.total -= this.userInfo.location ? parseInt(rule.area) : 0
            rule.total -= this.userInfo.birthday ? parseInt(rule.birthday) : 0
            rule.total -= this.userInfo.gender ? parseInt(rule.gender) : 0
            const shareRule = JSON.parse(res.data.filter(data => data.type === 3)[0] ? res.data.filter(data => data.type === 3)[0].rule : '{}')
            const advertiseRule = JSON.parse(res.data.filter(data => data.type === 6)[0] ? res.data.filter(data => data.type === 6)[0].rule : '{}')
            this.advertiseRule = advertiseRule
            this.rule = rule
            this.shareRule = shareRule
            const number = this.scoreCounters.number > 5 ? this.scoreCounters.number - 5 : 0 // 需要展示的第一天
            this.number = number
            const goldBeanRules = JSON.parse(res.data.filter((rule) => rule.type === 2)[0].rule)
            --goldBeanRules.maxStep
            this.goldBean = [...Array(7)].map((v, i) => parseInt(goldBeanRules.base) + ((i + number) > parseInt(goldBeanRules.maxStep) ? parseInt(goldBeanRules.maxStep) : (i + number)) * parseInt(goldBeanRules.stepAdd))
          }
        })
      },
      signInCB: async function (data) {
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
        this.scoreCounters = await this.getScoreCounters()
        this.getScoreRules()
        this.getDailyFootprintsShare()
        this.getDailyFootprintsAD()
        getMeScores.start(this)
      },
      shareWx () {
        getApp().aldstat.sendEvent('赚金豆-分享微信群')
        mta.Event.stat('share', {
          'method': '赚金豆分享'
        })
      },
      bindPhone () {
        mta.Event.stat('bind_phone', {
          'from': '赚金豆页面'
        })
      },
      changeDisplay () {
        this.display = !this.display
      },
      toXcx (id, title) {
        if (id === 'wx2c9a9ada28d13fe8') { // 2048
          getApp().aldstat.sendEvent('赚金豆-即将打卡2048方块拼除【允许】')
        } else if (id === 'wx2c6bf13295abb15f') { // 生活福利惠
          getApp().aldstat.sendEvent('赚金豆-即将打开福利惠【允许】')
        }
        Footprints.add(id, title).then((res) => {
          if (res.code === 0) {
            this.getMeScores()
            this.getDailyFootprintsAD()
            this.isMiniProgram = true
          }
        })
      },
      toXcxFail (id, title) {
        if (id === 'wx2c9a9ada28d13fe8') { // 2048
          getApp().aldstat.sendEvent('赚金豆-即将打卡2048方块拼除【取消】')
        } else if (id === 'wx2c6bf13295abb15f') { // 生活福利惠
          getApp().aldstat.sendEvent('赚金豆-即将打开福利惠【取消】')
        }
      },
      toXcxClick (id, title) {
        if (id === 'wx2c9a9ada28d13fe8') { // 2048
          getApp().aldstat.sendEvent('赚金豆-2048方块拼除领取')
        } else if (id === 'wx2c6bf13295abb15f') { // 生活福利惠
          getApp().aldstat.sendEvent('赚金豆-福利惠领取')
        }
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
          if (res.code === 0 && res.data.length > 0) {
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
      },
      getDailyFootprintsAD () {
        DailyFootprintsService.getList({
          userId: this.userInfo.id,
          pageNum: 1,
          pageSize: 1,
          type: 'VIEW_AD'
        }).then((res) => {
          if (res.code === 0 && res.data.length > 0) {
            const scoreCounters = res.data[0]
            const lastSignInTime = scoreCounters.lastOperationTime
            if (lastSignInTime) {
              const newDate = new Date()
              const date = parseInt(newDate.getFullYear() + '' + check(newDate.getMonth() + 1) + check(newDate.getDate()), 10)
              if (date <= parseInt(lastSignInTime)) {
                this.adAppIds = scoreCounters.metadata
              }
            }
          }
        })
      }
    },
    onLoad () {
      mta.Page.init()
      this.$setStorageSync('signIn', false)
    },
    onShow () {
      const userInfo = getUserInfo()
      if (userInfo.wx) {
        this.userInfo = userInfo
        this.signInCB({})
      } else {
        this.isModel = true
        this.$navigateTo('/pages/login/index')
      }
      if (this.isMiniProgram) {
        this.$showToast('领取成功', 'success', '/static/img/goldBean.png')
        this.isMiniProgram = false
      }
      let from = ''
      if (!this.$getStorageSync('getBeanMethod')) {
        from = 'tab赚金豆'
      } else {
        from = this.$getStorageSync('getBeanMethod')
      }
      mta.Event.stat('get_bean', {
        'from': from
      })
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
  @import './index.less';
</style>
