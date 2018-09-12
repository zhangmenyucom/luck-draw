<template>
  <div class="drawList">
    <a class="list" v-for="(item , i) in list" >
      <img :src="item.img">
      <br />
      <span>
        {{ item.nickName ? item.nickName : '' }}
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
      max-width: 25%;
      min-width: 25%;
      margin-bottom:24*@2;
      width: 25%;
      float: left;
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
