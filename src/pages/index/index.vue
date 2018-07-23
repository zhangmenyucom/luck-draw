<template>
  <div class='index'>
    <top title="首页" />
    <div class="head">
      <img src="/static/img/bitmap.png" alt="">
      <div>
        <span class='left'>
          我的金豆：126
        </span>
        <span class='right'>
          赚金豆>
        </span>
        <div class="c"></div>
        <div class="calendar">
          <img src="/static/img/calendar.png" />
          <div>
            第<span>1</span>天
          </div>
        </div>
        <div class="record">
          <div v-for='i in 7'>
            <div>
              {{goldBean[i]}}
            </div>
            <img src="/static/img/goldBean.png" alt="" />
            <br />
            <text>
              第{{i+1}}天
            </text>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动列表 -->
    <div class="activitieList">
      <activitieList :list="activitieList" />
    </div>
    <!-- 活动列表结束 -->
    <signIn :signInCB = "signInCB"/>
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
// export {default} from './a'
import activitieList from '@/components/activitieList'
import signIn from '@/components/signIn'
import top from '@/components/top'
import ActivitiesService from '@/services/activitiesService'
import AuthService from '@/services/authService'
import {getUserInfo} from '@/utils'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      activitieList: [],
      week: ['一', '二', '三', '四', '五', '六', '七'],
      goldBean: [10, 15, 20, 25, 30, 35, 40],
      complete: false,
      isGet: false,
      onPullDownRefresh: false,
      pageNum: 1
    }
  },
  onPullDownRefresh () {
    this.pullDownRefresh()
  },
  components: {
    activitieList,
    signIn,
    top
  },
  onReachBottom () {
    this.getActivitieList(this.pageNum)
  },
  methods: {
    pullDownRefresh () {
      this.pageNum = 1
      this.onPullDownRefresh = true
      this.complete = false
      this.getActivitieList()
    },
    bindgetuserinfo (e) {
      AuthService.wxLogin(e.mp.detail).then((res) => {
        if (res.code === 0) {
          this.getActivitieList()
          this.isModel = false
        }
      })
    },
    getActivitieList (pageNum = 1, pageSize = 20) {
      if (this.complete || this.isGet) return false

      this.isGet = true
      ActivitiesService.getList({
        type: 'PLATFORM_LUCKY_DRAW',
        status: 'CREATED',
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
          this.activitieList = [...res.data, ...oldActivitieList]
          this.pageNum++
          if (this.activitieList.length >= res.total) this.complete = true
        }
      })
    },
    signInCB () {
      this.getActivitieList()
    }
  },
  onLoad () {
    const userInfo = getUserInfo()
    if (userInfo.id) {
      this.getActivitieList()
    }
  }
}
</script>

<style scoped>
 @import './index.less';
</style>
