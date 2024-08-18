<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else class="table">
    <div class="table-header">
      <p>Schedules</p>
      <div>
        <input v-model="filterTerm" placeholder="Employee Name" />
        <button @click="addClick" class="add-new">+ Add New</button>
      </div>
    </div>

    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Employee Name</th>
            <th>Date Of Week</th>
            <th>Shift</th>
            <th>Date Period</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ctt, i) in paginatedData" :key="i">
            <td>{{ (currentPage - 1) * pageSize + i + 1 }}</td>
            <td>{{ getEmployeeName(ctt.employeeId) }}</td>
            <td>{{ ctt.dateOfWeek }}</td>
            <td>{{ ctt.hours }}</td>
            <td>{{ showDatePeriod(ctt.datePeriodId) }}</td>
            <!-- <td>{{ ctt.lang }}</td> -->
            <td>
              <button @click="editClick(ctt)"><i class="fa-solid fa-pen-to-square"></i></button>
              <button @click="toggleAlert(ctt.id)"><i class="fa-solid fa-trash"></i></button>
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

  <!-- Modal" -->
  <base-modal :modalActive="modalActive" :modalTitle="modalTitle" @close="toggleModal">
    <div class="data-display">
      <div class="box">
        <p>Employee</p>
      </div>
      <select v-model="employeeId">
        <option v-for="(epy, i) in getEmployees" :key="i" :value="epy._id">{{ epy.name }}</option>
      </select>
    </div>

    <div class="data-display">
      <div class="box">
        <p>DateOfWeek</p>
      </div>
      <select v-model="dateOfWeek">
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
      </select>
    </div>

    <div class="data-display">
      <div class="box">
        <p>Date Period</p>
      </div>
      <select v-model="datePeriodId">
        <option v-for="mc in getTopDatePeriods" :key="mc._id" :value="mc._id">
          {{ mc.startDate }} - {{ mc.endDate }}
        </option>
      </select>
    </div>

    <div class="data-display">
      <div class="box">
        <p>Shift</p>
      </div>
      <select v-model="shift">
        <option value="8-12:30">8:00 to 12:30</option>
        <option value="12:30-17:00">12:30 to 17:00</option>
        <option value="17:00-21:30">17:00 to 21:30</option>
      </select>
    </div>

    <div class="btn-container">
      <button type="button" v-if="id === 0" @click="createClick()">Create</button>
      <button type="button" v-if="id !== 0" @click="updateClick()">Update</button>
    </div>
  </base-modal>

  <alert-modal :modalActive="modalAlert" @close="toggleAlert(selectedId)" @delete="deleteClick(selectedId)"></alert-modal>
</template>
<script>
export default {
  data () {
    return {
      pageSize: 9,
      currentPage: 1,
      modalActive: false,
      modalAlert: false,
      modalTitle: '',
      filterTerm: '',
      isLoading: false,
      selectedId: 0,
      // data
      id: 0,
      employeeId: '',
      dateOfWeek: '',
      shift: '',
      datePeriodId: ''
    }
  },
  computed: {
    getTopDatePeriods () {
      return this.$store.getters['schedule/getTopDatePeriods']
    },
    getSchedules () {
      return this.$store.getters['schedule/backendSchedules']
    },
    filterItems () {
      if (!this.filterTerm) {
        return this.getSchedules
      }
      this.reloadPageWithFilter()
      const searchTerm = this.filterTerm.toLowerCase()
      return this.getSchedules.filter(data =>
        data.employeeName.toLowerCase().includes(searchTerm)
      )
    },
    paginatedData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filterItems.slice(start, end)
    },
    totalPages () {
      const tp = Math.ceil(this.filterItems.length / this.pageSize)
      if (tp === 0) return 1
      return tp
    },
    getEmployees () {
      return this.$store.getters['emp/getEmployeeForSchedules']
    }
  },
  methods: {
    async getSchedulesData () {
      this.isLoading = true
      try {
        await this.$store.dispatch('schedule/getDatePeriodData')
        await this.$store.dispatch('emp/getEmployeeData')
        await this.$store.dispatch('schedule/getSchedulesData')
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
    getEmployeeName (id) {
      return this.$store.getters['emp/getNameById'](id)
    },
    showDatePeriod (id) {
      return this.$store.getters['schedule/showDatePeriod'](id)
    },
    addClick () {
      this.toggleModal()
      this.modalTitle = 'Add Schedule'
      this.id = 0
      this.employeeId = ''
      this.dateOfWeek = ''
      this.shift = ''
      this.datePeriodId = ''
    },
    async createClick () {
      const newSchedule = {
        employeeId: this.employeeId,
        dateOfWeek: this.dateOfWeek,
        hours: this.shift,
        datePeriodId: this.datePeriodId
      }
      await this.$store.dispatch('schedule/postSchedules', newSchedule)
      this.getSchedulesData()
      this.toggleModal()
    },
    editClick (data) {
      this.toggleModal()
      this.modalTitle = 'Edit Menu'
      this.id = data.id
      this.employeeId = data.employeeId
      this.shift = data.hours
      this.dateOfWeek = data.dateOfWeek
      this.datePeriodId = data.datePeriodId
    },
    async updateClick () {
      const updateSchedule = {
        id: this.id,
        employeeId: this.employeeId,
        dateOfWeek: this.dateOfWeek,
        hours: this.shift,
        datePeriodId: this.datePeriodId
      }
      await this.$store.dispatch('schedule/updateSchedules', updateSchedule)
      this.getSchedulesData()
      this.toggleModal()
    },
    async deleteClick (id) {
      await this.$store.dispatch('schedule/deleteSchedules', id)
      this.getSchedulesData()
      this.toggleAlert()
    }
  },
  created () {
    this.getSchedulesData()
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

  th:nth-child(6), td:nth-child(6) {
    text-align: center;
    width: 120px;
  }

  th:nth-child(5), td:nth-child(5), td:nth-child(3), td:nth-child(2) {
    text-align: center;
  }

  th:nth-child(4), td:nth-child(4) {
    text-align: center;
  }

  /* table end */
  .pagination {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px 20px;
  }

  .pagination div{
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
    margin-bottom: 30px;
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

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }

  .btn-container button {
    padding: 12px 30px;
    color: #fff;
    background-color: #0298cf;
  }
</style>
