import axios from 'axios'
import { showSuccess, showError } from '../../index.js'

export default {
  namespaced: true,
  state () {
    return {
      invoices: []
    }
  },
  getters: {
    getInvoice (state) {
      return state.invoices
    },
    getInvoicesToday (state) {
      const today = new Date().toISOString().split('T')[0] // Lấy ngày hôm nay dưới dạng YYYY-MM-DD

      // Hàm chuyển đổi định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD
      function convertDateFormat (date) {
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
      }

      return state.invoices.filter(invoice => {
        const invoiceDate = convertDateFormat(invoice.date)
        console.log('nay')
        console.log(invoiceDate)
        console.log('nay ne')
        console.log(today)
        return invoiceDate === today
      })
    }
  },
  mutations: {
    setInvoices (state, payload) {
      state.invoices = payload
    }
  },
  actions: {
    async getInvoiceData (context) {
      await axios.get(context.rootState.API_Url + 'invoice/getAllInvoices').then((response) => {
        const responseData = response.data
        context.commit('setInvoices', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postInvoice (context, payload) {
      await axios.post(context.rootState.API_Url + 'invoice/createInvoice', {
        items: payload.items,
        date: payload.date,
        time: payload.time,
        subtotal: payload.subtotal,
        discount: payload.discount,
        total: payload.total
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
    async updateInvoice (context, payload) {
      await context.rootState.authAxios.put(`invoice/updateInvoiceDateTime/${payload._id}`, {
        date: payload.date,
        time: payload.time
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
    async deteteInvoice (context, payload) {
      await context.rootState.authAxios.delete(`invoice/deleteInvoiceById/${payload}`
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
}
