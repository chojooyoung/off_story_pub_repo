<template>
  <div class="card" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['width', 'height', 'paddingVertical', 'paddingHorizontal'],
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
        paddingTop: this.paddingVertical,
        paddingBottom: this.paddingVertical,
        paddingLeft: this.paddingHorizontal,
        paddingRight: this.paddingHorizontal,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: $LG_PADDING_HORIZONTAL $LG_PADDING_VERTICAL;
  background-color: $COLOR_WHITE;
  box-shadow: $BOX_SHADOW;
}
</style>
