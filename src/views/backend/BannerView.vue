<template>
  <div v-if="isLoading">
    <loading-spinner></loading-spinner>
  </div>
  <div v-else class="table">
    <div class="table-header">
      <p>Banners</p>
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
            <th>Name</th>
            <th>Image</th>
            <th>isHidden</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ctt, i) in paginatedData" :key="i">
            <td>{{ (currentPage - 1) * pageSize + i + 1 }}</td>
            <td>{{ ctt.name }}</td>
            <td><img :src="ctt.img"></td>
            <td>{{ ctt.isHidden }}</td>
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

  <!-- modal -->
  <base-modal :modalActive="modalActive" :modalTitle="modalTitle" @close="toggleModal" size="large">
    <div class="site-box">
      <div class="first-site">
        <div class="data-display">
          <div class="box">
            <p>Name</p>
          </div>
          <input type="text" v-model="name" />
        </div>

        <div class="data-display">
          <div class="box">
            <p>IsHidden</p>
          </div>
          <select v-model="isHidden">
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

      </div>
      <div class="second-site">
        <div>
          <img v-if="isImg" :src="img" style="width: 190px; height: 185px;" />
          <input type="file" name="img" @change="imageUpload" ref="fileInput" style="margin: 10px 0px;">
        </div>
      </div>
    </div>

    <div class="btn-container">
      <button type="button" v-if="id === 0" @click="createClick()">Create</button>
      <button type="button" v-if="id !== 0" @click="updateClick()">Update</button>
    </div>
  </base-modal>

  <alert-modal :modalActive="modalAlert" @close="toggleAlert(selectedId)"
    @delete="deleteClick(selectedId)"></alert-modal>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      pageSize: 6,
      currentPage: 1,
      modalActive: false,
      modalAlert: false,
      modalTitle: '',
      filterTerm: '',
      isImg: false,
      isLoading: false,
      selectedId: 0,
      // data
      id: 0,
      img: '',
      name: '',
      isHidden: false,
      createdDate: ''
    }
  },
  computed: {
    getBanner () {
      return this.$store.getters['bnr/backendBanners']
    },
    filterItem () {
      if (!this.filterTerm) {
        return this.getBanner
      }
      this.reloadPageWithFilter()
      const searchTerm = this.filterTerm.toLowerCase()
      return this.getBanner.filter(data =>
        data.name.toLowerCase().includes(searchTerm)
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
    async getBannerData () {
      this.isLoading = true
      try {
        await this.$store.dispatch('bnr/getBannerData')
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
    getCurrentDate () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2) // Thêm số 0 phía trước nếu tháng < 10
      const day = ('0' + date.getDate()).slice(-2) // Thêm số 0 phía trước nếu ngày < 10
      return `${day}/${month}/${year}`
    },
    addClick () {
      this.toggleModal()
      this.$refs.fileInput.value = ''
      this.isImg = false
      this.modalTitle = 'Add Banner'
      this.id = 0
      this.img = ''
      this.name = ''
      this.isHidden = false
      this.createdDate = ''
    },
    async createClick () {
      const newBanner = {
        name: this.name,
        img: this.img,
        isHidden: this.isHidden,
        createdDate: this.getCurrentDate()
      }

      await this.$store.dispatch('bnr/postBanner', newBanner)
      this.toggleModal()
      this.getBannerData()
    },
    editClick (data) {
      this.toggleModal()
      this.isImg = true
      this.$refs.fileInput.value = ''
      this.modalTitle = 'Edit Banner'
      this.id = data._id
      this.img = data.img
      this.name = data.name
      this.price = data.price
      this.isHidden = data.isHidden
      this.categoryId = data.category
      this.createdDate = data.createdDate
    },
    async updateClick () {
      const updateBanner = {
        _id: this.id,
        name: this.name,
        img: this.img,
        isHidden: this.isHidden,
        createdDate: this.createdDate
      }

      await this.$store.dispatch('bnr/updateBanner', updateBanner)
      this.toggleModal()
      this.getBannerData()
    },
    imageUpload (event) {
      const formData = new FormData()
      formData.append('image', event.target.files[0])
      axios.post(
        'https://dacntt2.onrender.com/api/UploadFile', formData
      ).then((response) => {
        this.img = response.data.file.path
        this.isImg = true
      })
    },
    async deleteClick (id) {
      await this.$store.dispatch('bnr/deleteBanner', id)
      this.toggleAlert()
      this.getBannerData()
    }
  },
  created () {
    this.getBannerData()
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
    text-align: center;
    border-right: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
  }

  td {
    text-align: left;
  }

  /* Sua */
  td img {
    height: 80px;
    width: 160px;
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

  td:nth-child(2) {
    text-align: center;
  }

  td:nth-child(3) {
    width: 200px;
    text-align: center;
  }

  th:nth-child(4), td:nth-child(4) {
    text-align: center;
    width: 120px;
  }

  th:nth-child(5), td:nth-child(5) {
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
    margin-bottom: 21px;/* Sua */
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

  .outsite > .data-display {
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
