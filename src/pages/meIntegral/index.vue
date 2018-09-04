<template>
  <div>
    <top title="我的金豆" />
    <meIntegral :score='score' :getBean='getBean'/>
    <div class="list">
      <lists :list="scoreChanges" />
    </div>
  </div>
</template>
<script>
  import lists from '@/components/list'
  import meIntegral from '@/components/meIntegral'
  import MeScoresService from '@/services/meScoresService'
  import PersonalActivity from '@/services/createPersonalActivity'
  import { formatTime } from '@/utils'
  import getMeScores from '@/common/js/getMeScores.js'
  import share from '@/common/js/share.js'
  import top from '@/components/top'
  export default {
    data () {
      return {
        complete: false,
        isGet: false,
        onPullDownRefresh: false,
        pageNum: 1,
        scoreChanges: [],
        score: 0
      }
    },
    components: {
      lists,
      meIntegral,
      top
    },
    onPullDownRefresh () {
      this.pullDownRefresh()
    },
    onReachBottom () {
      this.getScoreChanges(this.pageNum)
    },
    methods: {
      pullDownRefresh () {
        this.pageNum = 1
        this.onPullDownRefresh = true
        this.complete = false
        this.getScoreChanges()
        this.getActivity()
      },
      getScoreChanges (pageNum = 1, pageSize = 20) {
        if (this.complete || this.isGet) return false
        this.isGet = true
        MeScoresService.getScoreChanges({
          pageNum,
          pageSize,
          scoreNe: 0
        }).then((res) => {
          this.$stopPullDownRefresh()
          this.isGet = false
          if (res.code === 0) {
            res.data.forEach((data) => {
              data.createdTime = formatTime(new Date(data.createdTime))
            })
            const oldScoreChanges = !this.onPullDownRefresh ? this.scoreChanges : []
            this.scoreChanges = [...oldScoreChanges, ...res.data]
            this.pageNum++
            if (this.scoreChanges.length >= res.total) this.complete = true
            if (this.onPullDownRefresh) {
              this.onPullDownRefresh = false
            }
          }
        })
      },
      getActivity (type = 'PERSONAL_LUCKY_DRAW') {
        PersonalActivity.getAcitivity(type).then((res) => {
          console.log(res)
        })
      }
    },
    onUnload () {
      getMeScores.end()
    },
    onLoad () {
      this.pullDownRefresh()
      getMeScores.start(this)
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
  @import '../../common/less/util.less';

  .list{
    min-height: 100vh;
    background: #fff;
    padding-left: 15*@2;

  }
</style>
