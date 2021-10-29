const API_END_POINT = 'http://13.209.30.200:5000'

const requestSignup = async ({ email, fullName, password }) => {
  try {
    const res = await fetch(`${API_END_POINT}/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        fullName,
        password,
      }),
    })
    if (res.ok) {
      return res.json()
    }
  } catch (e) {
    console.log(e.message)
  }
}

export default requestSignup
