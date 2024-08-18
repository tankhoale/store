<template>
  <li>
    <div class="image-container">
      <img :src="image" :alt="name" />
    </div>
    <div class="content">
      <h3>{{ name }}</h3>
      <div class="item__data">
        <div>
          Đơn giá:
          <strong>${{ price }}</strong>
        </div>
        <div>
          Quantity:
          <strong>{{ quantity }}</strong>
        </div>
      </div>
      <div class="item__total">Total: {{ itemTotal }}đ</div>
      <div class="btn">
        <button @click="remove">Remove</button>
      </div>

    </div>
  </li>
</template>

<script>
export default {
  props: ['prodId', 'name', 'image', 'price', 'quantity'],
  computed: {
    itemTotal () {
      return (this.price * this.quantity)
    }
  },
  methods: {
    remove () {
      this.$store.dispatch('cart/removeFromCart', { productId: this.prodId })
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  display: flex;
}

.image-container {
  width: 200px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  width: 100%;
  padding-left: 20px;
}

.item__data {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.item__total {
  font-weight: bold;
  margin: 1rem 0;
  border-top: 1px solid #474747;
  /* border-bottom: 2px solid #474747; */
  padding: 0.5rem 0;
  width: auto;
  text-align: right;
}

.btn {
  display: flex;
  justify-content: flex-end;
}

button {
  font: inherit;
  border: 1px solid #8f0030;
  background-color: #8f0030;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}

button:hover,
button:active {
  background-color: #53001c;
  border-color: #53001c;
}
</style>
