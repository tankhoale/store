import axios from 'axios'
import { showSuccess, showError } from '../../index.js'

export default {
  namespaced: true,
  state () {
    return {
      banners: []
    }
  },
  getters: {
    backendBanners (state) {
      return state.banners
    },
    getSlider (state) {
      const data = state.banners
        .filter(item => !item.isHidden)
        .map(item => ({ id: item._id, path: item.img }))
        .reverse()
      return data
    }
  },
  mutations: {
    setBanners (state, payload) {
      state.banners = payload
    }
  },
  actions: {
    async getBannerData (context) {
      await axios.get(context.rootState.API_Url + 'banners/getAllBanners').then((response) => {
        const responseData = response.data
        context.commit('setBanners', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postBanner (context, payload) {
      await context.rootState.authAxios.post('banners/createBanner', payload
      ).then(() => {
        showSuccess('Add successfully')
      }).catch((error) => {
        if (error.response.data.error_message) {
          showError(error.response.data.error_message)
        } else {
          showError('An unexpected error occurred')
        }
      })
    },
    async updateBanner (context, payload) {
      await context.rootState.authAxios.put(`banners/updateBanner/${payload._id}`, payload
      ).then(() => {
        showSuccess('Update successfully')
      }).catch((error) => {
        if (error.response.data.error_message) {
          showError(error.response.data.error_message)
        } else {
          showError('An unexpected error occurred')
        }
      })
    },
    async deleteBanner (context, payload) {
      await context.rootState.authAxios.delete(`banners/deleteBanner/${payload}`
      ).then(() => {
        showSuccess('Delete successfully')
      }).catch((error) => {
        if (error.response.data.error_message) {
          showError(error.response.data.error_message)
        } else {
          showError(error)
        }
      })
    }
  }
}
