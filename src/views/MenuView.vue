<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else>
    <the-header></the-header>
    <div class="banner">
      <HomeBanner></HomeBanner>
    </div>

    <MenuNavbar></MenuNavbar>
    <router-view></router-view>
    <section v-if="$route.name === 'menu'">
      <div class="items-display">
          <food-item
          v-for="prod in products"
          :key="prod._id"
          :id="prod._id"
          :name="prod.name"
          :image="prod.img"
          :price="prod.price"
        ></food-item>
      </div>
    </section>
  </div>
</template>

<script>
import HomeBanner from '@/components/banner/HomeBanner.vue'
import FoodItem from '@/components/food/FoodItem.vue'
import MenuNavbar from '@/components/nav/MenuNavbar.vue'

export default {
  components: {
    FoodItem,
    MenuNavbar,
    HomeBanner
  },
  data () {
    return {
      isLoading: false,
      load: false
    }
  },
  computed: {
    products () {
      const data = this.$store.getters['food/getFood']
      console.log(data)
      return data
    }
  }
  // methods: {
  //   async refreshedData () {
  //     this.isLoading = true
  //     try {
  //       // await this.$store.dispatch('food/getCategoriesData')
  //       await this.$store.dispatch('food/getFoodData')
  //       await this.$store.dispatch('nav/getNavbarData')
  //     } catch (error) {
  //       console.log(error.message || 'Something went wrong!')
  //     }
  //     this.isLoading = false
  //     this.$store.state.hasData = true
  //   }
  // },
  // created: function () {
  //   if (this.$store.state.hasData === false) {
  //     this.refreshedData()
  //   }
  // }
}
</script>

<style scoped>
  .items-display {
    margin: 10px 10%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 50px;
  }

  .block {
    width: 100%;
    height: 50px;
    background: #000000;
  }

  .banner {
    margin: 0px 10%;
  }
</style>
