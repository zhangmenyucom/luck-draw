<template>
  <div>
    <a class="list" v-for="(item , i) in list" :href="item.url">
      <div class='state'>
        正在抽奖 <i class="icon iconfont icon-Fillx"></i>
      </div>
      <img :src='item.media[0].url'>
      <div class="name antialiased">
        {{item.name}}
      </div>
      <div class="goldBean">
        <img src='/static/img/goldBean.png'>
        <text class='bold'>
          10 金豆 1 注
        </text>
        <span>
          ¥8799
        </span>
      </div>
      <div class="button">
        <button>
          去抽奖
        </button>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['list']
  }
</script>

<style scoped >
  @import '../common/util.less';
  .list{
    padding: 30*@1 15*@2 0;
    background: #FFFFFF;
    margin-bottom: 10*@2;
  }
  .state{
    padding-top:18rpx;
    font-size: 40rpx;
    line-height: 48rpx;
    font-weight: bold;
    display: flex;
    i{
      color: #FE4C52;
      margin-left: 4*@1
    }

  }
  img {
    width: 345*@2;
    height: 170*@2;
    margin-top: 15*@2;
  }
  .name{
    color: #434343;
    font-size: 16*@2;
    line-height: 20*@2;
    margin-top: 10*@2;
    font-weight: bold;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .goldBean{
    display: flex;
    margin-top: 10*@2;
    img{
      width: 15*@2;
      height: 14*@2;
      margin-top: 2*@2;
    }
    text {
      color: #F3B913;
      font-size: 14*@2;
      line-height: 18*@2
    }
    span{
      text-decoration:line-through;
      font-size:14*@2;
      line-height: 17*@2;
      color: #434343;
      flex:1;
      text-align:right;

    }
  }
  .button{
    padding:24*@2;

    button{
      border-radius: 2*@2;
      background: #FE4C52;
      width: 201*@2;
      height: 40*@2;
      color: #FFFFFF;
      font-size: 16*@2;

    }
  }
</style>
