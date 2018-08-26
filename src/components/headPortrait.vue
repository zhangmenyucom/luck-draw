<template>
  <div>
    <div>
      <img :style="{width:size+'px', height:size+'px'}" v-for="(item, index) in list" :src="rangeKey?item[rangeKey]:item">
      <div class="more" v-if="list.length >= 8">
        ...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'rangeKey', 'size']
}
</script>

<style scoped>
@import '../common/less/util.less';
img{
  width: 30*@2;
  height: 30*@2;
  border:15*@2;
  margin-left: -10*@2;
  border-radius: 15*@2;
}
.more{
  display: inline-block;
  line-height: 30*@2;
  position: relative;
  top: -15*@2;
  left:3*@2;
  color: RGBA(193, 193, 193, 1);
}
</style>
