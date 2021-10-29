<template>
  <div class="chat-room">
    <header class="header">
      <div class="back">
        <button><i class="material-icons"> arrow_back </i></button>
      </div>
      <h1 class="sender-name">대화 상대 이름</h1>
      <div>아무거나</div>
    </header>
    {{ receivedMessage }}
    <ul class="messages">
      <li class="message-item">
        <div class="sender-infos">
          <div class="sender-profile">
            <img :src="defaultImg" alt="톡 상대 프로필" />
          </div>
          <strong class="sender-name">토커</strong>
        </div>
        <textarea
          @keyup.enter.exact="sendMessage($event)"
          @keyup="resize($event)"
          placeholder="메세지를 입력하세요"
          v-model="message"
        ></textarea>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserIdToCookie, getAuthFromCookie } from '~/utils/cookies'
import { createMessage } from '~/api/chat'
import { io } from 'socket.io-client'
import { API_ENDPOINT_OF_DEVCOURSE } from '~/utils/variables'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      token: getAuthFromCookie(),
      socket: null,
      message: '',
      receivedMessage: [],
    }
  },
  computed: {
    defaultImg() {
      return require('~/assets/images/user-profile__default.svg')
    },
  },
  methods: {
    resize(event) {
      event.target.style.height = '1px'
      event.target.style.height = 20 + event.target.scrollHeight + 'px'
    },
    async sendMessage(event) {
      // 서버로 메세지를 보냄
      const messageInfo = {
        message: event.target.value,
        _id: '61728b92cd64fa348cdac40b', // ghkdvnfld345@naver.com
      }

      const res = await this.socket.emit('CREATE_MESSAGE', messageInfo)
      console.log(res)
      // try {
      //   const res = await createMessage(messageInfo)
      //   if (res.statusText !== 'OK') {
      //     console.log(res, 'getConversations')
      //     throw new Error('API를 가져올 수 없습니다')
      //   }
      //   console.log(res, 'createMessageAPI')
      // } catch (e) {
      //   console.log(e.message)
      // }
      event.target.value = ''
    },
  },
  mounted() {
    console.log(this.token, 'token value')
    this.socket = io(`${API_ENDPOINT_OF_DEVCOURSE}`, {
      transports: ['websocket'],
      withCredentials: true,
      auth: {
        token: this.token,
      },
    })

    this.socket.on('connect', socket => {
      // FIXME: 작동안함
      console.log(socket.connected, '연결성공')
    })
    console.log(this.socket, 'after connecting')

    this.socket.on('SEND_MESSAGE', messages => {
      // FIXME: 작동안함
      console.log(messages, 'received')
      this.receivedMessage = messages
    })

    this.socket.on('unauthorized', err => {
      // FIXME: 작동안함
      console.log(err)
    })
  },
  beforeUnmount() {
    const res = this.socket.on('disconnect', () => {
      console.log('socket disconnected')
    })
    console.log(res, 'disconnected')
  },
}
</script>

<style lang="scss" scoped>
textarea {
  @include font;
  width: 400px;
  max-width: 400px;
  min-height: 80px;
  border-radius: $BORDER_RADIOUS;
  background-color: rgba($COLOR_BORDER, $OPACITY);
  border: none;
  resize: none;
  box-shadow: $BUTTON_BOX_SHADOW;
  padding: $INNER_PADDING_SMALL;
}
.chat-room {
  flex-grow: 1;

  .header {
    @include flexbox($jc: between);
    height: $LG_HEADER_HEIGHT;

    .sender-name {
      font-size: $FONT_L;
      font-weight: 700;
    }
  }
  .messages {
    .message-item {
      @include flexbox($jc: start, $ai: start);
    }
    .sender {
      &-infos {
        @include flexbox($ai: start);
        flex-direction: column;
        margin-right: $LG_PADDING_HORIZONTAL;
      }

      &-name {
        width: 100%;
        font-weight: 400;
        text-align: center;
      }
    }
  }
}
</style>
