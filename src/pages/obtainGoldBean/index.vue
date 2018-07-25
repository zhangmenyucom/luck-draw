<template>
  <div class="list">
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-fenxiang" :style="{color:'RGBA(107, 200, 50, 1)'}"></i>
      </div>
      <div class="left">
        <span class='title'>
          分享微信群
        </span>
        <br />
        图层+10～50 <img src="/static/img/goldBean.png" alt="">
      </div>
      <div class="right">
        <a>
          去领取
        </a>
      </div>
      <div class="c"></div>
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-bangdingshoujihao" :style="{color:'RGBA(255, 151, 58, 1)'}"></i>
      </div>
      <div class="left">
        <span class='title'>
          绑定手机号
        </span>
        <br />
        图层+100 <img src="/static/img/goldBean.png" alt="">
      </div>
      <div class="right">
        <a>
          去绑定
        </a>
      </div>
      <div class="c"></div>
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-wanshanziliao"></i>
      </div>
      <div class="left">
        <span class='title'>
          完善资料
        </span>
        <br />
        图层+100 <img src="/static/img/goldBean.png" alt="">
      </div>
      <div class="right">
        <a>
          去完善
        </a>
      </div>
      <div class="c"></div>
    </div>
  </div>
</template>

<script>
  import config from 'config'
  export default {
    data () {
      return {

      }
    },
    onPullDownRefresh () {

    },
    components: {

    },
    methods: {

    },
    onLoad () {
      // 调用应用实例的方法获取全局数据

    },
    onShareAppMessage () {
      return config.share
    }
  }
</script>

<style scoped>
  @import '../../common/util.less';
  .list{
    min-height: 100vh;
    background: #fff;
    padding: 15*@2;
    >div{
      margin-bottom: 8*@2;
      background: #fff;
      padding: 17*@2;
      box-shadow: 0*@2 2*@2 16*@2 0*@2 RGBA(25, 25, 25, 0.05);
      >div{
        color: RGBA(243, 185, 19, 1);
        font-size:12*@2;
        >img{
          width: 9*@2;
          height: 9*@2;
        }
        >i{
          font-size: 35*@2;
        }
        >span{
          color: RGBA(67, 67, 67, 1);
          font-size: 14*@2;
        }
      }
      >.icon{
        margin-right: 14*@2
      }
      a, button{
        width: 80*@2;
        height: 32*@2;
        text-align: center;
        background: RGBA(254, 76, 82, 1);
        color: #fff;
        font-size: 14*@2;
        line-height: 32*@2;
        border-radius: 2*@2
      }
    }
  }
</style>
