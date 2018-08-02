<template>
  <div class="drawList">
    <span class="c">---</span>
    <div class="border">
      <div>
        中奖名单
      </div>
    </div>
    <div class="list">
      <drawList :list="luckyItems" />
    </div>
  </div>
</template>
<style scoped>
  @import '../../common/less/util.less';
  .drawList {
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
        width: 100*@2;
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
<script>
  import drawList from '@/components/drawList'
  import ActivitiesService from '@/services/activitiesService'
  import share from '@/common/js/share.js'
  export default {
    data () {
      return {
        luckyItems: []
      }
    },
    components: {
      drawList
    },
    methods: {
      getActivitie (id) { // 获取活动详情
        ActivitiesService.get({
          id
        }).then((res) => {
          if (res.code === 0) {
            // 处理中奖信息
            if (res.data.metadata.luckyItems) {
              const luckyItems = JSON.parse(res.data.metadata.luckyItems)
              this.luckyItems = luckyItems
            }
          }
        })
      }
    },
    onLoad (a) {
      this.getActivitie(a.id)
    },
    onShareAppMessage: share()
  }
</script>