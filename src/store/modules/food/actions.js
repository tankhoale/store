import axios from 'axios'
import { showSuccess, showError } from '../../index.js'

export default {
  // Category
  async getCategoriesData (context) {
    await axios.get(context.rootState.API_Url + 'foodCategories/getAllCategories').then((response) => {
      const responseData = response.data
      context.commit('setCategories', responseData)
    }).catch((error) => {
      console.error('There was an error!', error)
    })
  },
  async postCategory (context, payload) {
    await context.rootState.authAxios.post('foodCategories/createCategory', {
      categoryName: payload.categoryName,
      url: payload.url,
      isHidden: payload.isHidden,
      createdDate: payload.createdDate
    }).then(() => {
      showSuccess('Add successfully')
    }).catch((error) => {
      if (error.response.data.error_message) {
        showError(error.response.data.error_message)
      } else {
        showError('An unexpected error occurred')
      }
    })
  },
  async updateCategory (context, payload) {
    await context.rootState.authAxios.put(`foodCategories/updateCategory/${payload._id}`, {
      categoryName: payload.categoryName,
      url: payload.url,
      isHidden: payload.isHidden,
      createdDate: payload.createdDate
    }).then(() => {
      showSuccess('Update successfully')
    }).catch((error) => {
      if (error.response.data.error_message) {
        showError(error.response.data.error_message)
      } else {
        showError('An unexpected error occurred')
      }
    })
  },
  async deteteCategory (context, payload) {
    await context.rootState.authAxios.delete(`foodCategories/deleteCategory/${payload}`
    ).then(() => {
      showSuccess('Delete successfully')
    }).catch((error) => {
      if (error.response.data.error_message) {
        showError(error.response.data.error_message)
      } else {
        showError('An unexpected error occurred')
      }
    })
  },
  // food
  async getFoodData (context) {
    await axios.get(context.rootState.API_Url + 'foods/getAllFoods').then((response) => {
      const responseData = response.data
      context.commit('setFood', responseData)
    }).catch((error) => {
      console.error('There was an error!', error)
    })
  },
  async postFood (context, payload) {
    await context.rootState.authAxios.post('foods/createFood', {
      name: payload.name,
      img: payload.img,
      price: payload.price,
      category: payload.category,
      detail: payload.detail,
      isHidden: payload.isHidden,
      createdDate: payload.createdDate
    }).then(() => {
      showSuccess('Add successfully')
    }).catch((error) => {
      if (error.response.data.error_message) {
        showError(error.response.data.error_message)
      } else {
        showError('An unexpected error occurred')
      }
    })
  },
  async updateFood (context, payload) {
    await context.rootState.authAxios.put(`foods/updateFood/${payload._id}`, {
      name: payload.name,
      img: payload.img,
      price: payload.price,
      category: payload.category,
      detail: payload.detail,
      isHidden: payload.isHidden,
      createdDate: payload.createdDate
    }).then(() => {
      showSuccess('Update successfully')
    }).catch((error) => {
      if (error.response.data.error_message) {
        showError(error.response.data.error_message)
      } else {
        showError('An unexpected error occurred')
      }
    })
  },
  async deteteFood (context, payload) {
    await context.rootState.authAxios.delete(`foods//deleteFood/${payload}`
    ).then(() => {
      showSuccess('Delete successfully')
    }).catch((error) => {
      if (error.response.data.error_message) {
        showError(error.response.data.error_message)
      } else {
        showError('An unexpected error occurred')
      }
    })
  }
}
