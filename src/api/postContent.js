import { createInstance } from './index'

const instance = createInstance()

function readPost(postId) {
  const readPostUrl = `posts/${postId}`
  return instance.get(readPostUrl)
}

function updatePost(formData) {
  const updatePostUrl = 'posts/update'
  return instance.put(updatePostUrl, formData)
}

function deletePost(userData) {
  const deletePostUrl = 'posts/delete'
  return instance.put(deletePostUrl, userData)
}

function createComment(userData) {
  const createCommentUrl = 'comments/create'
  return instance.post(createCommentUrl, userData)
}

function deleteComment(userData) {
  const deleteCommentUrl = 'comments/delete'
  return instance.delete(deleteCommentUrl, userData)
}

export { readPost, updatePost, deletePost, createComment, deleteComment }
