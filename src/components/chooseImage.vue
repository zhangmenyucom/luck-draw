<template>
    <scroll-view scroll-y="true" scroll-x="true" class = "FilePath" @touchmove="scroll" @touchstart='scroll' @touchend='endTou'>
        <img src='{{src}}' style="width: {{width}}px;height: {{height}}px;" touchmove="touch" />
    </scroll-view>
</template>

<script>
export default {
  data () {
      return {}
  },
  methods: {}
}
</script>

<style>

</style>