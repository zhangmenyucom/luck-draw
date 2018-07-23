<template>
    <div  class="info_container">
        <div class="infoHeader">
            <div class="infoImg">
                <image />
                <text>DOKE</text>
            </div>
            <div class="info_r">
              <div class="editInfo">
                <a :href="'/pages/editInfo/main'">
                  <span >完善资料</span>
                  <span >+100 <i calss="icon"></i></span>
                </a>
              </div>
            </div>
        </div >
        <div class="info_content">
            <div class="content_detail">
                <div class="infoDetail clearfix">
                    <div  class="" style="flex:1">
                        <div class="detailNum">1000</div>
                        <div class="detailContent">我的金豆</div>
                    </div>
                    <a href="/pages/meActivitiesList/index" style="flex:1">
                        <div  class="detailNum">5</div>
                        <div  class="detailContent">全部抽奖</div>
                    </a>
                    <div style="flex:1">
                        <div class="detailNum">5</div>
                        <div class="detailContent">中奖记录</div>
                    </div>
                </div>
            </div>
            <div class="makeJob">
               <h5>做任务 赚金豆</h5>
               <div class="jobDetail">
                 <ul>
                   <li>
                     <div class="job_l">
                       <div class="job_l_w">绑定手机号</div>
                       <div><span class="job_num">0&nbsp;</span><span>/10</span></div>
                     </div>
                     <div class="job_l">
                       <div class="job_l_w">分享</div>
                       <div ><span class="job_num">0&nbsp;</span>/10</div>
                     </div>
                   </li>
                   <li>
                     <div class="job_l">
                       <div class="job_l_w">可得 10<span class="job_icon"></span></div>
                     </div>
                     <div class="job_l">
                       <div class="job_l_w">一次可得:0 <span class="job_icon"></span></div>
                     </div>
                   </li>
                   <li class="btn">
                     <div class="getWard"><i></i> &nbsp;立即领取</div>
                     <div class="shareWard"><i></i> &nbsp;立即分享</div>
                   </li>
                 </ul>
               </div>
            </div>
            <div class="infoQue">
                <div>常见问题</div>
                <div class="arrow"></div>
            </div>
        </div>
        <signIn/>
    </div>

</template>
<style scoped>
  @import './index.less';
</style>
<script>
    import signIn from '@/components/signIn'
    export default {
      components: {
        signIn
      }
    }
</script>

