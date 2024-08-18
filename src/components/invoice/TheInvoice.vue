<template>
  <Teleport to="body">
    <div v-show="isInvoice" class="bg" @click.self="$emit('close')">
      <div class="table-container">
        <div class="container">
          <div class="invoice">
            <div class="invoice-action" v-if="_id === 'Id'">
              <button @click="postInvoice">Xuất Hóa Đơn</button>
            </div>

            <div class="iheader">
              <div class="ibox">
                <h1>Hóa Đơn</h1>
                <p>QUÁN TỤI TUI</p>
                <p>Địa chỉ: Bcons Plaza, phường Đông Hòa, tp Dĩ An, Bình Dương</p>
                <p>Liên hệ: 0392233570</p>
              </div>
              <img src="../../assets/qr-momo.jpg">
            </div>

            <div class="idisplay">
                <p><strong>Mã: </strong>{{ _id }}</p>
                <p><strong>Ngày Tạo:</strong> {{ date }}</p>
            </div>

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
                    <tr v-for="(item,i) in cart" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.sum }}</td>
                    </tr>
                    <tr id="cal">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Sub Total</td>
                      <td>{{ subTotal }}</td>
                    </tr>
                    <tr id="cal">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td id="bt">Discount</td>
                      <td id="bt">{{ discount }}</td>
                    </tr>
                    <tr id="cal">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>TOTAL</td>
                      <td>{{ total }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="end">
              <p class="fin">Cảm ơn bạn đã mua hàng!</p>
              <p class="fin">Chúc bạn ngon miệng!</p>
            </div>
          </div>
      </div>

      </div>
    </div>
  </Teleport>
</template>

<script>

export default {
  props: {
    isInvoice: {
      type: Boolean,
      require: false,
      default: false
    },
    cart: {
      type: Object,
      require: true
    },
    discount: {
      type: Number,
      require: true
    },
    total: {
      type: Number,
      require: true
    },
    subTotal: {
      type: Number,
      require: true
    },
    date: {
      type: String,
      require: true
    },
    _id: {
      type: String,
      require: false,
      default: 'Id'
    }
  },
  emits: ['close'],
  methods: {
    getCurrentTime () {
      return new Date().toLocaleTimeString()
    },
    postInvoice () {
      this.items = this.cart.map(({ name, price, quantity, sum }) => ({
        name: name,
        quantity: quantity,
        price,
        sum
      }))

      const newInvoice = {
        items: this.items,
        date: this.date,
        time: this.getCurrentTime(),
        subtotal: this.subTotal,
        discount: this.discount,
        total: this.total
      }

      try {
        this.$store.dispatch('inv/postInvoice', newInvoice)
        if (this.$store.state.currentTable !== 0) {
          this.$store.dispatch('cart/resetCartByDeskId', this.$store.state.currentTable)
          this.$store.dispatch('cart/resetCart')
        } else {
          this.$store.dispatch('cart/resetCart')
        }
        this.$emit('close')
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
    }
  }
}
</script>
<style scoped>
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 4;
  }

  .table-container {
    max-width: 1100px;
    height: 700px;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    overflow: auto;
    overflow-x: hidden;
  }

  .container {
    display: flex;
    justify-content: center;
  }

  .invoice {
    width: 800px;
    height: 700px;
    background: #ffffff;
    padding: 20px 10px;
  }

  .invoice-action {
    display: flex;
    justify-content: flex-end;
  }

  .invoice-action button {
    padding: 10px 15px;
    color: #fff;
    background-color: #0298cf;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .iheader {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .ibox {
    width: 300px;
  }

  .iheader img {
    max-width: 120px;
    max-height: 110px;
  }

  .idisplay {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    padding: 7px;
  }

  .fin {
    text-align: center;
    font-weight: bold;
    margin-top: 5px;
  }

.table {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 80px;
}
table {
  width: 100%;
  table-layout: fixed;
  max-width: 800px;
  min-height: 280px;
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
  text-align: center;
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
  width: 130px;
}

th:nth-child(4),
td:nth-child(4) {
  text-align: center;
  width: 150px;
}

th:nth-child(5),
td:nth-child(5) {
  text-align: center;
  width: 120px;
}

.end {
  padding-bottom: 20px;
}
</style>
