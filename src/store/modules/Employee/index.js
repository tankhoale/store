import axios from 'axios'
import { showSuccess, showError } from '../../index.js'

export default {
  namespaced: true,
  state () {
    return {
      employees: [],
      roles: []
    }
  },
  getters: {
    getEmployees (state) {
      return state.employees
    },
    getRoles (state) {
      return state.roles
    },
    getRoleForEmployee (state) {
      return state.roles.map(item => ({
        _id: item._id,
        name: item.name
      }))
    },
    getNameById: (state) => (id) => {
      return state.employees.find(item => item._id === id).name
    },
    getEmployeeForSchedules (state) {
      return state.employees.map(item => ({
        _id: item._id,
        name: item.name
      }))
    },
    getRoleName: (state) => (id) => {
      return state.roles.find(item => item._id === id).name
    }
  },
  mutations: {
    setEmployees (state, payload) {
      state.employees = payload
    },
    setRoles (state, payload) {
      state.roles = payload
    }
  },
  actions: {
    // Employee
    async getEmployeeData (context) {
      await axios.get(context.rootState.API_Url + 'employees/getAllEmployees').then((response) => {
        const responseData = response.data
        context.commit('setEmployees', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postEmployee (context, payload) {
      await context.rootState.authAxios.post('employees/createEmployee', {
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        address: payload.address,
        dateOfBirth: payload.dateOfBirth,
        roleId: payload.roleId,
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
    async updateEmployee (context, payload) {
      await context.rootState.authAxios.put(`employees/updateEmployee/${payload._id}`, {
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        address: payload.address,
        dateOfBirth: payload.dateOfBirth,
        roleId: payload.roleId,
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
    async deteteEmployee (context, payload) {
      await context.rootState.authAxios.delete(`employees/deleteEmployee/${payload}`
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

    // Role
    async getRoleData (context) {
      await context.rootState.authAxios.get('roles/getAllRoles').then((response) => {
        const responseData = response.data
        context.commit('setRoles', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postRole (context, payload) {
      await context.rootState.authAxios.post('roles/createRole', payload
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
    async updateRole (context, payload) {
      await context.rootState.authAxios.put(`roles/updateRole/${payload._id}`, payload
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
    async deleteRole (context, payload) {
      await context.rootState.authAxios.delete(`roles/deleteRole/${payload}`
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
