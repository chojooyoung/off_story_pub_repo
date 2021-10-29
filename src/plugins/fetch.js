export async function $fetch(url, opts = {}) {
  try {
    const res = await fetch(url, opts)
    return await res.json()
  } catch (e) {
    console.error(e.message)
  }
}
export default {
  install(app, options = {}) {
    app.config.globalProperties[options.pluginName || '$fetch'] = $fetch
  },
}
