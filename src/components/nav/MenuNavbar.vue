<template>
  <div class="menu-nav">
    <ul>
      <li v-for="(nav,i) in navbar" :key="i">
        <router-link :to="{ name: nav.routeName, params: { url: nav.url } }">{{ nav.menuName }}</router-link>
      </li>
      <!-- <li><router-link :to="{ name: 'foodByCategory', params: { url: 'rice' } }">Cơm </router-link></li>
      <li><router-link :to="{ name: 'foodByCategory', params: { url: 'noodle' } }">Mỳ</router-link></li>
      <li><router-link :to="{ name: 'foodByCategory', params: { url: 'drinks' } }">Nước</router-link></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    navbar () {
      return this.$store.getters['nav/getNavbarForFrontend'](1)
    }
  }
}
</script>

<style scoped>
  .menu-nav {
    padding: 0px 10%;
  }

  .menu-nav li, a {
    font-size: 20px;
    text-decoration: none;
    color: black;
    display: inline-block;
    padding: 10px 0;
    padding-right: 25px;
    font-weight: bold;
  }

  .menu-nav ul {
    list-style: none;
  }

  a.router-link-active {
  color: #42b983;
}
</style>
