<template>
  <div>
    <div class='state'>
      正在抽奖<i class="icon iconfont icon-Fillx"></i>
    </div>
    <form :data-index='i' report-submit v-for="(item, i) in onDraw" :key='i' @submit='formSubmit'>
      <button form-type='submit' >
        <a v-if='onDraw.length > 0' class="list" :key="i">
          <img mode='aspectFill' :src='item.items[0].metadata.image'>
          <div v-if="item.metadata.hasSponsor == 'true'" class='sponsor'>{{item.sponsor.appName}}&nbsp;赞助</div>
          <div class="name antialiased">
            [ 奖品 ]&nbsp;&nbsp;{{item.items[0].name}}
          </div>
          <div v-if="item.metadata.drawRule === 'fullTicket'">
            <span class="goldBean">
              满{{item.metadata.ticketsNum * item.metadata.price}}金豆开奖<span style="margin-left:8rpx;color: #666666;">|</span>
            </span>
            <!-- <span class="joined" v-if="item.metadata.participated=='true'">
              <img style="width:23rpx;height:23rpx;margin-right:3px;" src="/static/img/Combined Shape.png" />
              已参与
            </span> -->
            <div class="fullGoldBean">
              {{item.metadata.price}}
              <img src='/static/img/goldBean.png'/>
            </div>
            <div v-if="item.metadata.participated=='true'" class="joinedClick">
              已参与
            </div>
            <div class="freeClick" v-else>
              免费抽奖
            </div>
          </div>
          <div v-if="item.metadata.drawRule === 'timed'" style="margin-top: 5rpx;">
            <span class="goldBean">
              {{item.endTimeDay}}{{item.endTimeHours}}开奖<span style="margin-left:8rpx;color: #666666;">|</span>
            </span>
            <!-- <span class="joined" v-if="item.metadata.participated=='true'">
              <img style="width:23rpx;height:23rpx;margin-right:3px;" src="/static/img/Combined Shape.png" />
              已参与   
            </span> -->
            <div class="fullGoldBean">
              {{item.metadata.price}}
              <img src='/static/img/goldBean.png'/>
            </div>
            <div v-if="item.metadata.participated=='true'" class="joinedClick">
              已参与
            </div>
            <div class="freeClick" v-else>
              免费抽奖
            </div>
          </div>
          <div v-if="item.metadata.drawRule === 'fullParticipant'" style="margin-top: 5rpx;">
            <span class="goldBean">
              满{{item.metadata.participantsNum}}人开奖<span style="margin-left:8rpx;color: #666666;">|</span>
            </span>
            <!-- <span class="joined" v-if="item.metadata.participated=='true'">
              <img style="width:23rpx;height:23rpx;margin-right:3px;" src="/static/img/Combined Shape.png" />
              已参与
            </span> -->
            <div class="fullGoldBean">
              {{item.metadata.price}}
              <img src='/static/img/goldBean.png'/>
            </div>
            <div v-if="item.metadata.participated=='true'" class="joinedClick">
              已参与
            </div>
            <div class="freeClick" v-else>
              免费抽奖
            </div>
          </div>
        </a>
      </button>
    </form>
    <div class="v" v-if='onDraw.length === 0'>
      <img mode='widthFix' src="/static/img/v.png" />
      <br />
      <text>
        活动正在紧张筹备中！
      </text>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activitieList',
    props: ['onDraw', 'willDraw'],
    methods: {
      formSubmit (e) {
        const url = this.onDraw[e.target.dataset.index].url
        const name = this.onDraw[e.target.dataset.index].items[0].name
        this.$navigateTo(url)
        getApp().aldstat.sendEvent('抽奖-点击免费抽奖')
        getApp().aldstat.sendEvent('抽奖-点击免费抽奖-' + name)
      }
    }
  }
</script>

<style scoped >
  @import '../common/less/util.less';

  .prompt {
    padding: 0 16*@2;
    height: 40*@2;
    background: rgba(0, 0, 0, 0.8);
    font-size: 14*@2;
    line-height: 40*@2;
    position: relative;
    margin-top: -40*@2;
    z-index: 2;
    color: #fff;

    span {
      color: #FFDD3E
    }
  }

  .v {
    margin-top: 103*@2;
    text-align: center;

    >img {
      width: 189*@2;
    }

    >text {
      font-size: 12*@2;
      line-height: 17*@2;
      position: relative;
      top: 26*@2;
      color: RGBA(204, 204, 204, 1);
    }
  }

  .list {
    padding: 32*@1 15*@2 37*@2;
    background: #FFFFFF;
    margin-bottom: 18*@1;
    position: relative;
  }

  .state {
    font-size: 40rpx;
    line-height: 48rpx;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    background-color: rgba(255, 255, 255, 1);
    color: rgba(67, 67, 67, 1);
    padding-top: 46*@2;
    padding-left: 10*@2;
    display: flex;
    color: rgba(67, 67, 67, 1);

    i {
      color: #FE4C52;
      margin-left: 16*@1;
      font-size: 28rpx;
    }

  }

  .fullGoldBean {
    font-size: 14*@2;
    font-family: PingFangSC-Semibold;
    float: left;
    font-weight: 600;
    padding-left: 6*@2;
    margin-top: -1*@2;
    color: rgba(243, 185, 19, 1);

    >img {
      width: 15px;
      height: 14px;
      position: relative;
      top: 2px;
      margin: 0 3*@2;
      left: -1*@2;
    }
  }

  .freeClick {
    font-size: 14*@2;
    font-family: PingFangSC-Semibold;
    float: right;
    font-weight: 400;
    color:rgba(255,255,255,1);
    background: #FE4C52;
    width:72*@2;
    height:30*@2;
    line-height:30*@2;
    margin-top: -8*@2;
    border-radius: 2*@2;
  }

  .joinedClick {
    font-size: 14*@2;
    font-family: PingFangSC-Semibold;
    float: right;
    font-weight: 400;
    color:#FE4C52;
    // background: #FE4C52;
    width:72*@2;
    height:30*@2;
    line-height:30*@2;
    margin-top: -8*@2;
    border-radius: 2*@2;
    border:1*@2 solid #FE4C52;
  }

  img {
    width: 345*@2;
    height: 170*@2;
  }

  .name {
    font-size: 16*@2;
    line-height: 20*@2;
    margin-top: 12*@2;
    margin-bottom: 14*@2;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(67, 67, 67, 1);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
  }

  .goldBean {
    color: #666666;
    font-family: PingFangSC-Regular;
    font-size: 14*@2;
    float: left;
    line-height: 17*@2;
    display: flex;
    span {
      font-size: 14*@2;
      line-height: 17*@2;
      color: #434343;
      flex: 1;
      color: #ff5459;
      text-align: left;
      position: relative;
      /*left: -2*@2;*/
    }
  }

  .joined {
    font-size: 14*@2;
    line-height: 14*@2;
    font-family: PingFangSC-Semibold;
    /* font-weight: 600; */
    color: rgba(253, 183, 0, 1);
    float: left;
    margin-top: 1*@2;
    margin-left: 8*@2;
  }

  form button {
    width: 100%;
    height: auto;
    padding: 0;
    font-size: 0;
    line-height: 0;
    background: transparent !important;
  }
  .sponsor{
    position: absolute;
    z-index: 199998;
    right: 32*@2;
    top: 32*@2;
    line-height: 28*@2;
    height: 28*@2;
    background: rgba(0, 0, 0, 1);
    color:rgba(255,255,255,1);
    font-weight: 400;
    font-size: 13*@2;
    opacity: 0.7;
    padding:0 8*@2;
  }
</style>
