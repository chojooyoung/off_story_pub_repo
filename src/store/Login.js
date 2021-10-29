import { getAuthFromCookie, getUserFromCookie } from '../utils/cookies'
export default {
  namespaced: true,
  state() {
    return {
      userId: '',
      userCoverImage: null,
      userIntroduction: '',
      userFullName: '',
      userEmail: '',
      username: getUserFromCookie() || '',
      token: getAuthFromCookie() || '',
      profileImage: '',
    }
  },
  getters: {
    userId(state) {
      return state.userId
    },
    isLogin(state) {
      return state.username !== ''
    },
    isEmptyProfileImage(state) {
      console.log('emptycheck', state.profileImage === undefined)
      return state.profileImage === undefined
    },
    getUsername(state) {
      return state.username
    },
    getUserId(state) {
      return state.userId
    },
    getUserProfileImage(state) {
      return state.profileImage
    },
    getToken(state) {
      return state.token
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setprofileImage(state, profileImage) {
      state.profileImage = profileImage
    },
    clearUsername(state) {
      state.username = ''
    },
    clearToken(state) {
      state.token = ''
    },
    setToken(state, token) {
      state.token = token
    },
  },
  actions: {},
}
