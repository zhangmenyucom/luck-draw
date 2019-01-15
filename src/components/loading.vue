<template>
  <div :class="{loading: true, isShow: !isshow }">
    <!-- <div class="gif"> -->
      <img src="/static/img/loading.gif" />
    <!-- </div> -->
    
    <!-- <div class="animation" v-if='!isanimation'>
      <img class="bean" src="https://img.zcool.cn/community/012b3c599276cc0000002129ebff53.gif" /> -->
      <!-- <img class="shadow" src="/static/img/shadow.png" />
      <div class="light">
        <img v-for='(item, i) in  6' :class="'imglight' + (item+1)" src="https://img.zcool.cn/community/012b3c599276cc0000002129ebff53.gif">
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: ['isshow', 'isanimation'],
    data () {
      return {
        isShow: true
      }
    },
    methods: {
    },
    onLoad () {
    }
  }
</script>

<style scoped>
  @import '../common/less/util.less';
  .loop( @count ) when( @count > 0 ){
    .imglight@{count}{
      width: 27*@2;
      height: 35*@2;
      transform: rotate(( 60deg * (@count+5) ));
    }
    .loop((@count - 1));
  }
  .isShow{
    pointer-events:none;
    transition: opacity 1s;
    opacity: 0;
  }
  .loading{
    position: fixed;
    // top:0;
    // bottom:0;
    left:0;
    right: 0;
    background:#fff;
    z-index: 100;
    line-height: 100vh;
    text-align: center;
    img{
      width: 50*@2;
      height: 50*@2;
    }
  }
  .animation{
    transform: translateY(-50*@2);
    position: absolute;
    width: 200*@2;
    height: 200*@2;
    text-align: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    img{
      width: 52*@2;
      height: 60*@2;
      position: absolute;
    }
    .bean{
      animation: bean 1s ease-in infinite;
      z-index: 3;
    }
    .shadow{
      top:112*@2;
      animation: shadow 1s ease-in infinite;
      z-index: 2;
      transform: translateX(-50%)
    }
    .light{
      width: 100%;
      height: 100%;
      position: relative;
      top: 45*@2;
      animation: light 1s ease-in infinite;
      .loop(6);
      .imglight1{
        left: 100*@2;
        top:0;
      }
      .imglight2{
        left: 200*@2;
        top:50.666*@2;
      }
      .imglight3{
        left: 200*@2;
        top:133.3333*@2;
      }
      .imglight4{
        left: 100*@2;
        top:200*@2;
      }
      .imglight5{
        left: 0*@2;
        top:133.3333*@2;
      }
      .imglight6{
        left: 0*@2;
        top:50.666*@2;
      }
    }
  }

  @keyframes light {
    0%   {transform: scale(0.1);opacity: 0}
    39%   {transform: scale(0.1); opacity: 0}
    40%   {transform: scale(0.1); opacity: 1}
    100%   {transform: scale(1); opacity: 0.6}
  }

  @keyframes bean {
    0%   {transform: translateY(0) translateX(-50%);}
    30%  {transform: translateY(100*@2) scaleY(1) translateX(-50%)}
    40% {transform: translateY(118*@2) scaleY(0.4) translateX(-50%)}
    50% {transform: translateY(100*@2) scaleY(1) translateX(-50%)}
    66.66666% {transform: translateY(74*@2) translateX(-50%) rotate(120deg) }
    83.33333% {transform: translateY(37*@2) translateX(-50%) rotate(240deg) }
    100% {transform: translateY(0*@2) scaleY(1) rotate(360deg) translateX(-50%);}
  }

  @keyframes shadow {
    0%   {transform: scale3d(0.3,0.3,0.3) translateX(-50%); opacity: 0.3}
    40%  {transform: scale3d(1,1,1) translateX(-50%); opacity: 1}
    100% {transform: scale3d(0.3,0.3,0.3) translateX(-50%); opacity: 0.3}
  }
</style>
