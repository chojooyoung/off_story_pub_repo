<template>
  <button :style="style" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: [
    'width',
    'height',
    'backgroundColor',
    'color',
    'borderRadius',
    'fontSize',
    'boxShadow', // 사용하고싶지 않을 땐 'none'을 넣어주세욥
  ],
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
        backgroundColor: this.backgroundColor,
        color: this.color,
        borderRadius: this.borderRadius,
        fontSize: this.fontSize,
        boxShadow: this.boxShadow, // = $BUTTON_BOX_SHADOW
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  @include flexbox;
  width: 200px;
  height: $BUTTON_HEIGHT;
  font-size: $FONT_BASE;
  color: $COLOR_WHITE;
  background-color: $KEY_COLOR;
  border-radius: $BORDER_RADIOUS;
  font-weight: 700;
  transition: all 300ms;
  box-shadow: $BUTTON_BOX_SHADOW;

  &:hover,
  &:active {
    filter: brightness($OPACITY);
  }
}
</style>
