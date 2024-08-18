<template>
  <the-header></the-header>
  <div class="schedules-section">
    <h1>Lịch làm việc</h1>
    <div style="display: flex; justify-content: flex-end;">
      <select class="w3-select w3-border" v-model="filterTerm">
        <option value="" disabled selected>Choose Date Period</option>
        <option v-for="mc in getTopDatePeriods" :key="mc._id" :value="mc._id">
          {{ mc.startDate }} - {{ mc.endDate }}
        </option>
      </select>
    </div>
    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>Giờ làm việc</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th>Chủ Nhật</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(ctt, i) in employeeIdsShift1" :key="i">{{ ctt }}</td>
          </tr>
          <tr>
            <td v-for="(ctt, i) in employeeIdsShift2" :key="i">{{ ctt }}</td>
          </tr>
          <tr>
            <td v-for="(ctt, i) in employeeIdsShift3" :key="i">{{ ctt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterTerm: ''
    }
  },
  computed: {
    getTopDatePeriods () {
      return this.$store.getters['schedule/getTopDatePeriods']
    },
    getSchedules () {
      return this.$store.getters['schedule/backendSchedules']
    },
    getShift1 () {
      return this.$store.getters['schedule/getSchedulesByShift']('8-12:30')
    },
    getShift2 () {
      return this.$store.getters['schedule/getSchedulesByShift']('12:30-17:00')
    },
    getShift3 () {
      return this.$store.getters['schedule/getSchedulesByShift']('17:00-21:30')
    },
    employeeIdsShift1 () {
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      const employeeIds = Array(7).fill(null)

      this.getShift1.forEach(schedule => {
        if (this.filterTerm === schedule.datePeriodId) {
          const index = daysOfWeek.indexOf(schedule.dateOfWeek.toLowerCase())
          if (index !== -1) {
            if (employeeIds[index]) {
              employeeIds[index] += `; ${schedule.employeeName}`
            } else {
              employeeIds[index] = schedule.employeeName
            }
          }
        }
      })

      employeeIds.unshift('8h00 - 12h30')
      return employeeIds
    },
    employeeIdsShift2 () {
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      const employeeIds = Array(7).fill(null)

      this.getShift2.forEach(schedule => {
        if (this.filterTerm === schedule.datePeriodId) {
          const index = daysOfWeek.indexOf(schedule.dateOfWeek.toLowerCase())
          if (index !== -1) {
            if (employeeIds[index]) {
              employeeIds[index] += `; ${schedule.employeeName}`
            } else {
              employeeIds[index] = schedule.employeeName
            }
          }
        }
      })

      employeeIds.unshift('12h30 - 17h00')
      return employeeIds
    },
    employeeIdsShift3 () {
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      const employeeIds = Array(7).fill(null)

      this.getShift3.forEach(schedule => {
        if (this.filterTerm === schedule.datePeriodId) {
          const index = daysOfWeek.indexOf(schedule.dateOfWeek.toLowerCase())
          if (index !== -1) {
            if (employeeIds[index]) {
              employeeIds[index] += `; ${schedule.employeeName}`
            } else {
              employeeIds[index] = schedule.employeeName
            }
          }
        }
      })

      employeeIds.unshift('17h00 - 21h30')
      return employeeIds
    }
    // employeeIdsShift3 () {
    //   const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    //   const employeeIds = Array(7).fill(null)

    //   this.getShift3.forEach(schedule => {
    //     const index = daysOfWeek.indexOf(schedule.dateOfWeek.toLowerCase())
    //     if (index !== -1) {
    //       employeeIds[index] = schedule.employeeName
    //     }
    //   })

    //   employeeIds.unshift('17h00 - 21h00')
    //   return employeeIds
    // }
  }
}
</script>
<style scoped>
  .schedules-section {
    padding: 20px;
  }

  .schedules-section h1{
    text-align: center;
    margin-bottom: 30px;
  }

  .schedules-section select {
    padding: 10px 20px;
    margin-bottom: 20px;
    outline: none;
    border: 1px solid #0298cf;
    border-radius: 6px;
    color: #0298cf;
  }

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
    height: auto;
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

  th:nth-child(n), td:nth-child(n) {
    text-align: center;
}

  th:nth-child(1), td:nth-child(1) {
    width: 150px;
  }

  /* th:nth-child(5), td:nth-child(5) {
    text-align: center;
    width: 120px;
  }

  th:nth-child(4), td:nth-child(4) {
    text-align: center;
  } */
</style>
