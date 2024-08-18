<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else>
    <section>
    <div class="items-display">
        <food-item
        v-for="prod in foodByCategory"
        :key="prod.foodId"
        :id="prod.foodId"
        :name="prod.name"
        :image="prod.img"
        :price="prod.price"
      ></food-item>
    </div>
  </section>
  </div>

</template>

<script>
import FoodItem from '@/components/food/FoodItem.vue'

export default {
  props: ['url'],
  components: {
    FoodItem
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    foodByCategory () {
      return this.$store.getters['food/getFoodByCategory'](this.url)
    }
  },
  methods: {
    async refreshedData () {
      this.isLoading = true
      try {
        await this.$store.dispatch('food/getCategoriesData')
        await this.$store.dispatch('food/getFoodData')
      } catch (error) {
        console.log(error.message || 'Something went wrong!')
      }
      this.isLoading = false
    }
  },
  created: function () {
    this.refreshedData()
  }
}
</script>

<style scoped>
  .items-display {
    margin: 10px 10%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 50px;
  }
</style>
