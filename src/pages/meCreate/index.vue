<template>
  <div class="list">
    <top :title='type === "lucky" ? "中奖记录" : "抽奖记录"' />
    <meActivitieList :list="participantList" />
  </div>
</template>

<script>
import meActivitieList from '@/components/meActivitieList'
// import ParticipantsService from '@/services/participantsService'
import PersonalActivity from '@/services/createPersonalActivity'
// import { getUserInfo, formatDate } from '@/utils'
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
        this.participantList = res.data
        console.log(this.participantList)
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
