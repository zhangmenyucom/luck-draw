<template>
  <div>
    <top title="常见问题" />
    <div class="list">
      <div class="list-one">
        <div class="title">
          金豆是什么
        </div>
        <div class="content">
          抽奖活动根据奖品价值设置金豆数量，消耗金豆用来参与抽奖活动
        </div>
      </div>
      <div class="list-one">
        <div class="title">
          如何赚金豆
        </div>
        <div class="content">
          每天签到、分享好友、看广告等可以获取金豆
        </div>
      </div>
      <div class="list-one">
        <div class="title">
          抽奖规则
        </div>
        <div class="content">
          <!-- <ol>
            <li>用户每日可参加多个抽奖活动</li>
            <li>用户每日可参加多个日可参加多个日可参加多个日可参加多个日可参加多个抽奖活动</li>
            <li>用户每日可参加多个日可参加多个日可参加多个日可参加多个日可参加多个日可参加多个抽奖活动</li>
          </ol> -->
          1、用户每日可参加多个抽奖活动<br>
          2、每日会有两个商品的开奖机会<br>
          3、参与抽奖过程中按提示点击分享可以在分享成功后获得相应的金豆奖励用作抽奖使用<br>
          4、每日开奖时间以活动页面显示为准，中奖用户需根据推送信息提示填写个人信息<br>
          5、在账户剩余金豆可用情况下，未中奖用户可以继续参与其他抽奖商品
        </div>
      </div>
      <div class="list-one">
        <div class="title">
          发奖规则
        </div>
        <div class="content">
          1、中奖用户填写个人信息后，工作人员会在2个工作日内给与联系<br>
          2、中奖用户所获得商品会在7日内邮寄发放完毕<br>
          3、如中奖用户7天内未按提示填写个人信息导致平台无法与用户取得联系，视为用户主动放弃奖品，将不再发放<br>
          4、若参与过程中被系统判断为用户异常操作，平台有权取消其资格并有权撤销相关奖励及奖品发放<br>
          5、若出现不可抗力或形式变更情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办获调整，活动遭受严重网络攻击系统故障等因素）则平台可依相关法律法规规定主张免责<br>
          6、所有抽奖活动及奖品均真实有效，活动最终解释权归钱包生活所有，如有问题请添加公众号“生活福利惠”进行相关咨询。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 
import top from '@/components/top'
 export default {
   data () {
     return {
     }
   },
   components: {
     top
   },
   methods: {
   }
 }
</script>

<style scoped>
  @import '../../common/less/util.less';
  .list {
    width:100%;
    height:88vh;
    padding:15px;
    overflow:auto;
    .list-one{
      margin-top:20px;
    }
    .title {
      color:#434343;
      font-size:18px;
      margin-top:8px;
      margin-bottom:8px;
    }
    .content {
      color: #999999;
      font-size: 12px;
      text-align:justify;
      // > ol {
      //   list-style-type: decimal;
      //   padding-left:20px;
      //   > li {
      //     display: list-item;
      //   }
      // }
    }
  }
</style>
