<template>
  <div class="drawList">
    <div class="border">
      <div class="border-c">
      </div>
      <div class="borderTitle">
        中奖名单
      </div>
      <div class="border-c">
      </div>
    </div>
    <div class="list">
      <drawList :list="list" />
    </div>
    <a :href="'/pages/prizewinning/index?id='+ activitie.id"  v-if="list.length > 3">
      查看更多<img src="/static/img/right.png" alt="">
    </a>
  </div>
</template>
<script>
  import drawList from '@/components/drawList'
  export default {
    props: ['list', 'activitie'],
    components: {
      drawList
    }
  }
</script>
<style scoped>
  @import '../../common/less/util.less';
  .drawList {
   .border {
    display: flex;
    margin: 25*@2 0;
    .border-c{
      height: 11*@2;
      border-bottom: 1*@1 dotted RGBA(151, 151, 151, 0.22);
      flex:1;
    }
    .borderTitle {
      margin: auto;
      text-align: center;
      color: RGBA(153, 153, 153, 1);
      font-size: 16*@2;
      line-height: 22*@2;
      height: 22*@2;
      width: 100*@2;
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
   >img {
     width: 12*@2;
     height: 12*@2;
   }
 }
}
</style>