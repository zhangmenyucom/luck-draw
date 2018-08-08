<template>
  <div>
    <a class="list"  v-for='(item, index) in list ' :href="'/pages/activitiesDetails/index?id=' + item.id">
      <!-- <img mode='center' :src='item.media[0].url' alt=""> -->
      <div class="info">
        <span class='title'>
          {{item.name}}
        </span>
        <div class="info">
          <span>
            <span>「奖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品」</span>{{item.prize.name}}
          </span>
          <br />
          <span>
            <span>「参与时间」</span>{{item.time}}
          </span>
        </div>
      </div>
      <div class="state">
       {{status[item.status]}}
       <div> </div>
       <div>已下{{item.tickets.length}}注</div>
     </div>
   </a>

 </div>
</template>

<script>
  export default {
    props: ['list', 'rangeKey', 'size'],
    data () {
      return {
        status: {
          'CREATED': '进行中',
          'CANCELED': '取消',
          'PUBLISHED': '进行中',
          'CLOSED': '关闭',
          'FINISHED': '结束',
          'REWARDED': '已开奖',
          'REWARD_FAILED': '开奖失败',
          'GROUP_BUY_SUCCESS': '拼团成功',
          'GROUP_BUY_FAIL': '拼团失败',
          'GROUP_COUPON_FAIL': '拼团砍价失败'
        }
      }
    }
  }
</script>

<style scoped>
  @import '../common/less/util.less';

  .list{
    display: flex;
    padding : 15*@2;
    border-bottom: 1*@1 solid RGBA(234, 234, 234, 0.5);
    /*height: 140*@2;*/
    box-sizing: border-box;
    > img {
      width:80*@2;
      height: 80*@2;
      min-width: 80*@2;
      margin-right: 16*@2;
      background: #eee;
    }
    >div.info{
      flex:1;
      position: relative;
      .title{
        font-size: 14*@2;
        line-height: 18*@2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .info{
        /*position: absolute;*/
        /*bottom:0;*/
        margin-top: 10*@2;
        font-size: 12*@2;
        line-height: 16*@2;
        color: RGBA(153, 153, 153, 1);
        width: 100%;
        > span{
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          height: 16*@2;
          overflow: hidden;
          /*>span{
            color: #FE4C52;
          }*/
        }
      }
    }
    .state{
      color: RGBA(153, 153, 153, 1);
      text-align: center;
      float: right;
      font-size: 14*@2!important;
      line-height: 18*@2;
      color: RGBA(254, 76, 82, 1)!important;
      > div{

        color: RGBA(153, 153, 153, 1);
        font-size: 10*@2;
      }
    }
  }
</style>
