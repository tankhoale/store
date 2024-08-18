import axios from 'axios'
import { showSuccess, showError } from '../../index.js'

export default {
  namespaced: true,
  state () {
    return {
      schedules: [
        {
          id: 1,
          dateOfWeek: 'monday',
          hours: '8-12:30',
          employeeId: 1,
          employeeName: 'Khoa',
          pd: 1
        },
        {
          id: 2,
          dateOfWeek: 'monday',
          hours: '12:30-17:00',
          employeeId: 2,
          employeeName: 'Huy',
          pd: 1
        },
        {
          id: 3,
          dateOfWeek: 'tuesday',
          hours: '8-12:30',
          employeeId: 3,
          employeeName: 'Hao',
          pd: 1
        },
        {
          id: 4,
          dateOfWeek: 'wednesday',
          hours: '12:30-17:00',
          employeeId: 4,
          employeeName: 'Dung',
          pd: 2
        },
        {
          id: 5,
          dateOfWeek: 'friday',
          hours: '8-12:30',
          employeeId: 5,
          employeeName: 'Haozsw',
          pd: 2
        },
        {
          id: 6,
          dateOfWeek: 'sunday',
          hours: '17:00-21:30',
          employeeId: 4,
          employeeName: 'sss',
          pd: 2
        }
      ],
      shiftSchedules: [],
      datePeriods: []
    }
  },
  getters: {
    getSchedules (state) {
      return state.schedules
    },
    getSchedulesByShift: (state) => (shift) => {
      return state.shiftSchedules.filter(item => item.hours === shift)
    },
    backendSchedules (state) {
      return state.shiftSchedules
    },
    backendDatePeriods (state) {
      return state.datePeriods.slice().reverse()
    },
    getTopDatePeriods (state) {
      return state.datePeriods.slice(-3)
    },
    showDatePeriod: (state) => (id) => {
      const data = state.datePeriods.find(item => item._id === id)
      return data.startDate + ' - ' + data.endDate
    }
  },
  mutations: {
    setSchedules (state, payload) {
      state.shiftSchedules = payload
    },
    setDatePeriods (state, payload) {
      state.datePeriods = payload
    }
  },
  actions: {
    // Schedules
    async getSchedulesData (context) {
      await axios.get(context.rootState.API_Url + 'shifts/getAllShifts').then((response) => {
        const responseData = response.data
        context.commit('setSchedules', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postSchedules (context, payload) {
      await context.rootState.authAxios.post('shifts/createShift', payload
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
    async updateSchedules (context, payload) {
      await context.rootState.authAxios.put(`shifts/updateShift/${payload.id}`, payload
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
    async deleteSchedules (context, payload) {
      await context.rootState.authAxios.delete(`shifts/deleteShift/${payload}`
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
    // Date Periods
    async getDatePeriodData (context) {
      await axios.get(context.rootState.API_Url + 'datePeriods/getAllDatePeriods').then((response) => {
        const responseData = response.data
        context.commit('setDatePeriods', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postDatePeriod (context, payload) {
      await context.rootState.authAxios.post('datePeriods/createDatePeriod', payload
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
    async updateDatePeriod (context, payload) {
      await context.rootState.authAxios.put(`datePeriods/updateDatePeriod/${payload._id}`, payload
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
    async deleteDatePeriod (context, payload) {
      await context.rootState.authAxios.delete(`datePeriods/deleteDatePeriod/${payload}`
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
