<template>
  <the-header></the-header>
  <div class="table-container">
    <div class="takeaway">
      <button @click="chosenDesk(0)">Giỏ hàng mang đi</button>
    </div>

    <div class="flex-display">
      <div class="table" >
        <button :class="{ 'highlight': hasData[0], 'normal': !hasData[0] }"  @click="chosenDesk(1)">Bàn 1</button>
      </div>
      <div class="table">
        <button :class="{ 'highlight': hasData[1], 'normal': !hasData[1] }"  @click="chosenDesk(2)">Bàn 2</button>
      </div>
      <div class="table">
        <button :class="{ 'highlight': hasData[2], 'normal': !hasData[2] }"  @click="chosenDesk(3)">Bàn 3</button>
      </div>
    </div>

    <div class="flex-display">
      <div class="table">
        <button :class="{ 'highlight': hasData[3], 'normal': !hasData[3] }" @click="chosenDesk(4)">Bàn 4</button>
      </div>
      <div class="table">
        <button :class="{ 'highlight': hasData[4], 'normal': !hasData[4] }" @click="chosenDesk(5)">Bàn 5</button>
      </div>
      <div class="table">
        <button :class="{ 'highlight': hasData[5], 'normal': !hasData[5] }" @click="chosenDesk(6)">Bàn 6</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hasData: [
        false,
        false,
        false,
        false,
        false,
        false
      ]
    }
  },
  methods: {
    chosenDesk (id) {
      this.check()
      if (this.$store.state.currentTable === 0) {
        this.$store.dispatch('cart/updateCartFromDesk', { deskId: id })
        this.$store.state.currentTable = id
      } else {
        this.saveDesk(this.$store.state.currentTable)
        if (id === 0) {
          this.$store.state.currentTable = id
          this.$store.dispatch('cart/resetCart')
        } else {
          this.$store.dispatch('cart/updateCartFromDesk', { deskId: id })
          this.$store.state.currentTable = id
        }
      }
    },
    saveDesk (id) {
      this.$store.dispatch('cart/saveCartToDesk', { deskId: id })
    },
    checkData (id) {
      if (this.$store.getters['cart/getDataFromTable'](id) > 0) {
        this.hasData[id - 1] = true
      } else {
        this.hasData[id - 1] = false
      }
    },
    check () {
      this.checkData(1)
      this.checkData(2)
      this.checkData(3)
      this.checkData(4)
      this.checkData(5)
      this.checkData(6)
    }
  },
  mounted () {
    this.check()
  }
}
</script>
<style scoped>
  .table-container {
    padding: 0 10%;
  }

  .takeaway {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .takeaway button {
    width: 120px;
    border: none;
    background-color: #0298cf;
    color: white;
    padding: 10px 0px;
    outline: none;
    cursor: pointer;
    border-radius: 6px;
    font-weight: bold;
  }

  .flex-display {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    gap: 70px;
  }

  .table {
    flex: 1;
    height: 200px;
  }

  .table button {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 40px;
    cursor: pointer;
  }

  .highlight {
    background-color: #fbbf23;
    color: black;
  }

  .normal {
    background-color: #f0f0f0;
    color: black;
  }
</style>
