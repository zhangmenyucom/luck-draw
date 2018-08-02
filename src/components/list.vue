<template>
  <div>
    <a class="list" v-for='(item, index) in list '>
      <div class="info">
        <text>
          {{type[item.type]}}
        </text>
        <br />
        <span>
          {{item.createdTime}}
        </span>
      </div>
      <span>
        {{item.score < 0?item.score:'+'+item.score}}
      </span>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    data () {
      return {
        type: ['支付成功', '用户授权登录', '签到', '分享成功', '完善信息', '参与抽奖']
      }
    }
  }
</script>

<style scoped>
  @import '../common/less/util.less';

  .list{
    display: flex;
    padding : 15*@2 15*@2 15*@2 0;
    border-bottom: 1*@1 solid RGBA(234, 234, 234, 0.5);
    box-sizing: border-box;
    >div{
      flex:1;
      text{
        font-size: 14*@2;
        line-height: 18*@2;
        color: RGBA(67, 67, 67, 1);
      }
      >span{
        font-size: 12*@2;
        line-height: 16*@2;
        color:RGBA(153, 153, 153, 1);
      }
    }
    >span {
      color:RGBA(243, 185, 19, 1);
      font-size: 22*@2;
      line-height: 28*@2;
      margin-top:10*@2;
    }
  }
</style>
