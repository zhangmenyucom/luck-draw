<template>
    <div>
        <div class="vip-card">
            <img :src="giftImgSrc" style="width:750rpx;height:375rpx;" />
            <div @tap="getImage(index)" class="changeGiftPic">更换奖品图片</div>
        </div>
        <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell weui-cell_access border-middle">
                <!-- <div v-if="index>0" class="deleteListIcon" @click="deleteGiftList(index)">
                    <div class="childIcon"></div>
                </div> -->
                <div class="weui-cell__bd"><span>奖品名称</span><span style="color: red;">*</span></div>
                <input type="text" :data-index="index" data-name="itemName" class="weui-cell__ft" :value="itemName[index]" style="color:black;" @input="inputText" placeholder="请输入" />
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd"><span>奖品数量</span><span style="color: red">*</span></div>
                <input type="number" placeholder="请输入" :data-index="index" data-name="itemNum" :value="itemNum[index]" class="weui-cell__ft" @input="inputText" style="color:black;vertical-align: middle;" />
                <span class="weui-cell__ft" style="color:black;margin-left:5px;vertical-align: middle;">份</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['addGiftPic', 'showCanvas', 'giftImgSrc',
    'index', 'deleteGiftList', 'inputText', 'itemName',
    'itemNum', 'getImage']
}
</script>

<style>

</style>
