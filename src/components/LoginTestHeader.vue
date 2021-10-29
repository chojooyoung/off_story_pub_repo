<template>
  <header>
    <div class="navigations">
      <template v-if="isUserLogin">
        <span @click="ismodal">{{ getUsername }} 님 반갑습니다.</span>
        <button @click="logoutUser">로그아웃</button>
      </template>
      <template v-else>
        <router-link to="/login">로그인</router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { deleteCookie } from '../utils/cookies'

export default {
  methods: {
    logoutUser() {
      this.$store.commit('Login/clearUsername')
      this.$store.commit('Login/clearToken')
      deleteCookie('off_auth')
      deleteCookie('off_user')
      this.$router.push('/')
      return alert('logout!')
    },
    ismodal() {
      alert('모달')
    },
  },
  computed: {
    isUserLogin() {
      //console.log(this.$store.getters['Login/isLogin'])
      return this.$store.getters['Login/isLogin']
    },
    getUsername() {
      //this.$store.state.Login.username
      const username = this.$store.state.Login.username
      return username
    },
  },
}
</script>
