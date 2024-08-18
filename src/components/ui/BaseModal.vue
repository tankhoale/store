<template>
  <Teleport to="body">
    <div v-show="modalActive" class="modal-bg" @click.self="$emit('close')">
      <div class="modal" :class="size">
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
        </div>
        <div class="modal-content">
          <slot></slot>
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
    },
    modalTitle: {
      type: String,
      require: false,
      default: ''
    }
  },
  emits: ['close']
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
  }

  .modal-header {
    height: 30px;
    border-bottom: 2px solid #d9d9d9;
  }

  .modal-content {
    margin-top: 15px;
  }

  .small {
    width: 300px;
  }

  .default {
    width: 500px;
  }

  .large {
    width: 800px;
  }
</style>
