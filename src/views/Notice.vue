<template>
  <div>
    <h1>Notice Page</h1>
    <BaseHeader />
    <GNBNav />
    <LNBNav />
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue'
import GNBNav from '../components/GNBNav.vue'
import LNBNav from '../components/LNBNav.vue'

export default {
  components: { BaseHeader, GNBNav, LNBNav },
  data() {
    return {}
  }
}
</script>

<style scoped>
header {
  height: 70px;
  padding: 0;
}

</style>