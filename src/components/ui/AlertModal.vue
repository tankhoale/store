<template>
  <Teleport to="body">
    <div v-show="modalActive" class="modal-bg" @click.self="$emit('close')">
      <div class="modal" :class="size">
        <div class="modal-header">
          <h2>Are you sure you want to delete ?</h2>
          <p>You will not be able to recover it once it delete !</p>
          <p>Continue anyway ?</p>
        </div>

        <div class="modal-content">
          <button class="cancel" @click="$emit('close')">Cancel</button>
          <button class="delete" @click="$emit('delete')">
            <i class="fa-solid fa-trash"></i> Yes, Delete</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script>
export default {
  props: {
    modalActive: {
      type: Boolean,
      require: false,
      default: false
    },
    size: {
      type: String,
      require: false,
      default: 'default'
    }
  },
  emits: ['close', 'delete']
}
</script>
<style scoped>
  .modal-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 4;
  }

  .modal {
    padding: 16px;
    background: #fff;
    width: 700px;
    align-self: center;
    border-radius: 12px;
    width: 450px;
  }

  .modal-header {
    margin-bottom: 60px;
  }

  .modal-header h2 {
    margin-bottom: 10px;
  }

  .modal-header p {
    color: #ababab;
    font-size: 15px;
  }

  .modal-content {
    display: flex;
    justify-content: flex-end;
  }

  .modal-content button {
    margin-left: 20px;
    padding: 10px 20px;
    border-radius: 15px;
    outline: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }

  .modal-content .delete {
    color: #fff;
    background: red;
  }

  .modal-content .cancel {
    color: #969393;
    background: #efebeb;
  }

  .modal-content i {
    margin-right: 5px;
  }

</style>
