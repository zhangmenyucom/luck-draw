<template>
  <div class="list">
    <top :title='type === "lucky" ? "中奖记录" : "抽奖记录"' />
    <meActivitieList :list="participantList" :Zindex="1"/>
  </div>
</template>

<script>
  import meActivitieList from '@/components/meActivitieList'
  import ParticipantsService from '@/services/participantsService'
  import { getUserInfo, formatDate } from '@/utils'
  import share from '@/common/js/share.js'
  import top from '@/components/top'

  export default {
    data () {
      return {
        activitieList: [],
        pageNum: 1,
        participantList: [],
        onPullDownRefresh: false,
        complete: false,
        type: 'lucky'
      }
    },
    onPullDownRefresh () {
      this.pullDownRefresh()
    },
    components: {
      meActivitieList,
      top
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
          pageSize,
          append: 'ACTIVITY',
          activityType: 'PLATFORM_LUCKY_DRAW,PERSONAL_LUCKY_DRAW'
        }
        if (type === `lucky`) getData.lucky = true
        this.isGet = true
        ParticipantsService.getList(getData).then((res) => {
          if (res.code === 0) {
            const oldParticipantList = !this.onPullDownRefresh ? this.participantList : []
            const participantList = res.data.map((participant) => {
              participant.activity.time = formatDate(new Date(participant.createdTime), 'yy/mm/dd HH:mm:ss')
              participant.activity.prize = participant.activity.items[0]
              participant.activity.tickets = participant.tickets
              if (type === `lucky`) {
                participant.activity.status = participant.metadata.address ? 'ADDRES' : 'LUCKY'
              }
              if (participant.activity.status === 'REWARDED') {
                if (participant.metadata.lucky === 'true') {
                  participant.activity.status = participant.metadata.address ? 'ADDRES' : 'LUCKY'
                } else {
                  participant.activity.status = 'UNLUCK'
                }
              }
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
      this.participantList = []
      this.type = data.type
      this.pullDownRefresh()
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
  @import '../../common/less/util.less';
  .list{
    min-height: 100vh;
    background: #fff;
  }
</style>
