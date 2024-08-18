<template>
  <the-header></the-header>
  <section>
    <div class="cart">
      <h2>Giỏ hàng</h2>
      <ul>
        <cart-item v-for="item in cartItems" :key="item.productId" :prod-id="item.productId" :name="item.name"
          :image="item.image" :price="item.price" :quantity="item.quantity"></cart-item>
      </ul>
    </div>
    <div class="cost">
      <div class="box">
        <h2>Thông tin đơn hàng</h2>
        <div style="display: flex; justify-content: space-between;">
          <div>
            <h3>Tạm tính: </h3>
            <h3>Giảm: </h3>
            <h3>Tổng tiền: </h3>
          </div>
          <div style="text-align: end;">
            <h3>{{ subTotal }}đ</h3>
            <h3>{{ discountTotal }}đ</h3>
            <h3>{{ cartTotal }}đ</h3>
          </div>
        </div>
        <div class="box-button">
          <button @click="toggleInvoice">In Hóa Đơn</button>
        </div>
      </div>
    </div>

    <TheInvoice :isInvoice="isInvoice" @close="toggleInvoice" :subTotal="subTotal" :discount="discountTotal"
    :total="cartTotal" :cart="cartItems" :date="getCurrentDate()"></TheInvoice>

    <!-- <input type="number" v-model="discount">
     -->
  </section>
</template>

<script>
import CartItem from '../../components/cart/CartItem.vue'
import TheInvoice from '../../components/invoice/TheInvoice.vue'

export default {
  data () {
    return {
      discount: 0,
      isInvoice: false
    }
  },
  components: {
    CartItem,
    TheInvoice
  },
  computed: {
    discountTotal () {
      return this.subTotal * this.discount / 100
    },
    cartTotal () {
      return this.subTotal - this.discountTotal
    },
    subTotal () {
      return this.$store.getters['cart/totalSum']
    },
    cartItems () {
      return this.$store.getters['cart/products']
    }
  },
  methods: {
    toggleInvoice () {
      this.isInvoice = !this.isInvoice
    },
    getCurrentDate () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2) // Thêm số 0 phía trước nếu tháng < 10
      const day = ('0' + date.getDate()).slice(-2) // Thêm số 0 phía trước nếu ngày < 10
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style scoped>
section {
  margin: 10px 10%;
  display: flex;
  flex-direction: row;
}

.cart {
  flex: 1;
  padding: 15px;
}

.cost {
  width: 380px;
  padding: 15px;
}

.cost > .box {
  height: 100%;
}

h2 {
  color: #292929;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

h3 {
  margin-bottom: 10px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.box-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.box-button button {
  padding: 10px 15px;
  color: #fff;
  background-color: #0298cf;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
