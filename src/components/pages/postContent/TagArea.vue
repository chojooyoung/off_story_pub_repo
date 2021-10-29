<template>
  <div class="tags-area">
    <Tag @click="onToggle" class="standByTag" v-bind="{ state: tagState }" />
    <template v-if="checkHost">
      <Card
        v-show="isToggle"
        class="tags-choice"
        v-bind="{
          width: '200px',
          height: '100px',
        }"
      >
        <h2 class="recommend">채팅 참여 승인여부를 <br />선택해주세요</h2>
        <div class="button-wrapper">
          <Button
            @click="saveApprovalData($event)"
            class="approve"
            v-bind="{
              width: '60px',
              height: '40px',
              backgroundColor: '#51CF66',
              fontSize: '14px',
            }"
            >승인</Button
          >
          <Button
            @click="saveApprovalData($event)"
            class="reject"
            v-bind="{
              width: '60px',
              height: '40px',
              backgroundColor: '#F03E3E',
              fontSize: '14px',
            }"
            >거절</Button
          >
        </div>
      </Card>
    </template>
  </div>
</template>

<script>
import { userDetailInfo, updateNameField } from '~/api'
import Card from '~/components/designs/Card.vue'
import Tag from '~/components/designs/Tag.vue'
import Button from '~/components/designs/Button.vue'

export default {
  components: {
    Card,
    Tag,
    Button,
  },
  props: {
    postId: {
      type: String,
      default: '',
      required: true,
    },
    userId: {
      type: String,
      default: '',
      required: true,
    },
    authorId: {
      type: String,
      default: '',
      required: true,
    },
    commentorId: {
      type: String,
      default: '',
      required: true,
    },
    commentorName: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      isToggle: false,
      tagState: '',
    }
  },
  computed: {
    checkHost() {
      return this.authorId === this.userId
    }, // 글 작성자 _id, 로그인된 userId 같은지 비교
  },
  methods: {
    onToggle() {
      this.isToggle = !this.isToggle
    },
    changeTag(state) {
      this.tagState = state
      this.isToggle = !this.isToggle
    },
    // async getCommentorState() {
    //   const res = await userDetailInfo(this.commentorId)
    //   console.log(res)
    // },
    checkHasSamePostId(array) {
      return array.findIndex(v => v.postid === this.postId)
    },
    async saveApprovalData(event) {
      const state = event.target.className.replace('button ', '') // approve, reject
      const stateData = {
        postId: this.postId,
        state,
      }
      const res = await userDetailInfo(this.commentorId) // 댓작성자의 정보 불러옴
      console.log(res.data.username, '댓작성자 정보')
      const [dummyData, username] = res.data.username.split('/')
      console.log(username.length) // 2 ""
      let updateUserName = ''

      if (username.length > 2) {
        // username이 있으면
        console.log('username이 있음')
        const array = JSON.parse(username) // 배열로 변환
        console.log(array, 'array')
        const index = this.checkHasSamePostId(array) // 같은 포스트ID인지 찾음
        if (index === -1) {
          // 같은게 없다면 추가
          updateUserName = [...array, stateData]
          console.log(updateUserName, 'different postId')
        } else {
          // 같은게 있다면 state만 변경
          array[index].state = state
          const changeValue = array[index]
          const changeArray = array.slice(index, index + 1, changeValue)
          console.log(changeArray, 'same postId')
          updateUserName = changeArray
        }
      } else {
        updateUserName = [stateData]
        console.log(updateUserName, 'username이 비었음')
      }

      const updateData = dummyData + '/' + JSON.stringify(updateUserName)

      const updateUserInfo = {
        // 유저 정보 update에 필요한 request body
        fullName: this.commentorName,
        username: updateData,
      }
      const userInfo = await updateNameField(updateUserInfo) // username 업데이트
      console.log(userInfo.data.username, '업데이트완료')

      this.changeTag(state)
    },
  },
}
</script>

<style lang="scss" scoped>
.tags-area {
  position: relative;
}

.tags-choice {
  @include flexbox($jc: around);
  flex-direction: column;
  position: absolute;
  top: $TAG_HEIGHT + $INNER_PADDING_SMALL;
  right: 0px;
  z-index: $TAG_AREA_INDEX;

  .recommend {
    text-align: center;
    @include font($sz: $FONT_XS);
  }

  .button-wrapper {
    @include flexbox($jc: around);
    width: 100%;
  }
}
</style>
