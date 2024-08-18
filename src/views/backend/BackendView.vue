<template>
  <section class="backend-view">
    <TheBackendNavbar></TheBackendNavbar>
    <div class="table-content">
      <div class="img-container" v-if="$route.name === 'backend'">
        <img src="../../assets/qtt-management.png" />
      </div>

      <router-view></router-view>
    </div>
  </section>
</template>
<script>
import TheBackendNavbar from '../../components/nav/TheBackendNavbar.vue'

export default {
  components: {
    TheBackendNavbar
  }
}
</script>
<style scoped>
  .backend-view {
    display: flex;
  }

  .table-content .img-container {
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table-content {
    padding: 0px 15px;
    flex: 1;
  }
</style>
