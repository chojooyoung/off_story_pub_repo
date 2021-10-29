import { createApp } from 'vue'
import FormValidator from '~/utils/formValidation'
import App from '~/App'
import store from '~/store'
import router from '~/routes'
import fetchPlugin from '~/plugins/fetch'
import axiosPlugin from '~/plugins/axios'
import storagePlugin from '~/plugins/storage'

const app = createApp(App)
app.use(fetchPlugin, {
  pluginName: '$fetch',
})
app.use(axiosPlugin, {
  pluginName: '$axios',
})
app.use(storagePlugin, {
  pluginName: '$storage',
})
app.use(store)
app.use(router)
app.mount('.app')

FormValidator()
