<template>
  <div>
    <div>
      <img :style="{width:size+'px', height:size+'px'}" v-for="(item, index) in list" :src="rangeKey?item[rangeKey]:item">
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'rangeKey', 'size']
}
</script>

<style scoped>
@import '../common/util.less';

img{
  width: 30*@2;
  height: 30*@2;
  border:15*@2;
  margin-left: -10*@2;
}
</style>
