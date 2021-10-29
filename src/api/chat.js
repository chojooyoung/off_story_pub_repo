import { createInstance } from './index'

const instance = createInstance()

function getConversations() {
  const getConversationsUrl = 'messages/conversations'
  return instance.get(getConversationsUrl)
}

function getSpecificMessage() {
  const getmessageUrl = 'messages'
  return instance.get(getmessageUrl)
}

function createMessage(userData) {
  const createMessageUrl = 'messages/create'
  return instance.post(createMessageUrl, userData)
}

export { getConversations, getSpecificMessage, createMessage }
