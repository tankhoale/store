<template>
  <div class="spinner">
    <div class="loading">
    </div>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}

.loading {
  display: flex;
  justify-content: center;
}

.loading::after {
  content: '';
  width: 120px;
  height: 120px;
  border: 22px solid #DDDDDD;
  border-top-color: #1E90FF;
  border-bottom-color: #1E90FF;
  border-radius: 50%;
  animation: loading 1.5s ease infinite;
}

@keyframes loading {
  to {
    transform: rotate(1turn);
  }
}
</style>
