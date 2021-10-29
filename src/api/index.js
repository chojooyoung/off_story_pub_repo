import axios from 'axios'
import store from '~/store/index'
import { setInterceptors } from './common/interceptors'

const API_END_POINT = 'http://13.209.30.200:5000'

function createInstance() {
  const instance = axios.create({
    // AxiosRequestConfig = axios 공통 설정란
    baseURL: API_END_POINT, //process.env.API_ENDPOINT
  })

  return setInterceptors(instance)
}

const instance = createInstance()

// login, signup
function registerUser(userData) {
  const registerUrl = 'signup'
  return instance.post(`${registerUrl}`, userData) //어떤서버로 요청할지 url
}

function loginUser(userData) {
  return instance.post('login', userData)
}

// channel
function createChannel(channelData) {
  return instance.post('/channels/create', channelData)
}

function channelsList() {
  return instance.get('/channels')
}

function channelPostList(channelId) {
  return instance.get(`/posts/channel/${channelId}`)
}

function getAuth() {
  return instance.get('/auth-user')
}

function createPost(userData) {
  return instance.post('/posts/create', userData)
}

// userDetailInfo
function userDetailInfo(userId) {
  console.log('userid:', `users/${userId}`)
  return instance.get(`/users/${userId}`)
}

// function updateUserDetailInfo(userData) {
//   // console.log('userid:', `users/${userId}`)
//   return instance.put('/users/settings/update-user', userData)
// }

function updateCoverImage(userData) {
  return instance.post('/users/upload-photo', userData)
}

function updateNameField(userData) {
  return instance.put('/settings/update-user', userData)
}

function updatePassword(userData) {
  return instance.put('/settings/update-password', userData)
}

export {
  createInstance,
  registerUser,
  loginUser,
  userDetailInfo,
  updateNameField,
  channelsList,
  channelPostList,
  createChannel,
  getAuth,
  updateCoverImage,
  updatePassword,
  createPost,
}
