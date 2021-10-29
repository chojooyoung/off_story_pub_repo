<template>
  <input class="input" :style="style" />
</template>

<script>
export default {
  props: [
    'width',
    'paddingVertical',
    'paddingHorizontal',
    'fontSize',
    'backgroundColor',
    'color',
    'borderRadius',
  ],
  computed: {
    style() {
      return {
        width: this.width,
        paddingTop: this.paddingVertical,
        paddingBottom: this.paddingVertical,
        paddingLeft: this.paddingHorizontal,
        paddingRight: this.paddingHorizontal,
        fontSize: this.fontSize,
        color: this.color,
        backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  @include font($sz: $FONT_BASE, $color: $COLOR_PRIMARY);
  width: 100%;
  padding: $INNER_PADDING_VERTICAL $INNER_PADDING_HORIZONTAL;
  border-radius: $BORDER_RADIOUS;
  background-color: $COLOR_WHITE;
  box-shadow: $BUTTON_BOX_SHADOW;
  border: none;
  transition: all 300ms;

  &::placeholder {
    color: $COLOR_GRAY_LIGHTEN;
  }

  &:hover,
  &:active {
    filter: brightness($OPACITY);
  }
}
</style>
