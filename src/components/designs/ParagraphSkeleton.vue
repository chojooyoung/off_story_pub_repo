<template>
  <div>
    <BoxSkeleton
      v-for="(value, index) in line"
      :key="index"
      :style="propsStyle"
    />
    <BoxSkeleton
      :key="line"
      :style="{ ...propsStyle, width: `${lastWidth}` }"
    />
  </div>
</template>

<script>
import { checkUnit } from '~/utils/function'
import BoxSkeleton from '~/components/designs/BoxSkeleton'

export default {
  components: { BoxSkeleton },
  props: {
    line: {
      type: Number,
      default: 5,
    },
    width: {
      type: [Number, String],
      default: '500px',
    },
    lastWidth: {
      type: [Number, String],
      default: '350px',
    },
    height: {
      type: [Number, String],
      default: 16,
    },
    margin: {
      type: [Number, String],
      default: 16,
    },
    display: {
      type: String,
      default: 'flex',
    },
  },
  computed: {
    propsStyle() {
      return {
        width: checkUnit(this.width),
        lastWidth: checkUnit(this.lastWidth),
        height: checkUnit(this.height),
        margin: checkUnit(this.margin),
        display: this.display,
      }
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
