<template>
    <div class="sharePage">
        <div class="shareModal">
            <img class="backgroundImg" src="/static/img/Combined Shape2.png" />
            <div>
                <div class="leftSolid"></div>
                <span class="attentionTitle">提示</span>
                <div class="rightSolid"></div>
            </div>
            <div class="lightImg"><img style="width:184rpx; height:207rpx" src="/static/img/lightModal.png"></div>
            <div class="textDiv1">
                1.开启后，参与者可以分享抽奖给TA的好友，帮助抽奖快速传播
            </div>
            <div class="textDiv2">
                2.如发起人分享了抽奖分享图，分享图的传播不受抽奖助手功能限制
            </div>
        </div>
        <div @tap="knowShare" class="known">我知道了</div>
    </div>
</template>

<script>
    export default {
      props: ['knowShare']
    }
</script>

<style>
    @import '../common/less/util.less';
    .sharePage {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5978);
        z-index: 999999999999999999999999999;
    }
    .shareModal {
        position: relative;
        margin: 250*@1 auto;
        margin-bottom:0;
        width:530*@1;
        height:657*@1;
        border-radius:8*@1;
        text-align: center;
    }
    .backgroundImg {
        width:530*@1;
        height:657*@1;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .leftSolid {
        display: inline-block;
        width:40*@1;
        height:2*@1;
        background:rgba(67,67,67,1);
        margin-right: 16*@1;
        vertical-align: middle;
    }
    .attentionTitle {
        font-size:36*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(67,67,67,1);
        vertical-align: middle;
    }
    .rightSolid {
        display: inline-block;
        width:40*@1;
        height:2*@1;
        background:rgba(67,67,67,1);
        margin-left: 16*@1;
        vertical-align: middle;
    }
    .lightImg {
        margin-top: 26*@1;
    }
    .textDiv1 {
        margin: 0 auto;
        margin-top: 40*@1;
        width:410*@1;
        height:84*@1;
        word-wrap:break-word;
        font-size:28*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        text-align: center;
    }
    .textDiv2 {
        margin: 0 auto;
        margin-top: 40*@1;
        width:410*@1;
        height:126*@1;
        word-wrap:break-word;
        font-size:28*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        text-align: center;
    }
    .known {
        width:208*@1;
        height:80*@1;
        border:1*@1 solid rgba(255,255,255,1);
        margin: 0 auto;
        margin-top: 80*@1;
        border-radius:4*@1;
        font-size:32*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 80*@1;
    }
</style>
