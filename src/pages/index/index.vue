<template>
  <div class='index'>
    <top :hideIcone='true' title="公共抽奖" />
    <div class="head-line">
      <div>
        <span class='left'>
          我的金豆：{{score+''}}
        </span>
        <a class='right' open-type="switchTab" href="/pages/obtainGoldBean/index" >
          赚金豆&nbsp;&nbsp;>
        </a>
        <div class="c"></div>
      </div>
    </div>
    <!-- 活动列表 -->
    <div class="activitieList">
      <activitieList :onDraw="onLuckyDraw" :willDraw="willLuckDraw" />
    </div>
    <!-- 活动列表结束 -->

    <!-- 签到 -->
    <signIn :isLogin = 'isLogin' />
    <!-- 签到结束 -->
  </div>
</template>

<script>
  // import load from '@/components/loading'
  import activitieList from '@/components/activitieList'
  import signIn from '@/components/signIn'
  import top from '@/components/top'
  import ActivitiesService from '@/services/activitiesService'
  import {
    getUserInfo
  } from '@/utils'
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
        complete: false,
        isGet: false,
        onPullDownRefresh: false,
        pageNum: 1,
        isLogin: false,
        score: 0,
        scoreCounters: {},
        onLuckyDraw: [{
          dayTime: '',
          timeTime: '',
          media: [{url: ''}],
          metadata: {drawRule: ''}
        }],
        willLuckDraw: []
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
      getBean () {
        this.$setStorageSync('getBeanMethod', '首页-赚金豆')
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
        const date = new Date().getTime()
        this.isGet = true
        ActivitiesService.getList({
          type: 'PLATFORM_LUCKY_DRAW',
          status: 'CREATED',
          append: 'BET_NUM',
          // startTimeLt: date, // 过滤未到时间活动
          pageNum,
          pageSize
        }).then((res) => {
          this.$stopPullDownRefresh()
          this.isGet = false
          if (res.code === 0) {
            // 如果是下拉刷新数据清空
            const oldOnLuckyDraw = !this.onPullDownRefresh ? this.onLuckyDraw : []
            const oldWillLuckDraw = !this.onPullDownRefresh ? this.willLuckDraw : []

            // 获取到activitie数据，对数据处理。
            const onLuckyDraw = []
            const willLuckDraw = []
            res.data.forEach((activitie) => {
              activitie.url = `/pages/activitiesDetails/index?id=${activitie.id}&method='首页'&name=${activitie.name}`
              if (date > activitie.startTime) {
                onLuckyDraw.push(activitie)

                onLuckyDraw.forEach((item) => {
                  if (item.metadata.drawRule === 'timed') {
                    let getMonth = new Date(item.endTime).getMonth()
                    let getDay = new Date(item.endTime).getDate()
                    let getHours = new Date(item.endTime).getHours().toString()
                    let getMinutes = new Date(item.endTime).getMinutes().toString()
                    if (getHours.length < 2) {
                      getHours = '0' + getHours
                    }
                    if (getMinutes.length < 2) {
                      getMinutes = '0' + getMinutes
                    }
                    item.dayTime = getMonth + '月' + getDay + '日'
                    item.timeTime = getHours + ':' + getMinutes
                  }
                })
              } else {
                willLuckDraw.push(activitie)
              }
            })

            // 赋值 修改页面
            this.willLuckDraw = [...oldWillLuckDraw, ...willLuckDraw]
            this.onLuckyDraw = [...oldOnLuckyDraw, ...res.data]
            this.pageNum++
            this.onPullDownRefresh = false
            if ((this.willLuckDraw.length + this.onLuckyDraw.length) >= res.total) this.complete = true
          }
        })
      },
      signInCB (data) {
        this.pullDownRefresh()
        if (data.score) {
          // 签到后 直接获取积分数
          this.score = data.score
        } else {
          this.getMeScores()
        }
        this.scoreCounters = data.scoreCounters || this.$getStorageSync('scoreCounters') // 获取连续签到天数
        getMeScores.start(this)
      }
    },
    onLoad () {
      mta.Page.init()
    },
    onHide () {
      getMeScores.end()
    },
    onShow () {
      const userInfo = getUserInfo()
      if (userInfo.id) {
        setTimeout((data) => {
          this.isLogin = true
        }, 500)
        this.signInCB({})
      } else {
        this.isLogin = false
        this.$navigateTo('/pages/login/index')
      }
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
 @import './index.less';
</style>
