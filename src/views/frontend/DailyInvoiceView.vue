<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else>
    <the-header></the-header>
    <div class="table">
      <div class="table-header">
        <p>Invoice</p>
        <div>
          <input v-model="filterTerm" placeholder="Name(Title) or Url" />
          <button @click="addClick" class="add-new">+ Add New</button>
        </div>
      </div>

      <div class="table-section">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Id</th>
              <th>Time</th>
              <th>Date</th>
              <th>SubTotal</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ctt, i) in getDailyInvoice" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ ctt._id }}</td>
              <td>{{ ctt.time }}</td>
              <td>{{ ctt.date }}</td>
              <td>{{ ctt.subtotal }}</td>
              <td>{{ ctt.total }}</td>
              <td>
                <button @click="viewClick(ctt)"><i class="fa-solid fa-eye"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheInvoice :isInvoice="isInvoice" @close="toggleInvoice" :subTotal="subTotal" :discount="discount"
        :total="total" :cart="items"></TheInvoice>
    </div>
  </div>

</template>
<script>
import TheInvoice from '../../components/invoice/TheInvoice.vue'
export default {
  components: {
    TheInvoice
  },
  data () {
    return {
      isLoading: false,
      isInvoice: false,
      id: 0,
      items: [],
      date: '',
      time: '',
      subTotal: 0,
      total: 0,
      discount: 0
    }
  },
  computed: {
    getDailyInvoice () {
      return this.$store.getters['inv/getInvoicesToday']
    }
  },
  methods: {
    async refreshedData () {
      this.isLoading = true
      try {
        // nav
        await this.$store.dispatch('inv/getInvoiceData')
      } catch (error) {
        console.log(error.message || 'Something went wrong!')
      }
      this.isLoading = false
    },
    toggleInvoice () {
      this.isInvoice = !this.isInvoice
    },
    viewClick (data) {
      this.toggleInvoice()
      this.id = data._id
      this.items = data.items
      this.date = data.date
      this.time = data.time
      this.subTotal = data.subtotal
      this.total = data.total
      this.discount = data.discount
    }
  },
  created: function () {
    this.refreshedData()
  }
}
</script>
<style scoped>
  .table {
    width: 100%;
    padding: 20px;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: rgb(240, 240, 240);
    flex-wrap: wrap;
  }

  .table-header p {
    color: #000;
  }

  button {
    outline: none;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    padding: 10px;
    color: #fff;
  }

  .add-new {
    padding: 10px 20px;
    color: #fff;
    background-color: #0298cf;
  }

  .table-header input {
    padding: 10px 20px;
    margin: 0 10px;
    outline: none;
    border: 1px solid #0298cf;
    border-radius: 6px;
    color: #0298cf;
  }

  ::placeholder {
    color: #0298cf;
  }

  /* table-header end */

  /* sua */
  .table-section {
    height: 630px;
    overflow: auto;
  }

  table {
    width: 100%;
    table-layout: auto;
    min-width: 1000px;
    border-collapse: collapse;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: #0298cf;
    color: #fff;
    font-size: 15px;
    height: 50px;
  }

  th,td {
    border-bottom: 1px solid #dddddd;
    padding: 10px 20px;
    word-break: break-all;
    text-align: center;
    border-right: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
  }

  td {
    text-align: left;
  }

  tr:hover td {
    background-color: #cfe2ff;
  }

  td button:nth-child(1) {
    background-color: #0298cf;
    margin-right: 10px;
  }

  td button:nth-child(2) {
    background-color: #f80000;
  }

  ::-webkit-scrollbar{
    height: 5px;
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
  }

  tr:nth-child(even) {background-color: #d9d9d9 }

  th:nth-child(1), td:nth-child(1) {
    text-align: center;
    width: 70px;
  }

  /* th:nth-child(6), td:nth-child(6) {
    text-align: center;
    width: 120px;
  } */

  th:nth-child(5), td:nth-child(5) {
    text-align: center;
    width: 120px;
  }

  th:nth-child(4), td:nth-child(4) {
    text-align: center;
  }
</style>
