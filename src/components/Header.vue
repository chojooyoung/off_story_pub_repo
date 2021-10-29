<template>
  <div class="wrapper">
    <div class="left">
      <img
        @click="$router.push('/')"
        src="../assets/images/symbol.svg"
        alt="OffStory 심볼"
      />
      <button class="logo" @click="$router.push('/')">OffStory</button>
    </div>
    <div class="middle">
      <!-- <form @submit.prevent="">
        <input
          :value="userAddress"
          placeholder="'서울 강남'을 입력해 보세요"
          ref="input"
          @keyup.enter="parseAddress"
        />
        <button><i class="material-icons"> search </i></button>
      </form> -->
      <!-- <div class="search-Title">어디서 만날까요?</div> -->
      <br />
      <div class="search-address">
        <form
          @submit.prevent="searchPost"
          @submit="$router.push('/ResultOfPostList')"
        >
          <select
            @change="selectedCity($event)"
            @change.prevent="initSelectcounty"
            class="selectcity"
          >
            <option value="undefined" class="option">시</option>
            <option
              class="citylist"
              :key="i"
              :value="city"
              v-for="(city, i) in cityList"
            >
              {{ city }}
            </option>
          </select>
          <select @change="selectedCounty($event)" class="selectcounty">
            <option value="undefined" class="option">군,구</option>
            <option
              class="countylist"
              :key="i"
              :value="data.name"
              v-for="(data, i) in countyListForSelect"
            >
              {{ data }}
            </option>
          </select>
          <input
            class="search-detail"
            v-model="detailAdress"
            placeholder="상세주소 입력"
            @keyup.enter="searchPost"
          />
          <button aria-label="검색 버튼">
            <i class="material-icons"> search </i>
          </button>
        </form>
      </div>
    </div>
    <div class="right">
      <template v-if="isLogin">
        <button aria-label="검색 버튼">
          <i class="material-icons"> search </i>
        </button>
        <button aria-label="글쓰기 버튼">
          <i class="material-icons"> edit </i>
        </button>
        <button aria-label="채팅 버튼">
          <i class="material-icons"> question_answer </i>
        </button>
        <button aria-label="알림 버튼">
          <i class="material-icons"> notifications </i>
        </button>

        <template v-if="getUserProfileImage === `undefined`">
          <button @click="toggleSidebar">
            <img class="default-image" :src="this.defaultImageUrl" />
          </button>
        </template>
        <template v-else>
          <button @click="toggleSidebar">
            <img class="userprofile-image" :src="getUserProfileImage" />
          </button>
        </template>
      </template>
      <template v-else>
        <Button
          width="100px"
          fontSize="25px"
          aria-label="로그인 버튼"
          @click="$router.push('/login')"
          :style="{
            display: 'block',
          }"
        >
          Login
        </Button>
      </template>
    </div>
  </div>
</template>

<script>
import { channelsList, channelPostList } from '../api/index'
import { mapState, mapGetters, mapMutations } from 'vuex'
import Button from '~/components/designs/Button'
import { getImageFromCookie } from '~/utils/cookies'

