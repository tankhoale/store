import { createStore } from 'vuex'
import { showSuccess, showError } from '../utils/globalFunctions'
import axios from 'axios'

import foodModule from './modules/food/index.js'
import cartModule from './modules/cart/index.js'
import navbarModule from './modules/nav/index.js'
import invoiceModule from './modules/invoice/index.js'
import employeeModule from './modules/Employee/index.js'
import scheduleModule from './modules/schedule/index.js'
import usersModule from './modules/users/index.js'
import trackingModule from './modules/tracking'
import bannerModule from './modules/banner/index.js'

const store = createStore({
  modules: {
    food: foodModule,
    cart: cartModule,
    nav: navbarModule,
    inv: invoiceModule,
    emp: employeeModule,
    schedule: scheduleModule,
    users: usersModule,
    track: trackingModule,
    bnr: bannerModule
  },
  state () {
    return {
      isLoggedIn: false,
      hasData: false,
      role: '',
      user: '',
      API_Url: 'https://dacntt2.onrender.com/api/',
      currentTable: 0,
      authAxios: null
      // isLoading: false,
      // error: null
    }
  },
  mutations: {
    setAuthAxios (state, axiosInstance) {
      state.authAxios = axiosInstance
    }
  },
  actions: {
    initializeAxios ({ commit }, userJwtToken) {
      const authAxios = axios.create({
        baseURL: 'https://dacntt2.onrender.com/api/',
        headers: {
          Authorization: `Bearer ${userJwtToken}`
        }
      })

      commit('setAuthAxios', authAxios)
    }
  }
  // mutations: {
  //   SET_LOADING (state, isLoading) {
  //     state.isLoading = isLoading
  //   },
  //   SET_ERROR (state, error) {
  //     state.error = error
  //   }
  // },
  // actions: {
  //   setLoading ({ commit }, isLoading) {
  //     commit('SET_LOADING', isLoading)
  //   },
  //   setError ({ commit }, error) {
  //     commit('SET_ERROR', error)
  //   }
  // }
  // mutations: {
  //   login(state) {
  //     state.isLoggedIn = true;
  //   },
  //   logout(state) {
  //     state.isLoggedIn = false;
  //   },
  // },
  // actions: {
  //   login(context) {
  //     context.commit('login')
  //   },
  //   logout(context) {
  //     context.commit('logout')
  //   }
  // },
  // getters: {
  //   isAuthenticated(state) {
  //     return state.isLoggedIn
  //   }
  // }
})

export default store
export { showSuccess, showError }
