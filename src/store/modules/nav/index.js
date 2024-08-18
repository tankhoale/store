import axios from 'axios'
import { showSuccess, showError } from '../../index.js'

export default {
  namespaced: true,
  state () {
    return {
      navbar: []
      // navbar: [
      //   {
      //     id: 1,
      //     name: 'Thực đơn',
      //     url: '/',
      //     routeName: '/',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 2,
      //     name: 'Cơm',
      //     url: 'rice',
      //     routeName: 'foodByCategory',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 3,
      //     name: 'Mỳ',
      //     url: 'noodle',
      //     routeName: 'foodByCategory',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 4,
      //     name: 'Nên thử',
      //     url: 'must-try',
      //     routeName: 'foodByCategory',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 5,
      //     name: 'Đồ uống',
      //     url: 'drinks',
      //     routeName: 'foodByCategory',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 6,
      //     name: 'Topping thêm',
      //     url: 'extra-topping',
      //     routeName: 'foodByCategory',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 7,
      //     name: 'Canh và Salad',
      //     url: 'soup-and-salad',
      //     routeName: 'foodByCategory',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 8,
      //     name: 'Menu',
      //     url: '/menu-img',
      //     routeName: '/menu-img',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   },
      //   {
      //     id: 9,
      //     name: 'Hóa Đơn Hằng ngày',
      //     url: '/daily-invoice',
      //     routeName: '/daily-invoice',
      //     isHidden: false,
      //     dateCreated: '10/06/2024'
      //   }
      // ]
    }
  },
  getters: {
    getNavbar (state) {
      return state.navbar
    },
    getNavbarForFrontend: (state) => (payload) => {
      console.log(state.navbar)
      if (payload === 1) {
        return state.navbar.filter(item => item.routeName === 'foodByCategory')
      }
      return state.navbar.filter(item => item.routeName !== 'foodByCategory')
    }
  },
  mutations: {
    setNavbar (state, payload) {
      state.navbar = payload
    }
  },
  actions: {
    async getNavbarData (context) {
      await axios.get(context.rootState.API_Url + 'foodMenus/getAllMenus').then((response) => {
        const responseData = response.data
        context.commit('setNavbar', responseData)
      }).catch((error) => {
        console.error('There was an error!', error)
      })
    },
    async postNavbar (context, payload) {
      await context.rootState.authAxios.post('foodMenus/createMenu', {
        menuName: payload.menuName,
        url: payload.url,
        isHidden: payload.isHidden,
        createdDate: payload.createdDate,
        routeName: payload.routeName
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
    async updateNavbar (context, payload) {
      await context.rootState.authAxios.put(`foodMenus/updateMenu/${payload._id}`, {
        menuName: payload.menuName,
        url: payload.url,
        isHidden: payload.isHidden,
        createdDate: payload.createdDate,
        routeName: payload.routeName
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
    async deleteNavbar (context, payload) {
      await context.rootState.authAxios.delete(`foodMenus/deleteMenu/${payload}`
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
