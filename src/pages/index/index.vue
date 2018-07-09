<template>
  <div class='index'>
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
        activitieList: []
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
  .activitieList{
    margin-top:510rpx;
  }
</style>
