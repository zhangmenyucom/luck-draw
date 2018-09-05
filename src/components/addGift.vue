<template>
    <div>
        <div class="vip-card">
            <img @click="addGiftPic(index, giftImgSrc)" :src="giftImgSrc" style="width:660rpx;height:330rpx;" />
        </div>
        <div class="weui-cells weui-cells_after-title" style="margin-top: 10px;">
            <div class="weui-cell weui-cell_access border-middle">
                <img src="../../static/img/delete.png" class="deleteListIcon" @click="deleteGiftList(index)" />
                <div class="weui-cell__bd">奖品名称 <span style="color: red;">*</span></div>
                <input type="text" :data-index="index" class="weui-cell__ft" :value="itemName[index]" style="color:black;" @input="itemNameChange" placeholder="请输入" />
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">奖品数量 <span style="color: red">*</span></div>
                <input type="number" placeholder="请输入" :data-index="index" :value="itemNum[index]" class="weui-cell__ft" @input="itemNumChange" style="color:black;display: inline;vertical-align: middle;" />
                <span class="weui-cell__ft" style="color:black;margin-left:5px;vertical-align: middle;">份</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['addGiftPic', 'showCanvas', 'giftImgSrc',
    'index', 'deleteGiftList', 'itemNameChange',
    'itemNumChange', 'itemName', 'itemNum']
}
</script>

<style>

</style>
