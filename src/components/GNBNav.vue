<template>
  <nav>
    <div v-for="nav in g_navigators"
    :key="nav.name"
    class="nav-item"
    >
    <div
      :to="nav.href"
      active-class="active"
      class="nav-link">
      {{ nav.name }}
    </div>
    </div>
    <h1>Gobal Nav 오스템 / 협력사</h1>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      g_navigators: [
        {
          name: '오스템',
          href: '#'
        },
        {
          name: '협력사',
          href: '#'
        }
      ]
    }
  }
}
</script>