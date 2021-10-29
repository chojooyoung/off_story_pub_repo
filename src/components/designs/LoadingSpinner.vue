<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss">
.spinner-container {
  @include flexbox;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba($COLOR_WHITE, $OPACITY);
  backdrop-filter: blur(2px);
  z-index: $LOADING_INDEX;
}
.spinner {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid $COLOR_BORDER;
  border-bottom: 10px solid $KEY_COLOR;
  animation: spin 1s linear infinite;
  position: relative;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
