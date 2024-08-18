<template>
  <div v-if="this.$store.state.hasData === false">
    <loading-spinner></loading-spinner>
  </div>
  <router-view/>

</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isLoading', 'error'])
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-family: Arial, Helvetica, sans-serif;
}

  /* a.router-link-active {
  color: #42b983;
} */
</style>
