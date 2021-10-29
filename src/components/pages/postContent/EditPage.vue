<template>
  <form @submit.prevent="submitInfo" class="editor">
    <div class="edit-area">
      <button @click="$emit('cancelEdit')">취소</button>
      <button>저장</button>
    </div>
    <input
      v-focus
      @change="loadFile($event)"
      multiple
      accept="image/*"
      type="file"
      class="inputfile"
    />
    <input
      v-focus
      ref="title"
      class="editor__title"
      :value="title"
      @input="changeTitle"
    />
    <img v-if="postImgUrl" class="postImg" :src="postImgUrl" alt="" />
    <textarea
      ref="content"
      class="content"
      type="text"
      :value="content"
    ></textarea>
  </form>
</template>

<script>
import { updatePost } from '~/api/postContent'
import { putBr } from '~/utils/function'
export default {
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      },
    },
  },
  props: {
    postId: {
      type: String,
      default: '',
      required: true,
    },
    channel: {
      type: Object,
      default: () => {},
      required: true,
    },
    initialTitle: {
      type: String,
      default: '',
      required: true,
    },
    initialContent: {
      type: String,
      default: '',
      required: true,
    },
    initialPostImgUrl: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    // 수정할 값들은 props에서 data로 받아옴
    return {
      title: this.initialTitle,
      content: this.initialContent,
      image: '',
      postImgUrl: this.initialPostImgUrl,
    }
  },
  methods: {
    changeTitle(event) {
      this.title = event.target.value
    },
    changeContent() {
      const result = putBr(this.$refs.content.value)
      this.content = result
    },
    async submitInfo() {
      this.changeContent()

      const userData = new FormData()
      userData.append('postId', this.postId)
      userData.append('title', `${this.title}/${this.content}`)
      userData.append('image', this.image || null)
      userData.append('channelId', this.channel._id)

      const res = await updatePost(userData)
      console.log(res, 'update 완료')
      await this.$emit('rerender')
      this.$emit('saveEdit')
    },
    loadFile(event) {
      const file = event.target.files[0]

      const newImageSrc = URL.createObjectURL(file)
      console.log(newImageSrc, 'changeImg')
      this.postImgUrl = newImageSrc
      this.image = file
    },
    putBr,
  },
}
</script>

<style lang="scss" scoped>
.editor {
  height: calc(100% - $LG_HEADER_HEIGHT);
  display: flex;
  flex-direction: column;

  &__title {
    padding: $INNER_PADDING_VERTICAL 0;
    font-size: $FONT_XL;
    border: transparent;
    font-weight: 700;
  }

  .postImg {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: $UPLOAD_IMAGE_SIZE;
    height: $UPLOAD_IMAGE_SIZE;
  }

  .content {
    flex-grow: 1;
    padding: $INNER_PADDING_VERTICAL 0;
    border: transparent;
    font-size: $FONT_L;
  }

  .edit-area {
    position: absolute;
    top: 0;
    right: 0;

    button {
      color: $COLOR_GRAY_DARKEN;

      &:first-child {
        margin-right: $INNER_PADDING_HORIZONTAL;
      }
    }
  }
}
</style>
