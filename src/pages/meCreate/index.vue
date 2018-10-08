<template>
  <div class="list">
    <top title='我发起的' />
    <meActivitieList :list="participantList" :Zindex="2"/>
  </div>
</template>

<script>
import meActivitieList from '@/components/meActivitieList'
import PersonalActivity from '@/services/createPersonalActivity'
import { formatDate } from '@/utils'
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
      type: 'PERSONAL_LUCKY_DRAW',
      arr: [1, 2, 3, 4],
      pageCount: 25,
      initPage: 1
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
    this.getActivity(this.type, this.pageNum)
  },
  methods: {
    pullDownRefresh () {
      this.pageNum = 1
      this.onPullDownRefresh = true
      this.complete = false
      this.getActivity()
    },
    getActivity (type = 'PERSONAL_LUCKY_DRAW', pageNum = 1, pageSize = 20) {
      if (this.complete) return false
      PersonalActivity.getList({
        type,
        pageNum,
        pageSize
      }).then((res) => {
        if (res.code === 0) {
          const oldParticipantList = !this.onPullDownRefresh ? this.participantList : []
          const participantList = res.data.map((participant) => {
            participant.name = participant.items[0].name
            participant.url = participant.items[0].metadata.url
            participant.owner = participant.owner
            participant.time = formatDate(new Date(participant.createdTime), 'yy/mm/dd HH:mm:ss')
            participant.rule = participant.metadata.drawRule === 'timed' ? formatDate(new Date(participant.endTime), 'yy/mm/dd HH:mm:ss') + '开奖' : '满' + participant.items[0].metadata.num + '人开奖'
            return participant
          })
          if (this.onPullDownRefresh) {
            this.onPullDownRefresh = false
            this.$stopPullDownRefresh()
          }
          this.pageNum++
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
  .page-wrap {
    width: 100%;
    text-align: center;
    display: flex;
    >ul {
    }
    >li {
      flex:1
    }
  }
</style>
