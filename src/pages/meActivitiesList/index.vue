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
        participantList: [],
        onPullDownRefresh: false,
        complete: false
      }
    },
    onPullDownRefresh () {
      this.pullDownRefresh()
    },
    components: {
      meActivitieList
    },
    onReachBottom () {
      this.getParticipants(this.type, this.pageNum)
    },
    methods: {
      pullDownRefresh () {
        this.pageNum = 1
        this.onPullDownRefresh = true
        this.complete = false
        this.getParticipants(this.type)
      },
      getParticipants (type, pageNum = 1, pageSize = 20) {
        if (this.complete || this.isGet) return false
        const userInfo = getUserInfo()
        const getData = {
          userId: userInfo.id,
          pageNum,
          pageSize
        }
        if (type === `lucky`) getData.lucky = true
        this.isGet = true
        ParticipantsService.get(getData).then((res) => {
          if (res.code === 0) {
            const oldParticipantList = !this.onPullDownRefresh ? this.participantList : []
            const participantList = res.data.map((participant) => {
              participant.activity.time = new Date(participant.createdTime)
              return participant.activity
            })
            if (this.onPullDownRefresh) {
              this.onPullDownRefresh = false
              this.$stopPullDownRefresh()
            }

            this.pageNum++
            this.isGet = false
            this.participantList = [...oldParticipantList, ...participantList]
            if (this.participantList.length >= res.total) this.complete = true
          }
        })
      }
    },
    onLoad (data) {
      this.type = data.type
      this.pullDownRefresh()
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
