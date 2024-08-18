import axios from 'axios'
import { showSuccess, showError } from '../../index.js'

export default {
  namespaced: true,
  state () {
    return {
      trackings: [],
      fingerprints: []
    }
  },
  getters: {
    backendTracking (state) {
      return state.trackings
    },
    backendFingerprint (state) {
      return state.fingerprints
    },
    getEmployeeId: (state) => (id) => {
      const data = state.fingerprints.find(item => item._id === id)
      if (!data) {
        return null
      } else {
        return data.employeeId
      }
    },
    getFingerprintForEmployee: (state) => (id) => {
      const data = state.fingerprints.find(item => item._id === id)
      if (!data) {
        return 'Deleted'
      } else {
        return data.employeeId
      }
    }
  },
  mutations: {
    setTrackings (state, payload) {
      state.trackings = payload
    },
    setFingerprints (state, payload) {
      state.fingerprints = payload
    }
  },
  actions: {
    // Tracking
    async getTrackingData (context) {
      await axios.get(context.rootState.API_Url + 'attendances/getAllAttendances').then((response) => {
        const responseData = response.data
        context.commit('setTrackings', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postTracking (context, payload) {
      await context.rootState.authAxios.post('attendances/createAttendance', payload
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
    async updateTracking (context, payload) {
      await context.rootState.authAxios.put(`attendances/updateAttendance/${payload._id}`, payload
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
    async deleteTracking (context, payload) {
      await context.rootState.authAxios.delete(`attendances/deleteAttendance/${payload}`
      ).then(() => {
        showSuccess('Delete successfully')
      }).catch((error) => {
        if (error.response.data.error_message) {
          showError(error.response.data.error_message)
        } else {
          showError(error)
        }
      })
    },
    // Fingerprint
    async getFingerprintData (context) {
      await axios.get(context.rootState.API_Url + 'fingerprints/getAllFingerprints').then((response) => {
        const responseData = response.data
        context.commit('setFingerprints', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postFingerprint (context, payload) {
      await context.rootState.authAxios.post('fingerprints/createFingerprint', payload
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
    async updateFingerprint (context, payload) {
      await context.rootState.authAxios.put(`fingerprints/updateFingerprint/${payload._id}`, payload
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
    async deleteFingerprint (context, payload) {
      await context.rootState.authAxios.delete(`fingerprints/deleteFingerprint/${payload}`
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
    // Fingerprint Machine
  }
}
