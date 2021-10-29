<template>
  <h1 class="notfound">
    404 Not Found 요청하신 페이지를 찾을 수 없어요
    <div class="button">
      <button @click="$router.push('/')">메인 페이지로 가기</button>
    </div>
  </h1>
</template>

<style lang="scss" scoped>
.notfound {
  text-align: center;
  font-size: $FONT_XXL;
  width: 100%;
  position: absolute;
  top: 400px;
  margin: 0;
  background-color: white;
  color: black;
  button {
    font-size: $FONT_XL;
    color: black;
    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
