<template>
  <div class="list">
    <meActivitieList :list="participantList" />
  </div>
</template>

<script>
  import meActivitieList from '@/components/meActivitieList'
  import ParticipantsService from '@/services/participantsService'
  import { getUserInfo } from '@/utils'
  export default {
    data () {
      return {
        activitieList: [1],
        pageNum: 1,
        participantList: []
      }
    },
    onPullDownRefresh () {

    },
    components: {
      meActivitieList
    },
    methods: {
      getParticipants (pageNum, pageSize = 20) {
        pageNum = pageNum || this.pageNum
        const userInfo = getUserInfo()
        ParticipantsService.get({userId: userInfo.id, pageNum, pageSize}).then((res) => {
          if (res.code === 0) {
            const participantList = res.data.map((participant) => {
              participant.activity.time = participant.createdTime
              return participant.activity
            })
            this.pageNum++
            this.participantList = [...this.participantList, ...participantList]
          }
        })
      }
    },
    onLoad () {
      // 调用应用实例的方法获取全局数据
      this.getParticipants()
    }
  }
</script>

<style scoped>
  @import '../../common/util.less';
  .list{
    min-height: 100vh;
    background: #fff;
  }
</style>
