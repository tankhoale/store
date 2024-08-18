<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else class="table">
    <div class="table-header">
      <p>Menus</p>
      <div>
        <input v-model="filterTerm" placeholder="Email" />
        <button @click="addClick" class="add-new">+ Add New</button>
      </div>
    </div>

    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ctt, i) in paginatedData" :key="i">
            <td>{{ (currentPage - 1) * pageSize + i + 1 }}</td>
            <td>{{ ctt.email }}</td>
            <td>{{ getRoleName(ctt.role) }}</td>
            <td>
              <button @click="editClick(ctt)"><i class="fa-solid fa-pen-to-square"></i></button>
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

  <!-- Modal" -->
  <base-modal :modalActive="modalActive" :modalTitle="modalTitle" @close="toggleModal">
    <div class="data-display">
      <div class="box">
        <p>Email</p>
      </div>
      <input type="text" v-model="email" />
    </div>

    <div class="data-display" v-if="id !== 0">
      <div class="box"> <p>Role</p> </div>
      <select v-model="roleId">
        <option v-for="(rl, i) in getRoles" :key="i" :value="rl._id">{{ rl.name }}</option>
      </select>
    </div>

    <div class="data-display">
      <div class="box">
        <p>Password</p>
      </div>
      <input type="text" v-model="oldPassword" />
    </div>

    <div class="data-display" v-if="id !== 0">
      <div class="box">
        <p>New Password</p>
      </div>
      <input type="text" v-model="newPassword" />
    </div>

    <div class="data-display">
      <div class="box">
        <p>Confirm Password</p>
      </div>
      <input type="text" v-model="confirmPassword" />
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
      email: '',
      roleId: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    getRoles () {
      return this.$store.getters['emp/getRoleForEmployee']
    },
    getUsers () {
      return this.$store.getters['users/backendUser'].users
    },
    filterItems () {
      if (!this.filterTerm) {
        return this.getUsers
      }
      this.reloadPageWithFilter()
      const searchTerm = this.filterTerm.toLowerCase()
      return this.getUsers.filter(data =>
        data.email.toLowerCase().includes(searchTerm)
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
    }
  },
  methods: {
    async getUsersData () {
      this.isLoading = true
      try {
        await this.$store.dispatch('users/getUserData')
        await this.$store.dispatch('emp/getRoleData')
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
    getRoleName (id) {
      return this.$store.getters['emp/getRoleName'](id)
    },
    toggleModal () {
      this.modalActive = !this.modalActive
    },
    toggleAlert (id) {
      this.selectedId = id
      this.modalAlert = !this.modalAlert
    },
    getCurrentDate () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2) // Thêm số 0 phía trước nếu tháng < 10
      const day = ('0' + date.getDate()).slice(-2) // Thêm số 0 phía trước nếu ngày < 10
      return `${day}/${month}/${year}`
    },
    getEmployeeName (id) {
      return this.$store.getters['users/getNameById'](id)
    },
    addClick () {
      this.toggleModal()
      this.modalTitle = 'Add User'
      this.id = 0
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    },
    async createClick () {
      if (this.password !== this.confirmPassword) {
        this.$showError('Password and confirm password do not match!')
        return
      }

      const newUser = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('users/postUser', newUser)
      this.getUsersData()
      this.toggleModal()
    },
    editClick (data) {
      this.toggleModal()
      this.modalTitle = 'Edit User'
      this.id = data._id
      this.email = data.email
      this.roleId = data.role
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    async updateClick () {
      if (this.newPassword !== this.confirmPassword) {
        this.$showError('Password and confirm password do not match!')
        return
      }

      const updateUser = {
        _id: this.id,
        email: this.email,
        role: this.roleId,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword

      }

      await this.$store.dispatch('users/updateUser', updateUser)
      this.getUsersData()
      this.toggleModal()
    },
    async deleteClick (id) {
      await this.$store.dispatch('users/deleteUser', id)
      this.getUsersData()
      this.toggleAlert()
    }
  },
  created () {
    this.getUsersData()
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

  th:nth-child(5), td:nth-child(5) {
    text-align: center;
    width: 120px;
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

  .permissions-selection {
    display: flex;
  }
</style>
