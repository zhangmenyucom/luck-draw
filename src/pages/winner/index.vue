<template>
    <div>
        <top title='中奖者'/>
        <div class="head">
            <img src="/static/img/share.jpg"/>
            <div class="right">
                <p class="title">[奖品]抽便携式打印机</p>
                <p class="person">中奖人数: <span style="color: #FE4C52">20</span>人</p>
                <p class="person">已领奖人数:<span style="color: #FE4C52">5</span>人</p>
            </div>
        </div>
        <div class="boxImage">
            <img src="/static/img/luckname.png" class="imgTitle">
            <span>中奖名单</span>
        </div>
        <div class="list">
            <div class="list-content">
                <div class="list-content-one">
                    <p><img src="/static/img/bean.png" alt="">
                        <span class="name">你的名字</span>
                        <span style="margin-left:80px">奖品：&nbsp;IphoneX<span style="margin-left:20px">X1</span></span>
                    </p>
                    <p class="name-call" style="font-size:12px">收货信息</p>
                    <p class="name-call">李同学&nbsp;&nbsp;&nbsp;1509188888</p>
                    <p class="address">上海市闵行区田林路162号13号楼二楼</p>
                </div>
                <div class="list-content-one">
                    <p><img src="/static/img/bean.png" alt="">
                        <span class="name">你的名字</span>
                        <span style="margin-left:80px">奖品：&nbsp;IphoneX<span style="margin-left:20px">X1</span></span>
                    </p>
                    <p class="name-call" style="font-size:12px">收货信息</p>
                    <p class="name-call">李同学&nbsp;&nbsp;&nbsp;1509188888</p>
                    <p class="address">上海市闵行区田林路162号13号楼二楼</p>
                </div>
                <div class="list-content-one">
                    <p><img src="/static/img/bean.png" alt="">
                        <span class="name">你的名字</span>
                        <span style="margin-left:80px">奖品：&nbsp;IphoneX<span style="margin-left:20px">X1</span></span>
                    </p>
                    <p class="name-call" style="font-size:12px">收货信息</p>
                    <p class="name-call">李同学&nbsp;&nbsp;&nbsp;1509188888</p>
                    <p class="address">上海市闵行区田林路162号13号楼二楼</p>
                </div>
            </div>
            <div class="foot">
                <button class="btn" @tap="copy">复制全部</button>
                <button class="btn btn2">发送邮箱</button>
            </div>
        </div>
    </div>
</template>
<script>
import top from '@/components/top'
export default {
    data () {

    },
    components: {
        top
    },
    methods: {
        copy () {
            this.$setClipboardData({
                data: '1234',
                success: function (res) {
                    wx.getClipboardData({
                    success: function (res) {
                        console.log(res.data) // data
                    }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.head {
    width:375px;
    height:107px;
    background:rgba(255,255,255,1);
    >img {
        width:150px;
        height:75px;
        margin:16px 10px 16px 15px;
    }
    .right {
        float:right;
        margin-top:18px;
        margin-left:12px;
    }
    .title {
        color:#434343;
        font-size:15px;
        margin-right: 34px;
    }
    .person {
        color: #666666;
        font-size:14px;
    }
}
.boxImage {
    background:rgba(255,255,255,1);
    position: relative;
    height: 70px;
    width: 100%;
    >span {
        color:#FFFFFF;
        font-size:18px;
        position: absolute;
        left:149px;
        top:30px;
        z-index: 1;
    }
}
.imgTitle {
    width:234px;
    height:39px;
    position: absolute;
    top: 27px;
    left: 66px;
}
.list {
    width:375px;
    height:540.5px;
    background:rgba(255,255,255,1);
    .list-content {
        width:345px;
        height:421px;
        background:rgba(255,251,245,1);
        margin-left:15px;
    }
    .list-content-one {
        padding-top:19px;
        height:150px;
        border-bottom: 1px dashed rgba(223,194,147,1)
    }
    img {
        width:24px;
        height:24px;
        display: inline-block;
        float: left;
        padding:5px;
    }
    .name{
        color: #C58F35;
        font-size:14px;
        margin-left:4px;
        float: left;
        font-weight:Regular;
        font-family: PingFangSC;
        padding:5px;
    }
    span {
        color: #C58F35;
        font-size:14px;
        font-family: PingFangSC;
    }
    .name-call {
        color:#DFC293;
        font-size:12px;
        margin-left:40px;
        margin-top:6px;
    }
    .address {
        color:#DFC293;
        font-size: 14px;
        margin-left:40px;
        margin-top:6px;
    }
    .foot {
        position: fixed;
        bottom:0px;
        width:100%;
        height: 56px;
        padding:8px 15px;
        background:rgba(255,255,255,1);
        align-items:center;
    }
    .btn::after {
        border:0;
    }
    .btn {
        width:168px !important;
        height:40px !important;
        line-height: 40px;
        border-radius:8px;
        border:1px solid rgba(254,76,82,1) ;
        display: inline-block;
        font-size:14px;
    }
    .btn2 {
        background:rgba(254,76,82,1);
        color:#FFFFFF;
        margin-left:9px;
    }
}
</style>

