<template>
  <div class="chat-list">
    <header class="header">
      <h1 class="title">채팅목록</h1>
      <button><i class="material-icons"> search </i></button>
    </header>
    <section class="contacts-wrapper">
      <h2 class="title">최근 연락처</h2>
      <ul class="contacts">
        <li class="contact">
          <div class="contact-profile">
            <img :src="defaultImg" alt="최근 연락처 프로필" />
          </div>
          <strong class="contact-name"
            >최근 연락한 사람인데요 닉네임 세줄</strong
          >
        </li>
        <li class="contact">
          <div class="contact-profile">
            <img :src="defaultImg" alt="최근 연락처 프로필" />
          </div>
          <strong class="contact-name">최근 연락한 사람입니다</strong>
        </li>
        <li class="contact">
          <div class="contact-profile">
            <img :src="defaultImg" alt="최근 연락처 프로필" />
          </div>
          <strong class="contact-name">최근 연락</strong>
        </li>
        <li class="contact">
          <div class="contact-profile">
            <img :src="defaultImg" alt="최근 연락처 프로필" />
          </div>
          <strong class="contact-name">최근 연락</strong>
        </li>
        <li class="contact">
          <div class="contact-profile">
            <img :src="defaultImg" alt="최근 연락처 프로필" />
          </div>
          <strong class="contact-name">최근 연락</strong>
        </li>
        <li class="contact">
          <div class="contact-profile">
            <img :src="defaultImg" alt="최근 연락처 프로필" />
          </div>
          <strong class="contact-name">최근 연락</strong>
        </li>
        <li class="contact">
          <div class="contact-profile">
            <img :src="defaultImg" alt="최근 연락처 프로필" />
          </div>
          <strong class="contact-name">최근 연락</strong>
        </li>
      </ul>
    </section>
    <section class="talk-wrapper">
      <h2 class="title">대화</h2>
      <p v-if="!conversations.length">대화 목록이 없습니다</p>
      <div v-else class="talks">
        <Card
          v-for="(conversation, index) in conversations"
          :key="index"
          class="card"
          v-bind="{ paddingVertical: '15px', paddingHorizontal: '10px' }"
        >
          <div class="left">
            <div class="talker-profile">
              <img :src="defaultImg" alt="대화 상대 프로필" />
            </div>
            <div class="talker-infos">
              <strong class="talker-name">토커</strong>
              <p class="talker-talk">하이</p>
              <!-- seen && backgroundColor 변화 -->
            </div>
          </div>
          <div class="right">
            <span class="uploadDate">오늘</span>
          </div>
        </Card>
        <Card
          class="card"
          v-bind="{ paddingVertical: '15px', paddingHorizontal: '10px' }"
        >
          <div class="left">
            <div class="talker-profile">
              <img :src="defaultImg" alt="대화 상대 프로필" />
            </div>
            <div class="talker-infos">
              <strong class="talker-name">토커</strong>
              <p class="talker-talk">하이</p>
              <!-- seen && backgroundColor 변화 -->
            </div>
          </div>
          <div class="right">
            <span class="uploadDate">오늘</span>
          </div>
        </Card>
        <Card
          class="card"
          v-bind="{ paddingVertical: '15px', paddingHorizontal: '10px' }"
        >
          <div class="left">
            <div class="talker-profile">
              <img :src="defaultImg" alt="대화 상대 프로필" />
            </div>
            <div class="talker-infos">
              <strong class="talker-name">토커</strong>
              <p class="talker-talk">하이</p>
              <!-- seen && backgroundColor 변화 -->
            </div>
          </div>
          <div class="right">
            <span class="uploadDate">오늘</span>
          </div>
        </Card>
        <Card
          class="card"
          v-bind="{ paddingVertical: '15px', paddingHorizontal: '10px' }"
        >
          <div class="left">
            <div class="talker-profile">
              <img :src="defaultImg" alt="대화 상대 프로필" />
            </div>
            <div class="talker-infos">
              <strong class="talker-name">토커</strong>
              <p class="talker-talk">하이</p>
              <!-- seen && backgroundColor 변화 -->
            </div>
          </div>
          <div class="right">
            <span class="uploadDate">오늘</span>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script>
import Card from '~/components/designs/Card.vue'
import { getConversations } from '~/api/chat'

export default {
  data() {
    return {
      conversations: [],
    }
  },
  created() {
    this.initConversations()
  },
  components: {
    Card,
  },
  computed: {
    defaultImg() {
      return require('~/assets/images/user-profile__default.svg')
    },
  },
  methods: {
    async initConversations() {
      try {
        const res = await getConversations()
        if (res.statusText !== 'OK') {
          console.log(res, 'getConversations')
          throw new Error('API를 가져올 수 없습니다')
        }
        this.conversations = res.data
      } catch (e) {
        console.log(e.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: $FONT_L;
}

.chat {
  &-list {
    max-width: 400px;
    height: calc(100vh - $LG_HEADER_HEIGHT);
    padding: $INNER_PADDING_VERTICAL $INNER_PADDING_HORIZONTAL;
    border: 1px solid $COLOR_BORDER;
    background: $COLOR_WHITE;
    overflow: hidden;

    .header {
      @include flexbox($jc: between);
      .title {
        @include font($sz: $FONT_XL);
        font-weight: 700;
      }
    }

    .contacts {
      @include flexbox($jc: start);
      overflow-x: auto;

      .contact {
        @include flexbox($jc: between);
        min-height: 87px;
        flex-direction: column;
        flex: 80px 1 0;

        &-name {
          @include ellipsis($line: 2);
          text-align: center;
          font-size: $FONT_S;
        }
      }
    }
    .talk-wrapper {
      height: 100%;
      overflow-y: auto;
      .talks {
        height: 100%;
      }

      .card {
        @include flexbox($jc: between);

        .left {
          @include flexbox;
        }
      }
    }
  }
}
</style>
