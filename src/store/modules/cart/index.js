
export default {
  namespaced: true,
  state () {
    return {
      items: [],
      total: 0,
      quantity: 0,
      desk: [
        {
          id: 1,
          item: [],
          total: 0,
          quantity: 0
        },
        {
          id: 2,
          item: [],
          total: 0,
          quantity: 0
        },
        {
          id: 3,
          item: [],
          total: 0,
          quantity: 0
        },
        {
          id: 4,
          item: [],
          total: 0,
          quantity: 0
        },
        {
          id: 5,
          item: [],
          total: 0,
          quantity: 0
        },
        {
          id: 6,
          item: [],
          total: 0,
          quantity: 0
        }
      ]
    }
  },
  mutations: {
    addProductToCart (state, payload) {
      const productData = payload
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === productData.id
      )

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].quantity++
        state.items[productInCartIndex].sum += productData.price
      } else {
        const newItem = {
          productId: productData.id,
          name: productData.name,
          image: productData.image,
          price: productData.price,
          sum: productData.price,
          quantity: 1
        }
        state.items.push(newItem)
      }
      state.quantity++
      state.total += productData.price
    },

    removeProductFromCart (state, payload) {
      const prodId = payload.productId
      const productInCartIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      )
      const prodData = state.items[productInCartIndex]
      state.items.splice(productInCartIndex, 1)
      state.quantity -= prodData.quantity
      state.total -= prodData.price * prodData.quantity
    },

    updateCartFromDesk (state, payload) {
      const deskId = payload.deskId
      const deskData = state.desk.find((d) => d.id === deskId)

      if (deskData) {
        state.items = [...deskData.item]
        state.total = deskData.total
        state.quantity = deskData.quantity
      }
    },

    saveCartToDesk (state, payload) {
      const deskId = payload.deskId
      const deskIndex = state.desk.findIndex((d) => d.id === deskId)

      if (deskIndex >= 0) {
        state.desk[deskIndex].item = [...state.items]
        state.desk[deskIndex].total = state.total
        state.desk[deskIndex].quantity = state.quantity
      }
    },

    resetCartByDeskId (state, payload) {
      const deskId = payload
      const deskIndex = state.desk.findIndex((d) => d.id === deskId)

      if (deskIndex >= 0) {
        state.desk[deskIndex].item = []
        state.desk[deskIndex].total = 0
        state.desk[deskIndex].quantity = 0
      }
    },

    resetCart (state) {
      state.items = []
      state.total = 0
      state.quantity = 0
    }
  },
  actions: {
    addToCart (context, payload) {
      context.commit('addProductToCart', payload)
    },
    removeFromCart (context, payload) {
      context.commit('removeProductFromCart', payload)
    },
    updateCartFromDesk (context, payload) {
      context.commit('updateCartFromDesk', payload)
    },
    saveCartToDesk (context, payload) {
      context.commit('saveCartToDesk', payload)
    },
    resetCartByDeskId (context, payload) {
      context.commit('resetCartByDeskId', payload)
    },
    resetCart (context) {
      context.commit('resetCart')
    }
  },
  getters: {
    products (state) {
      return state.items
    },
    totalSum (state) {
      return state.total
    },
    quantity (state) {
      return state.quantity
    },
    getDataFromTable: (state) => (payload) => {
      const deskId = payload
      const deskData = state.desk.find((d) => d.id === deskId)
      return deskData.quantity
    }
  }
}
