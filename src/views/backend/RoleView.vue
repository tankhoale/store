<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else class="table">
    <div class="table-header">
      <p>Menus</p>
      <div>
        <input v-model="filterTerm" placeholder="Role Name" />
        <button @click="addClick" class="add-new">+ Add New</button>
      </div>
    </div>

    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Role Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ctt, i) in paginatedData" :key="i">
            <td>{{ (currentPage - 1) * pageSize + i + 1 }}</td>
            <td>{{ ctt.name }}</td>
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
        <p>Role</p>
      </div>
      <input type="text" v-model="name" />
    </div>

    <div class="data-display-p">
      <div class="box">
        <p></p>
      </div>
    </div>

    <div class="permissions-selection">
        <div>
          <label for="entity" class="label-width">Select Permission:</label>
          <select v-model="selectedEntity" @change="updatePermissions">
            <option disabled value="">Selection</option>
            <option value="user">User</option>
            <option value="food">Food</option>
            <option value="foodCategory">Food Category</option>
            <option value="foodMenu">Menu</option>
            <option value="invoice">Invoice</option>
            <option value="employee">Employee</option>
            <option value="role">Role</option>
            <option value="fingerprint">Fingerprint</option>
            <option value="datePeriod">DatePeriod</option>
            <option value="banner">Banner</option>
            <option value="shift">Shift</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>

        <div v-if="selectedEntity" class="permission-boxes">
          <h2>Permissions for {{ selectedEntity }}:</h2>
          <div v-for="permission in allPermissions" :key="permission">
            <input
              type="checkbox"
              :id="permission"
              :value="permission"
              v-model="currentPermissions"
              @change="togglePermission(permission)"
            />
            <label :for="permission">{{ permission }}</label>
          </div>
        </div>
      </div>

    <div class="data-display">
      <div class="box">
      </div>
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
      name: '',
      permissions: [],
      permissionsAdd: {
        user: [],
        food: [],
        foodCategory: [],
        foodMenu: [],
        invoice: [],
        employee: [],
        role: [],
        fingerprint: [],
        datePeriod: [],
        banner: [],
        shift: [],
        attendance: []
      },
      // isHidden: false,
      createdDate: '',
      allPermissions: ['create', 'read', 'update', 'delete'],
      selectedEntity: '',
      currentPermissions: []
    }
  },
  computed: {
    getRoles () {
      return this.$store.getters['emp/getRoles']
    },
    filterItems () {
      if (!this.filterTerm) {
        return this.getRoles
      }
      this.reloadPageWithFilter()
      const searchTerm = this.filterTerm.toLowerCase()
      return this.getRoles.filter(data =>
        data.name.toLowerCase().includes(searchTerm)
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
    updatePermissions () {
      this.currentPermissions = [...this.permissions[this.selectedEntity]]
    },
    togglePermission (permission) {
      const index = this.permissions[this.selectedEntity].indexOf(permission)
      if (index > -1) {
        // Remove the permission if it's already present
        this.permissions[this.selectedEntity].splice(index, 1)
      } else {
        // Add the permission if it's not present
        this.permissions[this.selectedEntity].push(permission)
      }
      // Sync the currentPermissions array
      this.currentPermissions = [...this.permissions[this.selectedEntity]]
    },
    async getRolesData () {
      this.isLoading = true
      try {
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
    addClick () {
      this.toggleModal()
      this.modalTitle = 'Add Role'
      this.id = 0
      this.name = ''
      this.selectedEntity = ''
      this.permissions = this.permissionsAdd
    },
    async createClick () {
      const newRole = {
        name: this.name,
        permissions: this.permissions
      }
      await this.$store.dispatch('emp/postRole', newRole)
      this.getRolesData()
      this.toggleModal()
    },
    editClick (data) {
      this.toggleModal()
      this.selectedEntity = ''
      this.modalTitle = 'Edit Role'
      this.id = data._id
      this.name = data.name
      this.permissions = data.permissions
    },
    async updateClick () {
      const updateRole = {
        _id: this.id,
        name: this.name,
        permissions: this.permissions
      }
      await this.$store.dispatch('emp/updateRole', updateRole)
      this.getRolesData()
      this.toggleModal()
    },
    async deleteClick (id) {
      await this.$store.dispatch('emp/deleteRole', id)
      this.getRolesData()
      this.toggleAlert()
    }
  },
  created () {
    this.getRolesData()
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

  th:nth-child(3), td:nth-child(3) {
    text-align: center;
    width: 120px;
  }

  th:nth-child(2), td:nth-child(2) {
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

  .data-display-p {
    display: flex;
    align-items: center;
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

  .permissions-selection select {
    height: 40px;
    width: 100%;
    border-radius: 6px;
    font-size: 17px;
    border: 1px solid #d9d9d9;
    padding: 0px 10px;
  }

  .label-width {
    display: block;
    width: 100%;
    margin-bottom: 5px;
  }

  h2 {
    margin-top: 22px;
  }

  .permission-boxes {
    margin-left: 30px;
  }

  .permission-boxes h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .permission-boxes input {
    margin: 4px;
  }

</style>
