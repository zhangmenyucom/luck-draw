<template>
  <div class="openingPrizeAfter">
    <!-- 未中奖 -->
    <div v-if="state === 5 && participants.id">
      <span></span>
      <div class="">
        很遗憾，您未中奖<br />
        去看看其他活动
      </div>
      <div class="divButton">
        <a open-type="switchTab" class="button" href='/pages/index/index'>去看看</a>
      </div>
      <span></span>
    </div>
    <!-- 未中奖结束 -->

    <!-- 未参与 活动结束 -->
    <div v-if="state >= 5 && !participants.id">
      <span></span>
      <div class="">
        本次活动已结束，去看看其他活动
      </div>
      <div class="divButton">
        <a open-type="switchTab" href='/pages/index/index' class="button">去看看</a>
      </div>
      <span></span>
    </div>
    <!-- 未参与 活动结束 结束-->

    <!-- 中奖 -->
    <div v-if="state === 6 || state === 7">
      <span></span>
      <div class="">
        恭喜，大奖是你的了
      </div>
      <div class="divButton">
        <a :href="'/pages/takePrize/index?id='+participants.id" class="butotn-o" >{{state === 6 ? '去领奖' : '信息已填写'}}</a>
        <a class="button">炫耀一下</a>
      </div>
      <span></span>
    </div>
  </div>
</template>
<script>
  import drawList from '@/components/drawList'
  export default {
    props: ['state', 'participants'],
    components: {
      drawList
    }
  }
</script>
<style scoped>
  @import '../../common/less/util.less';
  .openingPrizeAfter {
    background: RGBA(250, 175, 108, 0.1);
    color: RGBA(67, 67, 67, 1);
    font-size: 20*@2;
    line-height: 24*@2;
    padding: 24*@2;
    text-align: center;
   .divButton {
     margin-top: 16*@2;
     display: flex;
     /*padding: */
     >button,
     >a {
       margin: auto;
       width: 120*@2;
       background: RGBA(253, 183, 0, 1);
       border: none;
       border-radius: 2*@2;
       font-size: 16*@2;
       line-height: 40*@2!important;
       color: #fff;
       height: 40*@2!important;
       display: block;
     }
     >button::after {
       border: none;
       border-radius: 2*@2;
     }
     .butotn-o {
       background: transparent;
       border: 1*@1 solid RGBA(253, 183, 0, 1);
       color: RGBA(253, 183, 0, 1);
     }
   }
 }
</style>