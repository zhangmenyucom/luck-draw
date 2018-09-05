<template>
  <div>
    <top title="常见问题" />
    <div class="list">
      <div class="list-one">
        <div class="title">
          金豆是什么?
        </div>
        <div class="content">
          用户可通过各种任务获取一定数量的金豆，金豆可参加抽奖活动，抽奖活动根据奖品的价值会消耗一定数量的金豆，同时金豆数量越多，可下注越多。
        </div>
      </div>
      <div class="list-one">
        <div class="title">
          什么是满注开奖？
        </div>
        <div class="content">
          用户通过金豆进行投注，满一定注数系统自动开奖，若奖品有多个，一个用户可能中多个。
        </div>
      </div>
      <div class="list-one">
        <div class="title">
          金豆没了怎么办？
        </div>
        <div class="content">
          任务中心完成分享、每日签到、完成资料等任务可获取一定量的金豆。
        </div>
      </div>
      <div class="list-one">
        <div class="title">
          我经常参加抽奖，为什么从未中奖？
        </div>
        <div class="content">
          钱包抽奖助手作为钱包生活旗下福利平台，所有中奖码均由系统随机抽取，我们不会指定中奖、黑箱操作。
        </div>
      </div>
      <div class="list-one">
        <div class="title">
          中奖了怎么领取？
        </div>
        <div class="content">
          获奖后通过服务通知进入小程序查看中奖结果，若中奖需要填写领取信息，我们会有专人与你联系。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 
import top from '@/components/top'
 export default {
   data () {
     return {
     }
   },
   components: {
     top
   },
   methods: {
   }
 }
</script>

<style scoped>
  @import '../../common/less/util.less';
  .list {
    width:100%;
    height:100%;
    padding:15px;
    .list-one{
      margin-top:20px;
    }
    .title {
      color:#434343;
      font-size:18px;
      margin-top:8px;
      margin-bottom:8px;
    }
    .content {
      color: #999999;
      font-size: 12px;
      text-align:justify;
    }
  }
</style>
