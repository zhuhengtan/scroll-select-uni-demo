import Vue from 'vue'
import Vuex from 'vuex'
import commonJS from '@/common/common'
import request from '@/network/index'

Vue.use(Vuex)

// 详情页有点赞或者阅读需要更新列表数据的
const needUpdatePostList = ['homePostList', 'gamePostList', 'competitionHomepageNewsList', 'postList']

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    userInfo: {},
    token: '',

    // 下面四个数据存在store是为了在详情页点赞、取消点赞操作之后更新列表页数据的操作
    homePostList: [],
    gamePostList: [],
    postList: [],

    haveNewMessage: false,
    bannerList: [],

    indexEntranceList: [],
    gameEntranceList: [],

    competitionHomepageNewsList: [],
    competitionNewsList: [],
  },
  mutations: {
    updateToken(state, provider) {
      state.token = provider
    },
    login(state, provider) {
      state.hasLogin = true
      state.userInfo = provider
      commonJS.setUserInfo(provider)
    },
    logout(state) {
      state.hasLogin = false
      state.userInfo = {}
      state.token = ''
      commonJS.removeToken()
      commonJS.removeUserInfo()
    },
    updateUserInfo(state, provider) {
      state.userInfo = provider
      commonJS.setUserInfo(provider)
    },

    // 以下更新列表信息方法，provider均采用{ name:"",data/post_id:"",is_liked:true/false }结构
    updateList(state, provider) {
      state[provider.name] = provider.data
    },

    updateListLikeCount(state, provider) {
      needUpdatePostList.forEach((listName) => {
        let likeIndex = 0
        const needChange = state[listName].some((item, index) => { // 存在这个帖子才更新
          if (parseInt(item.post_id, 10) === parseInt(provider.post_id, 10)) {
            likeIndex = index
            return true
          }
          return false
        })
        if (needChange) {
          state[listName][likeIndex].like_count = provider.like_count
          state[listName][likeIndex].is_liked = provider.is_liked
        }
      })
    },
    addListReadCount(state, provider) {
      needUpdatePostList.forEach((listName) => {
        let readIndex = 0
        const needChange = state[listName].some((item, index) => {
          if (parseInt(item.post_id, 10) === parseInt(provider.post_id, 10)) {
            readIndex = index
            return true
          }
          return false
        })
        if (needChange) state[listName][readIndex].read_count++
      })
    },

    SET_BANNER_LIST(state, provider) {
      state.bannerList = provider
    },

    SET_HAVE_NEW_MESSAGE(state, provider) {
      state.haveNewMessage = provider
    },

    SET_INDEX_ENTRANCE_LIST(state, provider) {
      state.indexEntranceList = provider
    },
    SET_GAME_ENTRANCE_LIST(state, provider) {
      state.gameEntranceList = provider
    },

    SET_COMPETITION_HOMEPAGE_NEWS_LIST(state, provider) {
      state.competitionHomepageNewsList = provider
    },
  },
  actions: {
    async getHaveNewMessage({ commit }, params) {
      const res = await request.getHaveNewMessage(null, { showToast: false })
      commit('SET_HAVE_NEW_MESSAGE', res.data.have_new_message)
    },

    async getEntranceList({ commit }, gameCode) {
      const prefix = commonJS.STORAGE_PREFIX()
      try {
        const localDataList = uni.getStorageSync(`${prefix}ENTRANCE_LIST_${gameCode}`)
        let dataList = []
        if (localDataList) {
          dataList = localDataList
        } else {
          const res = await request.getEntrances({ game_code: gameCode })
          if (!res) {
            return false
          }
          dataList = res.data
          uni.setStorageSync(`${prefix}ENTRANCE_LIST_${gameCode}`, dataList)
          const localGameCodeList = uni.getStorageSync(`${prefix}LOCAL_GAME_CODES`) || []
          if (localGameCodeList.indexOf(gameCode) === -1) {
            localGameCodeList.push(gameCode)
          }
          uni.setStorageSync(`${prefix}LOCAL_GAME_CODES`, localGameCodeList)
        }
        if (gameCode === 'index') {
          commit('SET_INDEX_ENTRANCE_LIST', dataList)
        } else {
          commit('SET_GAME_ENTRANCE_LIST', dataList)
        }
        return true
      } catch (err) {
        return false
      }
    },

    async updateLocalEntranceList({ commit }, data) {
      const prefix = commonJS.STORAGE_PREFIX()
      const localGameCodeList = uni.getStorageSync(`${prefix}LOCAL_GAME_CODES`) || []
      if (localGameCodeList.length === 0) return
      localGameCodeList.forEach(async (gameCode) => {
        const res = await request.getEntrances({ game_code: gameCode })
        uni.setStorageSync(`${prefix}ENTRANCE_LIST_${gameCode}`, res.data)
        if (gameCode === 'index') {
          commit('SET_INDEX_ENTRANCE_LIST', res.data)
        } else {
          commit('SET_GAME_ENTRANCE_LIST', res.data)
        }
      })
    },

    async getCompetitionHomepageNews({ commit }, data) {
      try {
        const res = await request.getPostList({
          page_size: 2,
          current_page: 1,
          display_part: 5,
        })
        commit('SET_COMPETITION_HOMEPAGE_NEWS_LIST', res.data.topics)
      } catch (e) {
        return false
      }
    },
  },
})
export default store
