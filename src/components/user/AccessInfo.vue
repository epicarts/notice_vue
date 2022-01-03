<template>
  <div class="access-info">
    <div class="access-info-title">
      <span>접속일시</span>
    </div>
    <div class="access-info-content">
      <span>{{ this.accessDay }}</span>
      <span>{{ this.accessTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessTime: null,
      accessDay: null,
    };
  },   
  mounted() {
    let today = new Date();
    this.accessTime = `${today.getHours()}:${today.getMinutes()}`
    this.accessDay = `${today.getFullYear()}.${('0' + (today.getMonth() + 1)).slice(-2)}.${('0' + today.getDate()).slice(-2)}`
  },
};
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
