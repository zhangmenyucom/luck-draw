<template>
  <div class="info_container">
    <top :hideIcone='true' title='我的' />
    <load :isshow="isShow" />
    <div v-if='!isShow'>
      <div class="infoHeader">
        <div class="infoImg">
          <img :src='userInfo.wx.avatar' />
          <div class="infoText">
            <text>{{userInfo.wx.nickName}}</text><br/>
            <img src="/static/img/goldBean.png" alt=""/>
            <text style="vertical-align:middle;font-size:16px">{{score + ''}}</text>
          </div>
        </div>
        <div class="info_r">
          <div class="editInfo">
            <a href="/pages/editInfo/index" class="antialiased" style="opacity:1;">
              <span v-if="rule.total">完善资料&nbsp;&nbsp;</span>
              <span v-else>查看资料&nbsp;&nbsp;</span>
              <span v-if="rule.total">+{{rule.total}}</span>&nbsp;
              <img v-if="rule.total" src="/static/img/goldBean.png">
            </a>
          </div>
        </div>
      </div >
      <div class="info_content">
        <div class="content_detail">
          <div class="infoDetail clearfix">
            <a href="/pages/meActivitiesList/index?type=all" style="flex:1">
              <div  class="detailNum">{{activitieTotal}}</div>
              <div  class="detailContent">我的抽奖</div>
              <div class="interval"></div>
            </a>
            <a href="/pages/meCreate/index" class="" style="flex:1">
              <div class="detailNum">{{meCreateNum}}</div>
              <div class="detailContent">我发起的</div>
              <div class="interval"></div>
            </a>
            <a href="/pages/meActivitiesList/index?type=lucky" style="flex:1">
              <div class="detailNum">{{LuckyActivitieTotal}}</div>
              <div class="detailContent">中奖记录</div>
            </a>
          </div>
          <div class="weui-cell" @click="doTask">
            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                <image src="/static/img/me.png" style="width: 143px; height: 67px; display: block"/>
            </div>
            <div class="weui-cell__bd">
                <div style="font-size: 14px">做任务&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#F3B913">赚金豆</span></div>
                <div><span style="color:#F3B913">100</span>金豆待领取</div>
            </div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </div>
          <!-- <div class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <div style="display: inline-block; vertical-align: middle">我的朋友</div>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </div> -->
          <div class="weui-cell weui-cell_access myweui-cell bor-b" @click="commonQuestion">
              <div class="weui-cell__bd">
                  <div style="display: inline-block; vertical-align: middle">常见问题</div>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </div>
          <button class="weui-cell weui-cell_access myBtn bor-b" open-type="contact">
              <div class="weui-cell__bd">
                  <div style="display: inline-block; vertical-align: middle">联系客服</div>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </button>
        </div>
</div>
<signIn :signInCB = "signInCB" :showModel = "!isModel"/>
</div>
</div>

</template>
<style scoped>
  @import './index.less';
</style>
<script>
  import load from '@/components/loading'
  import top from '@/components/top'
  import {getUserInfo, check} from '@/utils'
  import signIn from '@/components/signIn'
  import ParticipantsService from '@/services/participantsService'
  import MeScoresService from '@/services/meScoresService.js'
  import ScoreRulesService from '@/services/scoreRulesService'
  import PersonalActivity from '@/services/createPersonalActivity'
  import getMeScores from '@/common/js/getMeScores.js'
  import share from '@/common/js/share.js'
  import DailyFootprintsService from '@/services/dailyFootprintsService'
  const mta = require('@/common/js/mta_analysis.js')
  export default {
    data () {
      return ({
        userInfo: {
          wx: {}
        },
        activitieTotal: 0,
        LuckyActivitieTotal: 0,
        isModel: true,
        score: 0,
        rule: {},
        shareRule: {},
        shareNumber: 0,
        isShow: true,
        meCreateNum: 0
      })
    },
    components: {
      signIn,
      load,
      top
    },
    methods: {
      signInCB (data) {
        const userInfo = getUserInfo()
        const signIn = this.$getStorageSync('signIn')
        if (signIn) {
          this.isModel = false
        }
        this.userInfo = userInfo
        this.getParticipants(userInfo)
        this.getScoreRules()
        this.getActivity()
        if (data.score) {
          // 签到后 直接获取积分数
          this.score = data.score
        } else {
          this.getMeScores()
        }
        this.getDailyFootprintsShare()
        getMeScores.start(this)
      },
      shareWx () {
        if (!this.shareNumber < this.shareRule.maxStep) {
          mta.Event.stat('share', {'method': '我的-立即分享'})
        }
      },
      bindPhone () {
        mta.Event.stat('bind_phone', {'from': '我的页面'})
      },
      doTask () {
        this.$switchTab('../obtainGoldBean/index')
      },
      commonQuestion () {
        this.$navigateTo('../commonQuestion/index')
      },
      getActivity (type = 'PERSONAL_LUCKY_DRAW') {
        PersonalActivity.getList(type).then((res) => {
          if (res.code === 0) {
            this.meCreateNum = res.data.length
          }
        })
      },
      getParticipants (userInfo) {
        // 查询用户一共参与多少活动
        ParticipantsService.getList({
          userId: userInfo.id,
          activityType: 'PLATFORM_LUCKY_DRAW,PERSONAL_LUCKY_DRAW'
        }).then((res) => {
          if (res.code === 0 && res.data.length > 0) {
            this.activitieTotal = res.total
          }
        })
        // 查询中奖活动
        ParticipantsService.getList({
          userId: userInfo.id,
          activityType: 'PLATFORM_LUCKY_DRAW,PERSONAL_LUCKY_DRAW',
          lucky: true
        }).then((res) => {
          if (res.code === 0) {
            this.LuckyActivitieTotal = res.total
          }
        })
      },
      getMeScores () {
        MeScoresService.getList().then(res => {
          if (res.code === 0) {
            this.score = res.data.score
          }
        })
      },
      getScoreRules () { // 获取积分规则
        ScoreRulesService.getList().then(res => {
          if (res.code === 0) {
            const map = {
              area: 'location',
              mobile: 'contactNumber',
              birthday: 'birthday',
              gender: 'gender'
            }
            const rule = JSON.parse(res.data.filter(data => data.type === 4)[0] ? res.data.filter(data => data.type === 4)[0].rule : {})
            rule.total = Object.entries(rule).reduce((total, num) => {
              if (Array.isArray(total)) {
                total = (!this.userInfo[map[total[0]]] ? parseInt(total[1], 10) : 0)
              }
              return parseInt(total, 10) + (!this.userInfo[map[num[0]]] ? parseInt(num[1], 10) : 0)
            })
            const shareRule = JSON.parse(res.data.filter(data => data.type === 3)[0] ? res.data.filter(data => data.type === 3)[0].rule : {})
            this.shareRule = shareRule
            this.rule = rule
            this.isShow = false
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
      },
      shareCb () {
        this.shareNumber = this.shareNumber + 1
      }
    },
    onLoad () {
      mta.Page.init()
      this.$setStorageSync('signIn', false)
    },
    onHide () {
      getMeScores.end()
    },
    onShow () {
      const userInfo = getUserInfo()
      if (userInfo.id) {
        this.signInCB({})
      } else {
        this.isModel = true
      }
    },
    onShareAppMessage: share(this.shareCb)
  }
</script>

