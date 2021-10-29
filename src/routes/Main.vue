<template>
  <div class="container">
    <div>Main</div>
    <BoxSkeleton />
    <CircleSkeleton />
    <ParagraphSkeleton />
  </div>
</template>

<script>
import BoxSkeleton from '~/components/designs/BoxSkeleton'
import CircleSkeleton from '~/components/designs/CircleSkeleton'
import ParagraphSkeleton from '~/components/designs/ParagraphSkeleton'
export default {
  components: { BoxSkeleton, CircleSkeleton, ParagraphSkeleton },
}
</script>

<style lang="scss" scoped>
.container {
  @include flexbox;
  width: 100vw;
  height: 100vh;
}
</style>
