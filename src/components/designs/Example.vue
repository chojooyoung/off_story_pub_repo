<template>
  <div class="container">
    <div class="row">
      <Button v-bind="{ width: '100%' }">회원가입</Button>
      <Button
        v-bind="{
          width: '85px',
          height: '50px',
          backgroundColor: '#339AF0',
        }"
        >로그인</Button
      >
      <Button
        v-bind="{
          width: '85px',
          height: '40px',
          backgroundColor: '#343A40',
          color: '#fff',
        }"
        >보러가기</Button
      >
      <Button
        v-bind="{
          height: '40px',
          backgroundColor: '#7C7C7C',
          color: '#fff',
          boxShadow: 'none',
        }"
        >그림자가 없는 버튼</Button
      >
    </div>
    <div class="row">
      <Tag v-bind="{ state: 'approve' }" />
      <Tag v-bind="{ state: 'reject' }" />
      <Tag />
      <Tag v-bind="{ width: 50, height: '300px' }" />
    </div>
    <div class="row">
      <Input
        v-bind="{
          width: '100%',
          backgroundColor: '#51CF66',
          color: '#fff',
        }"
        placeholder="내용을 입력하세요"
      />
      <Input
        v-bind="{
          width: '500px',
          paddingVertical: '15px',
          paddingHorizontal: '10px',
          backgroundColor: '#fff',
          color: '#343A40',
        }"
        placeholder="내용을 입력하세요"
      />
    </div>
    <div class="row">
      <Card>
        <h2>카드 컴포넌트</h2>
        <strong>텍스트입니다</strong>
      </Card>
      <Card v-bind="{ width: '400px', height: '200px' }">
        <h2>카드 컴포넌트</h2>
        <strong>width: 400px, height: 200px</strong>
      </Card>
    </div>
  </div>
</template>

<script>
import Button from '~/components/designs/Button'
import Tag from '~/components/designs/Tag'
import Input from '~/components/designs/Input'
import Card from '~/components/designs/Card'

export default {
  components: {
    Button,
    Tag,
    Input,
    Card,
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  top: $LG_HEADER_HEIGHT;
}
</style>
