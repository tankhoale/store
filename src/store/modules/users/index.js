import { showSuccess, showError } from '../../index.js'

export default {
  namespaced: true,
  state () {
    return {
      users: []
    }
  },
  getters: {
    getUsers (state) {
      return state.users
    },
    getUserByShift: (state) => (shift) => {
      return state.users.filter(item => item.hours === shift)
    },
    backendUser (state) {
      return state.users
    }
  },
  mutations: {
    setUsers (state, payload) {
      state.users = payload
    }
  },
  actions: {
    async getUserData (context) {
      await context.rootState.authAxios.get('user/getAllUsers').then((response) => {
        const responseData = response.data
        context.commit('setUsers', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postUser (context, payload) {
      await context.rootState.authAxios.post('register', payload
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
    async updateUser (context, payload) {
      await context.rootState.authAxios.put(`user/updateUser/${payload._id}`, payload
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
    async deleteUser (context, payload) {
      await context.rootState.authAxios.delete(`user/deleteUser/${payload}`
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