export default {
  data() {
    return {
      defaultImageUrl: require('../assets/images/user-profile__default.svg'),
      userImage: null,
      detailAdress: '',
      countyList: [],
      countyListForSelect: [],
      selectuserCity: '',
      selectuserCounty: '',
      CountydataList: [],
      cityList: [
        '서울',
        '경기도',
        '세종특별자치시',
        '인천',
        '강원도',
        '대전',
        '충청북도',
        '충청남도',
        '경상북도',
        '경상남도',
        '부산',
        '대구',
        '울산',
        '전라북도',
        '전라남도',
        '광주',
        '제주도',
      ],
    }
  },
  props: {
    isSidebarShowed: {
      type: Boolean,
      defaultValue: false,
    },
  },
  components: {
    Button,
  },
  computed: {
    ...mapState('address', ['cityList', 'countyList']),

    ...mapGetters('Login', [
      'isLogin',
      'isEmptyProfileImage',
      'getUserProfileImage',
    ]),
    getUserProfileImage() {
      const profileImage = getImageFromCookie()
      console.log(profileImage)
      return profileImage
    },
  },
  methods: {
    ...mapMutations('address', [
      'setUserCity',
      'setUserCounty',
      'setSearchChannelId',
      'setdetailAddress',
      'setPostListData',
    ]),

    async parseAddress() {
      // const userCity = this.cityList.find(city =>
      //   this.$refs.input.value.includes(city.name),
      // )
      // await this.fetchCounty(userCity.code)
      // const userCounty = this.countyList.find(county => {
      //   const countyNameWithoutGu = county.name.replace(/구$/, '')
      //   return this.$refs.input.value.includes(countyNameWithoutGu)
      // })
      // //for debug
      // console.log('userCounty', userCounty)
      // this.updateSearchedAddress({ userCity, userCounty })
      // this.$refs.input.value = ''
      const userInputAdress = this.$refs.input.value
      userInputAdress.split(' ')
    },

    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
    async selectedCity(event) {
      console.log(event.target.value)
      this.selectuserCity = event.target.value
      if (this.selectuserCity === 'undefined') {
        this.selectuserCity = ''
      }
      const userCity = event.target.value //선택한 도시 넘겨줌
      let target = document.getElementsByClassName('selectcounty')[0]
      console.log(target.value)
      target.value = undefined
      this.setUserCounty('')
      const channelsListData = await channelsList() //채널리스트를 불러옴

      //선택한 city와 같은 name의 채널을 찾음
      const selectChannelData = channelsListData.data.filter(x => {
        return x.name === `${userCity}b`
      })

      //찾은 채널의 description을 기반으로 문자열 처리해주어 군/구 데이터 뽑아내기
      const countyListBeta = selectChannelData.map(x => x.description)
      const countyList = countyListBeta[0].split('/')
      console.log(countyList)
      this.countyListForSelect = countyList

      //선택된 채널 id를 할당
      const selectChannelId = selectChannelData.map(x => x._id) //채널의 id
      console.log(selectChannelId)
      this.channelId = selectChannelId
      this.setSearchChannelId(this.channelId)
      this.setUserCity(this.selectuserCity)
    },
    initSelectcounty(event) {
      if (event) {
        let target = document.getElementsByClassName('selectcounty')[0]
        this.selectuserCounty = ''
        target.value = undefined
        this.setUserCounty('')
        console.log('도시선택했을때 구', this.setUserCounty)
        console.log(this.selectuserCounty)
      }
    },
    selectedCounty(event) {
      let valueCheck = event.target.value
      console.log(valueCheck)
      if (valueCheck === 'undefined') {
        this.selectuserCounty = ''
        this.setUserCounty('')
        return
      } else {
        this.selectuserCounty = event.target.value
        this.setUserCounty(this.selectuserCounty)
      }
    },
    async searchPost() {
      console.log(this.detailAdress)
      this.setdetailAddress(this.detailAdress)
      const postListdata = await channelPostList(this.channelId)
      // if (this.selectuserCounty === undefined) {
      //   console.log('시만 선택 했을때', postListdata.data)
      //   this.setPostListData(this.postListdata.data)
      //   this.$router.push('/ResultOfPostList')
      // } else {
      this.CountydataList = []
      console.log(postListdata.data)
      console.log('county', this.selectuserCounty)
      const filteredDataOfCounty = postListdata.data.map(x =>
        x.location.includes(`/${this.selectuserCounty}`),
      )

      for (let i in filteredDataOfCounty) {
        if (filteredDataOfCounty[i]) {
          this.CountydataList.push(postListdata.data[i])
        }
      }
      console.log('군까지 선택했을때', this.CountydataList)
      console.log(filteredDataOfCounty)
      this.setPostListData(this.CountydataList)
      this.$router.push('/ResultOfPostList')
      // }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';

.wrapper {
  position: fixed;
  width: 100%;
  height: $LG_HEADER_HEIGHT;
  border-bottom: 0.05px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;

    img {
      cursor: pointer;
    }

    .logo {
      font-size: 35px;
      font-weight: 700;
      color: $KEY_COLOR;
      margin-left: 20px;
    }
  }

  .middle {
    display: flex;
    justify-content: center;
    margin-right: -20px;
    .search-address {
      form {
        position: relative;
        display: flex;
        align-items: center;

        select {
          @include font;
          width: 150px;
          padding: 0px;
          margin: 5px;
          padding: $INNER_PADDING_VERTICAL $INNER_PADDING_HORIZONTAL;
          border-radius: $BORDER_RADIOUS;
          border: 1px solid $COLOR_GRAY_DARKEN;
          font-weight: 700;
          color: $COLOR_GRAY_DARKEN;
          .citylist {
            color: $COLOR_GRAY_DARKEN;
          }
          .countylist {
            color: $COLOR_GRAY_DARKEN;
          }

          &::placeholder {
            font-weight: 700;
            color: $COLOR_GRAY_DARKEN;
          }
        }
        input {
          @include font;
          width: 200px;
          height: 52px;
          margin: 5px;
          padding: $INNER_PADDING_VERTICAL $INNER_PADDING_HORIZONTAL;
          border-radius: $BORDER_RADIOUS;
          border: 1px solid $COLOR_GRAY_DARKEN;

          &::placeholder {
            font-weight: 700;
            color: $COLOR_GRAY_LIGHTEN;
          }
        }

        // input {
        //   width: 10%;
        //   padding: 13px;
        //   font-size: 20px;
        //   border: 1px solid darken($KEY_COLOR, 0%);
        //   border-radius: 25px;
        //   &:focus {
        //     border-color: darken($KEY_COLOR, 10%);
        //   }
        // }

        button {
          position: absolute;
          right: 10px;
          z-index: 1;

          i {
            color: darken($KEY_COLOR, 0%);
            font-size: 35px;
          }
        }
      }
    }
  }

  .right {
    margin-right: 25px;

    button {
      margin-left: 25px;

      .userprofile-image {
        width: 35px;
        height: 35px;
        border-radius: 30px;
      }
      i {
        font-size: 35px;
        color: darken($KEY_COLOR, 0%);
        &:hover {
          color: darken($KEY_COLOR, 30%);
        }
      }
    }

    button:first-child {
      display: none;
    }

    .profile-image {
      width: 35px;
      height: 35p;
      border-radius: 50%;
      border: 1px solid $KEY_COLOR;
    }
  }

  @media (max-width: 1095px) {
    .logo {
      display: none;
    }
  }

  @media (max-width: 885px) {
    .middle {
      display: none;
    }
    .right button:first-child {
      display: inline;
      color: red;
    }
  }
}
</style>
