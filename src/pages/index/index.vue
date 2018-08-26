<template>
  <div class='index'>
    <!-- <load :isshow="isloadShow" /> -->
    <top :hideIcone='true' title="公共抽奖" />
    <div class="head">
      <img src="/static/img/bitmap.png" alt="">
      <div>
        <span class='left'>
          我的金豆：{{score+''}}
        </span>
        <a class='right' open-type="switchTab" href="/pages/obtainGoldBean/index" >
          赚金豆&nbsp;>
        </a>
        <div class="c"></div>
        <div class="calendar">
          <img src="/static/img/calendar.png" />
          <div>
            第<span>{{scoreCounters.number}}</span>天
          </div>
        </div>
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
    <!-- 活动列表 -->
    <div class="activitieList">
      <activitieList :list="activitieList" />
    </div>
    <!-- 活动列表结束 -->
    <signIn :signInCB = "signInCB" :showModel="!isModel"/>
    <!-- 登录各种样式 勿删 防止变回来 -->
   <!--  <div class="model" v-if='isModel'>
      <div class="welfare">
        <img src="/static/img/welfare.png" alt="" />
        <div>
          <div>
            <div>
              新人专属
            </div>
            <span>
              新人专属
            </span>
          </div>
          <span>
            首次登录送XX金豆
          </span>
          <button open-type='getUserInfo' @getuserinfo="bindgetuserinfo">
            登录领取
          </button>
        </div>
      </div>
    </div> -->
   <!--  <div :class ="{model:true, showModel : isModel }">
      <div :class="{signIn:true, showModel : isModel}" >
        <img :class="{ transform: isModel }" src="/static/img/light.png" />
        <div class="sign">
          <img src="/static/img/signIn.png" />
          <div class="goldBean">
            <img src="/static/img/goldBean.png" />
          </div>
          <button class="signButton" open-type='getUserInfo' @getuserinfo="bindgetuserinfo">
            签到领金豆
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  // import load from '@/components/loading'
import activitieList from '@/components/activitieList'
import signIn from '@/components/signIn'
import top from '@/components/top'
import ActivitiesService from '@/services/activitiesService'
import { getUserInfo } from '@/utils'
import ScoreRulesService from '@/services/scoreRulesService'
import getMeScores from '@/common/js/getMeScores.js'
import share from '@/common/js/share.js'
import MeScoresService from '@/services/meScoresService.js'
const mta = require('@/common/js/mta_analysis.js')
  export default {
    data () {
      return {
        motto: 'Hello World',
        userInfo: {},
        activitieList: [],
        week: ['一', '二', '三', '四', '五', '六', '七'],
        goldBean: [0, 0, 0, 0, 0, 0, 0],
        complete: false,
        isGet: false,
        onPullDownRefresh: false,
        pageNum: 1,
        isModel: true,
        score: 0,
        scoreCounters: {},
        number: 0
      }
    },
    onPullDownRefresh () {
      this.pullDownRefresh()
    },
    onReachBottom () {
      this.getActivitieList(this.pageNum)
    },
    components: {
      activitieList,
      signIn,
      top
    },
    methods: {
      pullDownRefresh () {
        this.pageNum = 1
        this.onPullDownRefresh = true
        this.complete = false
        this.getActivitieList()
      },
      getScoreRules () { // 获取积分规则
        ScoreRulesService.getList().then(res => {
          if (res.code === 0) {
            // 处理每天对应的积分数
            const number = this.scoreCounters.number > 7 ? this.scoreCounters.number - 7 : 0 // 需要展示的第一天
            this.number = number
            const goldBeanRules = JSON.parse(res.data.filter((rule) => rule.type === 2)[0].rule)
            --goldBeanRules.maxStep
            this.goldBean = [...Array(7)].map((v, i) => parseInt(goldBeanRules.base) + ((i + number) > parseInt(goldBeanRules.maxStep) ? parseInt(goldBeanRules.maxStep) : (i + number)) * parseInt(goldBeanRules.stepAdd))
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

      getActivitieList (pageNum = 1, pageSize = 20) {
        if (this.complete || this.isGet) return false
        this.isGet = true
        ActivitiesService.getList({
          type: 'PLATFORM_LUCKY_DRAW',
          status: 'CREATED',
          append: 'BET_NUM',
          startTimeLt: new Date().getTime(),
          pageNum,
          pageSize
        }).then((res) => {
          this.$stopPullDownRefresh()
          this.isGet = false
          if (res.code === 0) {
            const date = new Date().getTime()
            const oldActivitieList = !this.onPullDownRefresh ? this.activitieList : []
            // 获取到activitie数据，对数据处理。
            res.data.forEach((activitie) => {
              activitie.url = date > activitie.startTime && `/pages/activitiesDetails/index?id=${activitie.id}`
              activitie.isOpen = date > activitie.startTime
            })
            if (this.onPullDownRefresh) {
              this.onPullDownRefresh = false
            }
            this.activitieList = [...oldActivitieList, ...res.data]
            this.pageNum++
            if (this.activitieList.length >= res.total) this.complete = true
          }
        })
      },
      signInCB (data) {
        const signIn = this.$getStorageSync('signIn')
        if (signIn) {
          this.isModel = false
        }
        this.pullDownRefresh()
        if (data.score) {
          // 签到后 直接获取积分数
          this.score = data.score
        } else {
          this.getMeScores()
        }
        this.scoreCounters = data.scoreCounters || this.$getStorageSync('scoreCounters') // 获取连续签到天数
        this.getScoreRules()
        getMeScores.start(this)
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
    onShareAppMessage: share()
  }
</script>

<style scoped>
 @import './index.less';
</style>
