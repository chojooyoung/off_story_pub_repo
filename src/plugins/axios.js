import axios from 'axios'

export function $axios(option) {
  try {
    const res = axios(option)
    if (!res.ok) {
      console.log(res)
      res.then(res => console.log(res))
      throw new Error('API를 가져올 수 없습니다')
    }
    return res.data
  } catch (e) {
    console.error(e.message)
  }
}
export default {
  install(app, options = {}) {
    app.config.globalProperties[options.pluginName || '$axios'] = $axios
  },
}
