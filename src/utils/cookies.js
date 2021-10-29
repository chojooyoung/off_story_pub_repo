function saveUserIdToCookie(value) {
  document.cookie = `off_userId=${value}`
}

function saveAuthToCookie(value) {
  document.cookie = `off_auth=${value}`
}

function saveUserToCookie(value) {
  document.cookie = `off_user=${value}`
}

function saveUserImageToCookie(value) {
  document.cookie = `off_userprofileImage=${value}`
}

function getUserIdToCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)off_userId\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)off_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)off_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
}

function getImageFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)off_userprofileImage\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export {
  saveUserIdToCookie,
  saveAuthToCookie,
  saveUserToCookie,
  saveUserImageToCookie,
  getUserIdToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  getImageFromCookie,
  deleteCookie,
}
