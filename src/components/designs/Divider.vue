<template>
  <hr :style="{ propsStyle }" />
</template>

<script>
import { checkUnit } from '~/utils/function'
export default {
  props: {
    dir: {
      type: String,
      default: 'column',
    },
    width: {
      type: [Number, String],
      default: 10,
    },
    height: {
      type: [Number, String],
      default: 1,
    },
    color: {
      type: String,
      default: '#cccccc',
    },
    margin: {
      type: [Number, String],
      default: 10,
    },
  },
  computed: {
    propsStyle() {
      return {
        border: 'none',
        margin:
          this.dir === 'row'
            ? `0 ${checkUnit(this.margin)}`
            : `${checkUnit(this.margin)} 0`,
        display: this.dir === 'row' ? 'inline-block' : 'block',
        backgroundColor: this.color,
        width: checkUnit(this.width),
        height: checkUnit(this.height),
      }
    },
  },
  methods: {
    checkUnit,
  },
}
</script>
