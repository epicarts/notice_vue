<template>
  <div>
    <div v-for="nav in l_navigators"
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
    <h1>Local Nav</h1>
  </div>
</template>
<script>
export default {
  data() {
      return {
          l_navigators: [
      {
        name: '주문목록',
        href: '#'
      },
      {
        name: '주문',
        href: '#'
      },
      {
        name: '피킹',
        href: '#'
      },
      {
        name: '출하검수',
        href: '#'
      },
      {
        name: '출하',
        href: '#'
      },
      {
        name: '공지사항',
        href: '#'
      },
    ]}
  }
}
</script>