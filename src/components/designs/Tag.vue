<template>
  <button class="tag" :style="style">
    <span>
      {{
        state === 'approve'
          ? '참가 승인됨'
          : state === 'reject'
          ? '참가 거절됨'
          : '참가 대기중'
      }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 100,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    borderRadius: {
      type: [Number, String],
      default: 10,
    },
    color: {
      type: String,
      default: '#fff',
    },
    backgroundColor: {
      type: String,
      default: '#FF8B4A',
    },
    fontSize: {
      type: [Number, String],
      default: 12,
    },
  },
  computed: {
    style() {
      return {
        width: this.isNumber(this.width) ? `${this.width}px` : this.width,
        height: this.isNumber(this.height) ? `${this.height}px` : this.height,
        borderRadius: this.isNumber(this.borderRadius)
          ? `${this.borderRadius}px`
          : this.borderRadius,
        color: this.color,
        backgroundColor:
          this.state === 'approve'
            ? '#51CF66'
            : this.state === 'reject'
            ? '#F03E3E'
            : this.backgroundColor,
        fontSize: this.isNumber(this.fontSize)
          ? `${this.fontSize}px`
          : this.fontSize,
      }
    },
  },
  methods: {
    isNumber(prop) {
      return typeof prop === 'number'
    },
  },
}
</script>

<style lang="scss" scoped>
.tag {
  @include flexbox;
  word-break: keep-all;
  font-weight: 700;
  box-shadow: $BUTTON_BOX_SHADOW;

  &:hover {
    filter: brightness($OPACITY);
  }
}
</style>
