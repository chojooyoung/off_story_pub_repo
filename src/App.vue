<template>
  <Header @toggleSidebar="onProfileClick" />
  <Sidebar v-if="isSidebarShowed && isLogin" />
  <RouterView />
</template>

<script>
import { mapGetters } from 'vuex'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import {
  API_ENDPOINT_OF_AREAINFO,
  API_ENDPOINT_OF_DEVCOURSE,
} from './utils/variables.js'

export default {
  components: { Header, Sidebar },
  data() {
    return {
      isSidebarShowed: true,
    }
  },
  computed: {
    ...mapGetters('Login', ['isLogin']),
  },
  methods: {
    onProfileClick() {
      this.isSidebarShowed = !this.isSidebarShowed
    },
    async getChannelList() {
      const channelList = await this.$fetch(
        API_ENDPOINT_OF_DEVCOURSE + 'channels',
      )

      // console.log('채널 리스트', channelList)
    },
  },
  async mounted() {
    await this.getChannelList()
  },
}
</script>

<style lang="scss">
html,
body {
  font-family: $FONT_MAIN;
  @include font;
}
</style>
