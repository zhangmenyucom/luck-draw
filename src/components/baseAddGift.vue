<template>
    <div>
        <div class="vip-card">
            <img :src="giftImgSrc" style="width:750rpx;height:375rpx;" />
            <div @click="getImage(index, giftImgSrc)" class="changeGiftPic">更换奖品图片</div>
        </div>
        <div class="weui-cells weui-cells_after-title" style="margin-bottom: 10px;">
            <div class="weui-cell weui-cell_access border-middle">
                <div class="weui-cell__bd nameInput"><span>奖品名称</span><span style="color: red;">*</span></div>
                <input type="text" id="GiftName" :data-index="index" data-name="itemName" class="weui-cell__ft" :value="itemName[index]" style="color:black;" @input="inputText" placeholder="请输入" />
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd nameInput"><span>奖品数量</span><span style="color: red">*</span></div>
                <input type="number" placeholder="请输入" :data-index="index" data-name="itemNum" :value="itemNum[index]" class="weui-cell__ft" @input="inputText" style="color:black;vertical-align: middle;" />
                <span class="lastFlex" style="color:black;margin-left:5px;vertical-align: middle;">份</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['showCanvas', 'giftImgSrc',
    'index', 'deleteGiftList', 'inputText',
    'itemName', 'itemNum', 'getImage']
}
</script>

<style>

</style>
