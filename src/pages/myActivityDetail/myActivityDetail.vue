<template>
    <div class="page">
        <top :hideIcone='true' title="详情" />
        <div class="vip-card">
            <img src="" style="width:600rpx;height:300rpx;" />
        </div>
        <div class="prizeTitle">
            <p class="prizeName">[ 奖品 ]</p>
            <p class="openTime">开奖</p>
        </div>
        <div class="weui-cells weui-cells_after-title" style="margin-top: 10px;">
            <div class="weui-cell weui-cell_access" style="padding:5px 0">
                <div class="weui-cell__bd">赞助商</div>
                <switch class="weui-cell__ft" checked @change="switchChange" style="transform:scale(0.6);position:relative;left:15px" />
                <div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></div>
            </div>
        </div>
        <div class="descriptionText">
            <span class="prizeDescription">1111</span>
        </div>
        <div class="prizrPic">
            <img src="" style="width:600rpx;height:300rpx;" />
        </div>
        <div class="bottomBtn">
            <div class="editPrize">编辑</div>
            <div class="sharePrize">分享抽奖</div>
        </div>
    </div>
</template>

<script>
    import top from '@/components/top'
    export default {
        data () {
            return {
                isJoiner: true,
                isShare: false
            }
        },
        components: {
            top
        },
        methods: {
            sharePrize () {
                this.isShare = true
            }
        }
    }
</script>

<style>
 @import './myActivityDetail.less';
</style>
