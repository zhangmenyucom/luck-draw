<template>
    <div class="page">
        <top :hideIcone='true' title="新建抽奖" />
        <addGiftComp />
        <div v-for="(item,index) in giftList" :key="index">
            <addGiftComp />
        </div>
        <div class="addGift_div">
            <div class="add_gift" @click="addGift">
                <div>+添加奖项</div>
            </div>
        </div>
    </div>
</template>

<script>
    import top from '@/components/top'
    import addGiftComp from '@/components/addGift'

    export default {
        data () {
            return {
                giftList: []
            }
        },
        components: {
            top,
            addGiftComp
        },
        methods: {
            addGift () {
                let gl = this.giftList
                gl.push(this.giftList.length)
                this.giftList = gl
            }
        }
    }
</script>

<style>
@import './createActivities.less';
</style>
