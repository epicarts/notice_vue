<template>
  <header>
    <Logo />
    <h1>Header</h1>
  </header>
</template>
<script>
import Logo from './Logo.vue'

export default {
  components: { Logo },
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

.logo {
  margin-left: 10px;
}
</style>