<template>
  <div class="product__data">
    <div class="product__image">
        <img :src="image" :alt="name" />
    </div>
    <div class="product__text">
      <h3>{{ name }}</h3>
      <h4>{{ price }}đ</h4>
    </div>
    <div class="product__actions">
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'image', 'name', 'price', 'description'],
  methods: {
    addToCart () {
      this.$store.dispatch('cart/addToCart', {
        id: this.id,
        image: this.image,
        name: this.name,
        price: this.price
      })
    },
    log () {
      console.log(this.image)
    }
  }
}
</script>

<style scoped>
.product__data {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 10px;
}

.product__image img {
  height: 10rem;
  width: 100%;
  object-fit: cover;
}

.product__text h3 {
  margin: 0 0 0.5rem 0;
}

.product__text h4 {
  margin: 0;
}

.product__actions {
  margin-top: 15px;
  text-align: center;
}

button {
  font: inherit;
  cursor: pointer;
  background-color: #45006d;
  color: white;
  border: 1px solid #45006d;
  padding: 0.5rem 1rem;
  border-radius: 30px;
}

button:hover,
button:active {
  background-color: #760ab4;
  border-color: #760ab4;
}
</style>
