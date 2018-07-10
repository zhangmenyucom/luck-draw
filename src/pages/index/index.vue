<template>
  <div class='index'>
    <div class="head">
      <img src="/static/img/bitmap.png" alt="">
      <div>
        <span class='left'>
          我的金豆126
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
              第{{week[i]}}天
            </text>
          </div>

        </div>
      </div>
    </div>
    <div class="activitieList">
      <activitieList :list="activitieList" />
    </div>
  </div>
</template>

<script>
  import activitieList from '@/components/activitieList'
  import ActivitiesService from '@/services/activitiesService'
  import AuthService from '@/services/authService'
  export default {
    data () {
      return {
        motto: 'Hello World',
        userInfo: {},
        activitieList: [],
        week: ['一', '二', '三', '四', '五', '六', '七'],
        goldBean: [10, 15, 20, 25, 30, 35, 40]
      }
    },
    onPullDownRefresh () {
      console.log('onPullDownRefresh')
      this.$stopPullDownRefresh()
    },
    components: {
      activitieList
    },
    methods: {
      getActivitieList () {
        ActivitiesService.getList({type: 'LUCKY_DRAW'}).then((res) => {
          if (res.code === 0) {
            this.activitieList = [...res.data, ...this.activitieList]
          }
        })
      },
      getUserInfo () {
        AuthService.wxLogin().then((res) => {
          if (res.code === 0) {
            this.getActivitieList()
          }
        })
      }
    },

    onLoad () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
      console.log('index')
      // this.getActivitieList()
    }
  }
</script>

<style scoped>
 @import './index.less';
</style>
