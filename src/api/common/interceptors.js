import store from '~/store/index'
// interceptor: request, response 전에 추가 로직을 넣을 수 있도록 함.
export function setInterceptors(instance) {
  instance.interceptors.request.use(
    // request interceptor
    function (config) {
      // request 보내기 전에 할 로직
      console.log(store.state.Login.token)
      const APITOKEN = store.state.Login.token
      console.log(config)
      config.headers.Authorization = `bearer ${APITOKEN}` // header에 인증 토큰 추가
      return config
    },
    function (error) {
      // error 처리
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    // response interceptor
    function (response) {
      return response
    },
    function (error) {
      return Promise.reject(error)
    },
  )
  return instance
}
