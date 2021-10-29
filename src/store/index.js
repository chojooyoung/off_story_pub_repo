import { createStore } from 'vuex'
import post from './post'
import address from './address'
import Login from './Login'

export default createStore({
  modules: {
    post,
    address,
    Login,
  },
})
