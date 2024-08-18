<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else class="table">
    <div class="table-header">
      <p>Invoice</p>
      <div>
        <input v-model="filterTerm" placeholder="Date" />
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
          <tr v-for="(ctt, i) in paginatedData" :key="i">
            <td>{{ (currentPage - 1) * pageSize + i + 1 }}</td>
            <td>{{ ctt._id }}</td>
            <td>{{ ctt.time }}</td>
            <td>{{ ctt.date }}</td>
            <td>{{ ctt.subtotal }}</td>
            <td>{{ ctt.total }}</td>
            <td>
              <button @click="viewClick(ctt)"><i class="fa-solid fa-pen-to-square"></i></button>
              <button @click="toggleAlert(ctt._id)"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div @click="changePage(currentPage - 1)" :disabled="currentPage === 1"><i class="fa-solid fa-angle-left"></i>
      </div>
      <div @click="changePage(1)" v-if="currentPage !== 1">1</div>
      <div v-if="currentPage - 2 >= 1" style="cursor: auto;"><i class="fa-solid fa-ellipsis"></i></div>
      <div style="color: #0298cf; background: rgba(171, 171, 171, 0.2);">{{ currentPage }}</div>
      <div v-if="currentPage + 2 <= totalPages" style="cursor: auto;"><i class="fa-solid fa-ellipsis"></i></div>
      <div @click="changePage(totalPages)" v-if="currentPage !== totalPages">{{ totalPages }}</div>
      <div @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"><i
          class="fa-solid fa-angle-right"></i></div>
    </div>
  </div>

  <!-- modal -->

  <TheInvoice :isInvoice="modalActive" @close="toggleModal" :subTotal="subTotal" :discount="discount"
    :total="total" :cart="items" :date="date" :_id="id"></TheInvoice>

  <alert-modal :modalActive="modalAlert" @close="toggleAlert(selectedId)"
    @delete="deleteClick(selectedId)"></alert-modal>
</template>
<script>
import TheInvoice from '@/components/invoice/TheInvoice.vue'

export default {
  components: {
    TheInvoice
  },
  data () {
    return {
      pageSize: 9,
      currentPage: 1,
      modalActive: false,
      modalAlert: false,
      filterTerm: '',
      isImg: false,
      isLoading: false,
      selectedId: 0,
      // data
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
    getInvoice () {
      return this.$store.getters['inv/getInvoice']
    },
    filterItem () {
      if (!this.filterTerm) {
        return this.getInvoice
      }
      this.reloadPageWithFilter()
      const searchTerm = this.filterTerm.toLowerCase()
      return this.getInvoice.filter(data =>
        data.date.toLowerCase().includes(searchTerm)
      )
    },
    paginatedData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filterItem.slice(start, end)
    },
    totalPages () {
      const tp = Math.ceil(this.filterItem.length / this.pageSize)
      if (tp === 0) return 1
      return tp
    }
  },
  methods: {
    async getInvoiceData () {
      this.isLoading = true
      try {
        await this.$store.dispatch('inv/getInvoiceData')
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false
    },
    changePage (page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    reloadPageWithFilter () {
      this.currentPage = 1
    },
    toggleModal () {
      this.modalActive = !this.modalActive
    },
    toggleAlert (id) {
      this.selectedId = id
      this.modalAlert = !this.modalAlert
    },
    viewClick (data) {
      this.toggleModal()
      this.id = data._id
      this.items = data.items
      this.date = data.date
      this.time = data.time
      this.subTotal = data.subtotal
      this.total = data.total
      this.discount = data.discount
      console.log(this.items)
    },
    async updateClick () {
      const updateFood = {
        _id: this.id,
        name: this.name,
        img: this.img,
        price: this.price,
        category: this.categoryId,
        isHidden: this.isHidden,
        createdDate: this.createdDate
      }
      try {
        await this.$store.dispatch('food/updateFood', updateFood)
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.getInvoiceData()
    },
    async deleteClick (id) {
      await this.$store.dispatch('inv/deteteInvoice', id)
      this.toggleAlert()
      this.getInvoiceData()
    }
  },
  created () {
    this.getInvoiceData()
  }
}
</script>
<style scoped>
.table {
  width: 100%;
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
  height: 600px;
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

th,
td {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px;
  text-align: center;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
}

td {
  text-align: left;
}

/* Sua */
td img {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 15px;
  border: 3px solid #ced0d2;
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

::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
}

tr:nth-child(even) {
  background-color: #d9d9d9
}

th:nth-child(1),
td:nth-child(1) {
  text-align: center;
  width: 70px;
}

th:nth-child(7),
td:nth-child(7) {
  text-align: center;
  width: 120px;
}

th:nth-child(6),
td:nth-child(6) {
  text-align: center;
  width: 120px;
}

th:nth-child(5),
td:nth-child(5) {
  text-align: center;
  width: 120px;
}

/* table end */

.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 20px;
}

.pagination div {
  padding: 10px;
  border: 1px solid #d5d0d0;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0298cf;
  color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  margin: 0 5px;
  cursor: pointer;
}

/* modal */

.data-display {
  display: flex;
  align-items: center;
  margin-bottom: 21px;
  /* Sua */
  /* border: 2px solid #000; */
}

.data-display .box {
  width: 120px;
}

.data-display input {
  height: 40px;
  width: 100%;
  border-radius: 6px;
  font-size: 17px;
  border: 1px solid #d9d9d9;
  padding: 0px 10px;
}

.data-display select {
  height: 40px;
  width: 100%;
  border-radius: 6px;
  font-size: 17px;
  border: 1px solid #d9d9d9;
  padding: 0px 10px;
}

.outsite>.data-display {
  display: block;
}

.outsite textarea {
  margin-top: 5px;
  height: 55px;
  width: 100%;
  border-radius: 6px;
  font-size: 17px;
  border: 1px solid #d9d9d9;
  padding: 5px;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}

.btn-container button {
  margin-right: 20px;
  padding: 12px 30px;
  color: #fff;
  background-color: #0298cf;
}

.site-box {
  display: flex;
}

.first-site {
  flex: 1;
}

.second-site {
  width: 270px;
  padding-left: 55px;
}
</style>
