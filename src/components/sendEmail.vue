<template>
    <div class="modal">
        <div class="showModal">
            <p class="emailTitle">填写收件邮箱</p>
            <p class="attention">中奖者信息将发送至以下邮箱</p>
            <input @input="emailInputChange" class="email" type="text" placeholder="xxx@xx.com">
            <div class="button">
                <div class="cancle" @tap="cancleButton">取消</div>
                <div class="confirm" @tap="confirmButton">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['cancleButton', 'confirmButton', 'emailId', 'emailInputChange']
    }
</script>

<style>
    @import '../common/less/util.less';
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5978);
        z-index: 999999999999999999999999999;
    }
    .showModal {
        position: relative;
        width: 540*@1;
        height: 346*@1;
        margin: 520*@1 auto;
        background: rgba(255,255,255,1);
        border-radius: 14*@1;
    }
    .emailTitle {
        margin-top: 42*@1;
        margin-left:174*@1;
        font-size:32*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .attention {
        margin-top: 18*@1;
        margin-left:88*@1;
        font-size:28*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(136,136,136,1);
    }
    .email {
        font-size:28*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        margin-top: 19*@1;
        margin-left:42*@1;
        width:456*@1;
        height:72*@1;
        line-height: 72*@1;
        border-radius:8*@1;
        border:1*@1 solid rgba(221,221,221,1);
    }
    .button {
        position: absolute;
        bottom: 0;
        width:540*@1;
        height:100*@1;
        border-top: 1*@1 solid rgba(220,222,227,1);
        background:rgba(255,255,255,1);
        border-radius:0*@1 0*@1 14*@1 14*@1;
    }
    .cancle {
        font-size:28*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(137,137,137,1);
        display: inline-block;
        border-right: 1*@1 solid rgba(220,222,227,1);
        height: 100*@1;
        width: 270*@1;
        text-align: center;
        line-height: 100*@1;
    }
    .confirm {
        font-size:28*@1;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(16,142,233,1);
        display: inline-block;
        height: 100*@1;
        width: 270*@1;
        text-align: center;
        line-height: 100*@1;
    }
</style>
