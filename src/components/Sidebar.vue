<template>
  <div class="wrapper">
    <div class="header">
      <template v-if="getUserProfileImage === `undefined`">
        <img class="basicimage" :src="imageUrl" alt="" />
      </template>
      <template v-else>
        <img class="userimage" :src="getUserProfileImage" alt="" />
      </template>
      <div class="message">
        <div class="username">{{ getUsername }}</div>
        <span>님, 우리 동행할까요?</span>
      </div>
    </div>
    <div class="top">
      <button
        class="option personal-info"
        @click="$router.push('/personalinfo')"
      >
        내 정보 변경
      </button>
      <button
        class="option personal-create--newpost"
        @click="$router.push('/newpost')"
      >
        동행글 쓰기
      </button>
      <button
        class="option personal-activity"
        @click="$router.push('/personalactivity')"
      >
        내 활동목록
      </button>
      <button class="option personal-activity" @click="$router.push('/chat')">
        채팅
      </button>
    </div>
    <div class="bottom">
      <img @click="logout" :src="logoutImageUrl" alt="" class="logoutimg" />
      <button class="optionlogout" @click="logout">로그아웃</button>
    </div>
  </div>
</template>

<script>
import { deleteCookie, getImageFromCookie } from '~/utils/cookies'
export default {
  data() {
    return {
      imageUrl: require('../assets/images/user-profile__default.svg'),
      logoutImageUrl: require('../assets/images/logout-black.svg'),
    }
  },
  computed: {
    getUserProfileImage() {
      // this.$store.state.Login.username
      // const res = this.$storage.getItem('userData')
      // const profileImage = res.userCoverImage
      // const profileImage = this.$store.state.Login.profileImage
      // console.log(profileImage)
      const profileImage = getImageFromCookie()
      console.log(profileImage)
      return profileImage
    },
    getUsername() {
      //this.$store.state.Login.username
      const username = this.$store.state.Login.username
      return username
    },
  },
  methods: {
    logout() {
      this.$store.commit('Login/clearUsername')
      this.$store.commit('Login/clearToken')
      deleteCookie('off_auth')
      deleteCookie('off_user')
      deleteCookie('off_userId')
      deleteCookie('off_userprofileImage')
      this.$router.push('/')
      return alert('logout!')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';

.wrapper {
  transition: all 0.3s;
  z-index: 100;
  width: 20%;
  position: fixed;
  top: 70px; //($LG_HEADER_HEIGHT-(10px));;
  right: 30px;
  box-shadow: $BOX_SHADOW;
  background-color: white;
  padding: 10px;

  .header {
    align-items: center;
    align-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: solid $COLOR_GRAY_LIGHTEN;

    .basicimage {
      width: 40px;
      height: 40px;
    }
    .userimage {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    .message {
      .username {
        width: 45px;
        color: $KEY_COLOR;
      }
      display: flex;
    }
  }

  .top {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    button {
      font-family: 'Noto Sans KR', sans-serif;
      margin: 0 10px 10px 10px;
      font-size: $FONT_BASE;
      color: $COLOR_GRAY_DARKEN;
      &:hover {
        color: $COLOR_GRAY_LIGHTEN;
      }
    }
  }
  .bottom {
    text-align: right;

    .logoutimg {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
    .optionlogout {
      color: $COLOR_GRAY_DARKEN;
      font-family: 'Noto Sans KR', sans-serif;
      font-size: $FONT_S;
      margin-left: 2px;
    }
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
