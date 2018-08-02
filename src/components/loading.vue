<template>
  <div class="loading">
      <img class="bean" src="/static/img/bean.png" />
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data () {
      return {
        index: '00'
      }
    },
    methods: {
    },
    onLoad () {
      console.log('ddd')
      // const setI = setInterval(() => {
      //   let i = parseInt(this.index, 10)

      //   if (i >= 31) {
      //     i = 0
      //   }
      //   console.log(i)
      //   i = (((i + 1) + '').length === 2) ? ((i + 1) + '') : '0' + (i + 1)

      //   this.index = i
      //   const a = false
      //   if (a) clearInterval(setI)
      // }, 31)
    }
  }
</script>

<style scoped>
  @import '../common/less/util.less';
  .loading{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right: 0;
    background:#fff;
    z-index: 100
  }
  img {
    position: absolute;
    width: 52*@2;
    height: 200*@2;
    margin:auto;
  }
</style>
