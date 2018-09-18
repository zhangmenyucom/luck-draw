<template>
  <div>
    <div class='state'>
      正在抽奖<i class="icon iconfont icon-Fillx"></i>
    </div>
    <a v-if='onDraw.length > 0' class="list" v-for="(item , i) in onDraw" :href="item.url" :key="i">
      <img mode='aspectFit' :src='item.items[0].metadata.image'>
      <div class="name antialiased">
        [ 奖品 ]&nbsp;&nbsp;{{item.items[0].name}}
      </div>

      <div v-if="item.metadata.drawRule === 'fullTicket'">
        <span class="joined" v-if="item.metadata.participated">
          <img style="width:23rpx;height:23rpx;margin-right:3px;" src="/static/img/Combined Shape.png" />
          已参与 <span style="margin-left:8px;">|</span>
        </span>
        <span class="goldBean">
          <!-- <img src='/static/img/goldBean.png'>
          <text class='bold'>
            &nbsp;&nbsp;{{item.metadata.price}} 金豆 1 注
          </text> -->
          满<span >{{item.metadata.ticketsNum * item.metadata.price}}</span>金豆开奖
          <!-- <span>
            ¥8799
          </span> -->
        </span>
        <div class="fullGoldBean">
          {{item.metadata.price}}
          <img src='/static/img/goldBean.png'/>参与
        </div>
      </div>
      <div v-if="item.metadata.drawRule === 'timed'" style="margin-top: 5rpx;">
          <span class="joined" v-if="item.metadata.participated">
            <img style="width:23rpx;height:23rpx;margin-right:3px;" src="/static/img/Combined Shape.png" />
            已参与 <span style="margin-left:8px;">|</span>
          </span>
          <span class="goldBean">
            {{item.endTimeDay}}<span style="color:red">{{item.endTimeHours}}</span>开奖
          </span>
      </div>
      <div v-if="item.metadata.drawRule === 'fullParticipant'" style="margin-top: 5rpx;">
            <span class="joined" v-if="item.metadata.participated">
              <img style="width:23rpx;height:23rpx;margin-right:3px;" src="/static/img/Combined Shape.png" />
              已参与 <span style="margin-left:8px;">|</span>
            </span>
            <span class="goldBean">
              满<span style="color:red">{{item.metadata.participantsNum}}</span>人开奖
            </span>
      </div>
    </a>
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
    props: ['onDraw', 'willDraw']
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
 .v{
  margin-top: 103*@2;
  text-align: center;
  >img{
    width: 189*@2;
  }
  >text{
    font-size: 12*@2;
    line-height: 17*@2;
    position: relative;
    top: 26*@2;
    color: RGBA(204, 204, 204, 1);
  }
}
.list{
  padding: 32*@1 15*@2 37*@2;
  background: #FFFFFF;
  margin-bottom: 18*@1;
}
.state{
  font-size: 40rpx;
  line-height: 48rpx;
  font-family: PingFangSC-Semibold;
  font-weight:600;
  background-color: rgba(255,255,255,1);
  color:rgba(67,67,67,1);
  padding-top: 46*@2;
  padding-left: 10*@2;
  display: flex;
  color: rgba(67,67,67,1);
  i{
    color: #FE4C52;
    margin-left: 16*@1;
    font-size: 28rpx;
  }

}
.fullGoldBean {
  font-size: 14*@2;
  font-family: PingFangSC-Semibold;
  float: right;
  font-weight:600;
  color:rgba(243,185,19,1);
  > img{
    width:15px;
    height:14px;
    position:relative;
    top:2px;
    margin: 0 3*@2;
    left:-1*@2;
  }
}
img {
  width: 345*@2;
  height: 170*@2;
}
.name{
  font-size: 16*@2;
  line-height: 20*@2;
  margin-top: 12*@2;
  margin-bottom:4*@2;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(67,67,67,1);
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
}
.goldBean{
  color:rgba(102,102,102,1);
  font-family: PingFangSC-Regular;
  font-size: 14*@2;
  float: left;
  /*font-weight:400;*/
   span{
    font-size:14*@2;
    line-height: 17*@2;
    color: #434343;
    flex:1;
    color: #ff5459;
    text-align:right;
    position: relative;
    left:-2*@2;
  }
}
.joined {
  font-size:28rpx;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(253,183,0,1);
  float: left;
  margin-right: 8px;
}
.button{
  padding:24*@2;
  >div{
    background: #CCCCCC;
    color: #fff;
    border-radius: 2*@2;
    height: 40*@2;
    width: 201*@2;
    line-height: 40*@2;
    margin: auto;
    text-align: center;
    font-size: 16*@2
  }
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
