<template>
    <div class="attentionPage">
        <div class="attentionModal">
            <div>
                <div class="leftSolid"></div>
                <span class="attentionTitle">提示</span>
                <div class="rightSolid"></div>
            </div>
            <div class="lightImg"><img src="/static/img/lightModal.png"></div>
            <div class="textDiv">
                <p class="firstText">你选择了按人数开奖：</p>
                <p class="secondText"> 如若未达到指定人数，3天后将按</p>
                <p class="thirdText">实际参与人数开奖</p>
            </div>
            <div class="sureCreate">我知道了，确认发起</div>
        </div>
    </div>
</template>

<script>
    export default {
      props: ['createActivity']
    }
</script>

<style>
    @import '../common/less/util.less';
    .attentionPage {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5978);
        z-index: 999999999999999999999999999;
    }
    .attentionModal {
        margin: 250*@1 auto;
        width:530*@1;
        height:657*@1;
        background-image: "/static/img/backgroundModal.png";
        border-radius:8*@1;
        text-align: center;
    }
    .leftSolid {
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
        width:40*@1;
        height:2*@1;
        background:rgba(67,67,67,1);
        margin-left: 16*@1;
        vertical-align: middle;
    }
    .lightImg {
        margin-top: 26*@1;
    }
    .textDiv {
        margin-top: 40*@1;
        width:410*@1;
        height:126*@1;
        font-size:28*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        text-align: center;
    }
    .sureCreate {
        width:360*@1;
        height:80*@1;
        background:rgba(243,185,19,1);
        border-radius:4*@1;
        font-size:32*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 80*@1;
    }
</style>
