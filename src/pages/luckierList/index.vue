<template>
    <div>
        <top title='中奖者'/>
        <div class="head">
            <div class="IconDiv">
                <img class="activityPic" :src="activity.media[0].url"/>
                <div class="joinNum">参与人数<span style="color:#FDB700;">{{activity.realNum}}</span>人</div>
            </div>
            <div class="activityInfo">
                <div class="title">[ 奖品 ]&nbsp;{{activity.name}}</div>
                <div class="person">中奖人数: <span style="color: #FE4C52">{{luckyItems.length}}</span>人</div>
                <div class="person">已领奖人数:<span style="color: #FE4C52">{{getAddressNum}}</span>人</div>
            </div>
        </div>
        <div class="boxImage">
            <img src="/static/img/luckier.png" class="imgTitle">
            <span>中奖名单</span>
            <div class="list">
                <div class="list-content">
                    <div v-for="(item, index) in luckyItems" :key="index">
                        <div class="list-content-one">
                            <div>
                                <div class="avatar"><img :src="item.luckyGuy.avatar" alt=""></div>
                                <div class="name">{{item.luckyGuy.nickName}}</div>
                                <div class="prizeInfo">奖品：&nbsp;{{luckyItems[0].reward.name}}&nbsp;&nbsp;&nbsp;&nbsp;X{{luckyItems[0].reward.metadata.num}}</div>
                            </div>
                            <p class="name-call" style="font-size:12px">收货信息</p>
                            <div v-if="item.metadata.address">
                                <p class="name-call">{{item.metadata.address.name}}&nbsp;&nbsp;&nbsp;{{activity.metadata.address.phone}}</p>
                                <p class="address">{{item.metadata.address.addition}}</p>
                            </div>
                            <div v-else class="noAddress">
                                未填写
                            </div>
                        </div>
                        <div v-if="index>0" class="solidDiv"></div>
                    </div>
                </div>
                <div class="foot">
                    <button class="btn" @tap="copyAll">复制全部</button>
                    <button class="btn btn2">发送邮箱</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import top from '@/components/top'
import ActivitiesService from '@/services/activitiesService'
import share from '@/common/js/share.js'
export default {
  data () {
    return {
        luckyItems: [{
            luckyGuy: {},
            metadata: {},
            reward: {metadata: {num: 0}}
        }],
        activity: {realNum: 0, media: [ 'url' ]},
        getAddressNum: 0,
        copyData: ''
    }
  },
  components: {
    top
  },
  methods: {
    copyAll () {
      this.$setClipboardData({
        data: this.copyData
      })
    },
    getActivitie (id) { // 获取活动详情
        ActivitiesService.get({
            id,
            append: 'PARTICIPANT'
        }).then((res) => {
            if (res.code === 0) {
                this.activity = res.data
                console.log('activity', res.data)
                // 处理中奖信息
                if (res.data.metadata.luckyItems) {
                    const luckyItems = JSON.parse(res.data.metadata.luckyItems)
                    console.log('luckyItems', luckyItems)
                    this.luckyItems = luckyItems
                    // let dataArray = []
                    luckyItems.forEach(element => {
                        // let tel = ''
                        // let address = ''
                        // if (element.metadata.address) {
                        //     this.getAddressNum += 1
                        //     tel = element.metadata.address.phone
                        //     address = element.metadata.address.addition
                        // } else {
                        //     tel = '未填写'
                        //     address = '未填写'
                        // }
                        // dataArray.push({'姓名': element.luckyGuy.nickName,
                        //                 '奖品': element.reward.name + 'X' + element.reward.metadata.num,
                        //                 '联系电话': tel,
                        //                 '收货地址': address
                        // })
                        let tel = ''
                        let address = ''
                        if (element.metadata.address) {
                            this.getAddressNum += 1
                            tel = element.metadata.address.phone
                            address = element.metadata.address.addition
                        } else {
                            tel = '未填写'
                            address = '未填写'
                        }
                        this.copyData += '姓名:' + element.luckyGuy.nickName +
                                        '奖品:' + element.reward.name + 'X' + element.reward.metadata.num +
                                        '联系电话:' + tel +
                                        '收货地址:' + address + '    '
                    })
                }
            }
        })
    }
  },
  onLoad (a) {
      this.getActivitie('5b8cf5ca711eae26806c47ac')
    },
    onShareAppMessage: share()
}
</script>

<style scoped>
@import './index.less';
</style>

