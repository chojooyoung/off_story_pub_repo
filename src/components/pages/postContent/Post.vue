<template>
  <Card>
    <section class="post">
      <header class="post__header">
        <div class="left">
          <button class="user__profile">
            <img :src="profileUrl" alt="유저 프로필" />
          </button>
          <div class="user__infos">
            <strong class="nickname">{{ author.fullName }}</strong>
            <div class="uploadDate">{{ timeForToday(postData.createdAt) }}</div>
            <div class="location">{{ postData.location }}</div>
          </div>
        </div>
        <div class="right">
          <!-- <Button v-if="!checkHost" v-bind="{ width: '60px', height: '70px' }">
            찜하기
          </Button> -->
          <div v-if="checkHost" class="edit-area">
            <button v-if="!isEdit" @click="changeToEdit" class="edit">
              편집
            </button>

            <button v-if="!isEdit" @click="submitDelete" class="delete">
              삭제
            </button>
          </div>
        </div>
      </header>
      <template v-if="!isEdit">
        <Editor :title="title" :content="content" :postImgUrl="postImgUrl" />
      </template>
      <template v-else>
        <!-- TODO: 이벤트 올리기 -->
        <EditPage
          @rerender="rerender"
          @saveEdit="saveEdit"
          @cancelEdit="cancelEdit"
          v-show="changeToEdit"
          :postId="postId"
          :channel="channel"
          :initialTitle="title"
          :initialContent="content"
          :initialPostImgUrl="postImgUrl"
        />
      </template>
    </section>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'
import { timeForToday } from '~/utils/function'
import { getUserIdToCookie } from '~/utils/cookies'
import { deletePost } from '~/api/postContent'
import Card from '~/components/designs/Card'
import Button from '~/components/designs/Button'
import Editor from '~/components/pages/postContent/Editor'
import EditPage from '~/components/pages/postContent/EditPage'

export default {
  components: {
    Card,
    Button,
    Editor,
    EditPage,
  },
  props: ['postId', 'postData', 'author', 'channel'],
  watch: {
    postData: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue, 'postData watch')
      },
    },
  },
  data() {
    return {
      userId: this.getUserIdToCookie(),
      // postId: this.initialPostId,
      // postData: this.initialPostData,
      // author: this.author,
      // channel: this.initialChannel,
      isEdit: false,
    }
  },
  methods: {
    timeForToday,
    changeToEdit() {
      this.isEdit = true
    },
    saveEdit() {
      this.isEdit = false
    },
    cancelEdit() {
      this.isEdit = false
    },
    submitDelete() {
      const userData = {
        id: this.postId,
      }
      // deletePost(userData)
    },
    getProfileImg() {
      const result = Object.keys(this.author).some(v => v === 'coverImage')
      return result ? this.author.coverImage : ''
    },
    getPostImg() {
      const result = Object.keys(this.postData).some(v => v === 'image')
      return result ? this.postData.image : ''
    },
    async rerender() {
      await this.$emit('rerender')
    },
    getUserIdToCookie,
  },
  computed: {
    ...mapGetters('Login', ['getUserId']),
    title() {
      return this.postData.title.split('/')[0]
    },
    content() {
      return this.postData.title.split('/')[1]
    },
    profileUrl() {
      return (
        this.getProfileImg() ||
        require('~/assets/images/user-profile__default.svg')
      )
    },
    postImgUrl() {
      return this.getPostImg() || ''
    },
    checkHost() {
      return this.author._id === this.userId
    }, // 글 작성자 _id, 로그인된 userId 같은지 비교
  },
}
</script>

<style lang="scss" scoped>
.post {
  position: relative;
  min-height: 300px;

  &__header {
    @include flexbox($jc: between, $ai: start);
    height: $LG_HEADER_HEIGHT;

    .left {
      @include flexbox($jc: start);

      .user {
        &__profile {
          flex-shrink: 0;
          border-radius: 50%;
          overflow: hidden;
          margin-right: $INNER_PADDING_HORIZONTAL;
          img {
            @include flexbox;
            width: 40px;
            height: 40px;
            object-fit: cover; // 일단은 contain으로 해놓음
          }
        }

        &__infos {
          & > * {
            margin-bottom: $INNER_PADDING_SMALL;
          }
          .nickname {
            display: inline-block;
            font-size: $FONT_L;
            cursor: pointer;
          }

          .uploadDate,
          .location {
            color: inherit;
            font-size: $FONT_S;
          }

          .uploadDate {
            color: $KEY_COLOR;
          }
        }
      }
    }

    .right {
      .edit-area {
        button {
          color: $COLOR_GRAY_DARKEN;
        }
        .edit {
          margin-right: $INNER_PADDING_HORIZONTAL;
        }
      }
    }
  }
}
</style>
