<template>
  <div class="participantsList">
  <top title='参与者用户' />
    <span class="c">---</span>
    <div class="border">
      <div>
        共有{{participantTotal}}名参与者
      </div>
    </div>
    <div class="list">
      <participantsList :list="participantsList" />
    </div>
  </div>
</template>

<script>
  import ParticipantsService from '@/services/participantsService'
  import participantsList from '@/components/participantsList'
  import top from '@/components/top'
  import share from '@/common/js/share.js'
  export default {
    data () {
      return {
        id: '',
        isGet: false,
        onPullDownRefresh: false,
        pageNum: 1,
        complete: false,
        participantsList: [],
        participantTotal: 0
      }
    },
    onPullDownRefresh () {
      this.pullDownRefresh()
    },
    onReachBottom () {
      this.getParticipantsList(this.pageNum)
    },
    components: {
      participantsList,
      top
    },
    methods: {
      pullDownRefresh () {
        this.pageNum = 1
        this.onPullDownRefresh = true
        this.complete = false
        this.getParticipantsList()
      },
      getParticipantsList (pageNum = 1, pageSize = 51) {
        if (this.complete || this.isGet) return false
        this.isGet = true
        ParticipantsService.getList({
          activityId: this.id,
          pageNum,
          pageSize
        }).then((res) => {
          this.$stopPullDownRefresh()
          this.isGet = false
          if (res.code === 0) {
            if (this.participantsList.length >= res.total) this.complete = true
            console.log('this.onPullDownRefresh', this.onPullDownRefresh)
            const oldparticipantsList = this.onPullDownRefresh ? [] : this.participantsList
            console.log('oldparticipantsList', oldparticipantsList)
            // 获取到activitie数据，对数据处理。
            this.participantTotal = res.total
            this.onPullDownRefresh = false
            this.participantsList = [ ...oldparticipantsList, ...res.data ]
            this.pageNum++
          }
        })
      }
    },
    onLoad (data) {
      // 调用应用实例的方法获取全局数据
      this.id = data.id
      this.pullDownRefresh()
      this.participantsList = []
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
  @import '../../common/less/util.less';
  .participantsList {
    >span{
      display: block;
      height: 0;
      overflow: hidden;
    }
    min-height: 100vh;
    background:#fff;
    .border {
      height: 11*@2;
      border-bottom: 1*@1 dotted RGBA(151, 151, 151, 0.22);
      margin: 25*@2 0;
      >div {
        margin: auto;
        text-align: center;
        color: RGBA(243, 185, 19, 1);
        font-size: 16*@2;
        line-height: 22*@2;
        height: 22*@2;
        width: 150*@2;
        background: #fff;
      }
    }
    .list {
      text-align: center;
      >text {
        color: RGBA(153, 153, 153, 1);
        line-height: 20*@2;
        margin: 16*@2 auto 24*@2;
        display: inline-block;
      }
    }
    >a {
      background: #fff;
      font-size: 14*@2;
      line-height: 18*@2;
      text-align: center;
      display: block;
      width: 100%;
      color: #999999;
      >img{
        width: 12*@2;
        height: 12*@2;
      }
    }
  }
</style>
