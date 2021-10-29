export default {
  namespaced: true,
  state() {
    return {
      cityList: [],
      countyList: [],
      searchedCityInfo: {}, // 시
      searchedCountyInfo: {}, // 군
      userCity: '',
      userCounty: '',
      detailAddress: '',
      searchChannelId: '',
      postListData: [],
    }
  },
  getters: {
    getUserCity(state) {
      return state.userCity
    },
    getUserCounty(state) {
      return state.userCounty
    },
    getSearchChannelId(state) {
      return state.searchChannelId
    },
    getdetailAddress(state) {
      return state.detailAddress
    },
    getPostListData(state) {
      return state.postListData
    },
  },
  mutations: {
    // updateSearchedAddress(state, searchedAddress) {
    //   state.searchedCityInfo = searchedAddress.userCity
    //   state.searchedCountyInfo = searchedAddress.userCounty
    // },
    setUserCity(state, userCity) {
      state.userCity = userCity
    },
    setUserCounty(state, userCounty) {
      state.userCounty = userCounty
    },
    setSearchChannelId(state, searchChannelId) {
      state.searchChannelId = searchChannelId
    },
    setdetailAddress(state, detailAddress) {
      state.detailAddress = detailAddress
    },
    setPostListData(state, postListData) {
      state.postListData = postListData
    },
  },
  actions: {
    // remote 서버에 시 군/구 미리 업데이트하는 로직.
    // 완벽하지 않으며, 채널과 군/구는 이미 셋업 돼있으므로, 더이상 사용할 이유가 없음.
    // async initialCityFetch({ state, dispatch }) {
    //   try {
    //     const res = await $fetch(API_ENDPOINT_OF_AREAINFO)
    //     const infoOfCity = res.response.body
    //     const totalNumOfPage = Math.ceil(
    //       infoOfCity.totalCount / infoOfCity.numOfRows,
    //     )
    //     for (let pageNum = 1; pageNum <= totalNumOfPage; pageNum += 1) {
    //       const res = await $fetch(
    //         API_ENDPOINT_OF_AREAINFO + `&pageNo=${pageNum}`,
    //       )
    //       const cityList = res.response.body.items.item
    //       state.cityList.push(...cityList)
    //     }
    //     state.cityList.forEach(async city => {
    //       await dispatch('fetchCounty', city)
    //     })
    //   } catch (e) {
    //     console.log('initialCityFetch 에러')
    //   }
    // },
    // async fetchCounty({ state, dispatch }, city) {
    //   try {
    //     const res = await $fetch(
    //       API_ENDPOINT_OF_AREAINFO + `&areaCode=${city.code}`,
    //     )
    //     const infoOfCounty = res.response.body
    //     const totalNumOfPage = Math.ceil(
    //       infoOfCounty.totalCount / infoOfCounty.numOfRows,
    //     )
    //     for (let pageNum = 1; pageNum <= totalNumOfPage; pageNum += 1) {
    //       const res = await $fetch(
    //         API_ENDPOINT_OF_AREAINFO +
    //           `&areaCode=${city.code}&pageNo=${pageNum}`,
    //       )
    //       const countyList = res.response.body.items.item
    //       for (let i = 0; i < countyList.length; i++) {
    //         countyList[i] = countyList[i].name
    //       }
    //       Array.isArray(countyList)
    //         ? state.countyList.push(...countyList)
    //         : state.countyList.push(countyList.name)
    //     }
    //     await dispatch('makeChannel', city.name)
    //   } catch (e) {
    //     console.log('fetchCounty 에러')
    //   }
    // },
    // async makeChannel({ state }, cityName) {
    //   try {
    //     const description = state.countyList.join('/')
    //     state.countyList = []
    //     const makeChannel = await $fetch(
    //       API_ENDPOINT_OF_DEVCOURSE + 'channels/create',
    //       {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           name: cityName + 'b',
    //           description: '',
    //         }),
    //       },
    //     )
    //   } catch (e) {
    //     console.log('makeChannel 에러')
    //   }
    // },
  },
}
