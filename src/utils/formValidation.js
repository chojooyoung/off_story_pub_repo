import { defineRule } from 'vee-validate'

function FormValidator() {
  defineRule('required', value => {
    return !value || !value.length ? '이 필드가 비어있어요' : true
  })

  defineRule('email', value => {
    pass(value)

    const checkEmailCondition = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/

    return !checkEmailCondition.test(value)
      ? '유효한 이메일 주소를 입력해주세요'
      : true
  })

  defineRule('between', (value, [min, max]) => {
    pass(value, min, max)

    console.log(value, value.length)

    if (value.length < min) {
      return `${min}자 이상입력해주세요`
    }

    if (value.length > max) {
      return `${max}자 이하로 입력해주세요`
    }

    return true
  })

  defineRule('password', value => {
    const checkPwCondition = /^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*#?&]).*$/
    return !checkPwCondition.test(value)
      ? '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 해요'
      : true
  })

  defineRule('confirmed', (value, [target]) => {
    console.log(value, target)
    return value !== target ? '비밀번호가 맞지 않아요' : true
  })

  function pass(value) {
    if (!value || !value.length) {
      return true
    }
  }
}

export default FormValidator
