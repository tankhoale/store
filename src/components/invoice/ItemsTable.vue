<template>
  <div class="table">
    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Món</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mỳ</td>
            <td>2</td>
            <td>300000</td>
            <td>600000</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Mỳ</td>
            <td>2</td>
            <td>300000</td>
            <td>600000</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Mỳ</td>
            <td>2</td>
            <td>300000</td>
            <td>600000</td>
          </tr>
          <tr id="cal">
            <td></td>
            <td></td>
            <td></td>
            <td>Sub Total</td>
            <td>600000</td>
          </tr>
          <tr id="cal">
            <td></td>
            <td></td>
            <td></td>
            <td id="bt">Discount</td>
            <td id="bt">20000</td>
          </tr>
          <tr id="cal">
            <td></td>
            <td></td>
            <td></td>
            <td>TOTAL</td>
            <td>600000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .table {
  width: 100%;
  margin-top: 20px;
}

/* sua */
table {
  width: 100%;
  table-layout: fixed;
  max-width: 800px;
  border-collapse: collapse;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #f6f9fc;
  font-weight: bold;
  font-size: 18px;
}

th,
td {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px;
  word-break: break-all;
}

#cal>td {
  border-bottom: none;
}

#cal>td:nth-child(4) {
  font-weight: bold;
}

#cal>#bt {
  border-bottom: 1px solid black;
}

th:nth-child(1),
td:nth-child(1) {
  text-align: center;
  width: 80px;
}

th:nth-child(3),
td:nth-child(3) {
  text-align: center;
  width: 200px;
}

th:nth-child(4),
td:nth-child(4) {
  text-align: center;
  width: 200px;
}

th:nth-child(5),
td:nth-child(5) {
  text-align: center;
  width: 200px;
}
</style>
