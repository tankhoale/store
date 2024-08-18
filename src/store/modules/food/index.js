import actions from './actions.js'

export default {
  namespaced: true,
  state () {
    return {
      categories: [],
      food: []
    }
  },
  getters: {
    getFood (state) {
      return state.food
    },
    getCategoryId: (state) => (url) => {
      console.log(state.categories)
      console.log(url)
      const data = state.categories.find(item => item.url === url)
      console.log('hi')
      console.log(data)
      return data._id
    },
    getFoodByCategory: (state, getters) => (url) => {
      const categoryId = getters.getCategoryId(url)
      return state.food.filter(item => item.category === categoryId)
    },
    // backend
    showCategory: (state) => (id) => {
      return state.categories.find(item => item._id === id).categoryName
    },
    getCategories (state) {
      return state.categories
    },
    selectCategory (state) {
      return state.categories.map(item => ({
        _id: item._id,
        categoryName: item.categoryName
      }))
    }
  },
  mutations: {
    setCategories (state, payload) {
      state.categories = payload
    },
    setFood (state, payload) {
      state.food = payload
    }
  },
  actions
}
