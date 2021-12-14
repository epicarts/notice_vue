<template>
  <div class="access-info">
    <div class="access-info-title">
      <span>접속일시</span>
    </div>
    <div class="access-info-content">
      <span>2021.03.31</span>
      <span>13:00</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.access-info {
  display: flex;
}

.access-info-title span {
  font-weight: bold;
  margin: 0 6px;
}

.access-info-content span {
  margin-right: 2px;
}

.access-info span {
  display: inline-block;
  font-size: 12px;
  letter-spacing: -1px;
  color: #111;
  font-size: 12px;
}
</style>
