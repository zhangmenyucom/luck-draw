<template>
  <div class="drawList">
    <a class="list" v-for="(item , i) in list" >
      <img :src="item.user.avatar">
      <br />
      <span>
        {{item.user.nickName}}
      </span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'activitieList',
    props: ['list']
  }
</script>

<style scoped >
  @import '../common/less/util.less';
  .drawList{
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
    .list{
      text-align: center;
      max-width: 33.333333%;
      min-width: 33.3333333%;
      margin-bottom:24*@2;
      flex:1;
      img{
        width: 40*@2;
        height: 40*@2;
        border-radius: 20*@2;
        margin-bottom: 8*@2;
      }
      span{
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        display: block;
        color: #999999;
        font-size: 14*@2;
        line-height: 18*@2;
      }
    }
  }

</style>
