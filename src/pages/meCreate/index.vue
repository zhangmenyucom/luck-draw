<template>
  <div class="list">
    <top title='我发起的' />
    <meActivitieList :list="participantList" :Zindex="2"/>
  </div>
</template>

<script>
import meActivitieList from '@/components/meActivitieList'
// import ParticipantsService from '@/services/participantsService'
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
  methods: {
    pullDownRefresh () {
      this.pageNum = 1
      this.onPullDownRefresh = true
      this.complete = false
      this.getActivity()
    },
    getActivity (type = 'PERSONAL_LUCKY_DRAW') {
      PersonalActivity.getAcitivity(type).then((res) => {
        if (res.code === 0) {
          const participantList = res.data.map((participant) => {
            participant.name = participant.items[0].name
            participant.url = participant.items[0].metadata.url
            participant.owner = participant.owner
            participant.time = formatDate(new Date(participant.createdTime), 'yy/mm/dd HH:mm:ss')
            participant.rule = participant.num === 0 ? participant.metadata.endTimeString + '开奖' : '满' + participant.num + '开奖'
            return participant
          })
          console.log(participantList)
          this.participantList = participantList
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
