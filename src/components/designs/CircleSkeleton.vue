<template>
  <div
    class="box"
    :style="{
      width: checkUnit(width),
      height: checkUnit(height),
      borderRadius: '50%',
    }"
  ></div>
</template>

<script>
import { checkUnit } from '~/utils/function'

export default {
  props: {
    width: {
      type: [Number, String],
      default: 100,
    },
    height: {
      type: [Number, String],
      default: 100,
    },
  },
  methods: {
    checkUnit,
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins/designs';
.box {
  @include baseOfSkeletonUI;
}
</style>
