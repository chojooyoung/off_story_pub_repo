const storage = window.sessionStorage

const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(e.message)
  }
}

const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : defaultValue
  } catch (e) {
    console.error('session storage에서 key를 불러올 수 없습니다')
    return defaultValue
  }
}

const removeItem = key => {
  console.log('실행여부')
  storage.removeItem(key)
}

export { setItem, getItem, removeItem }

export default {
  install(app, options = {}) {
    app.config.globalProperties[options.pluginName || '$storage'] = {
      setItem,
      getItem,
      removeItem,
    }
  },
}
