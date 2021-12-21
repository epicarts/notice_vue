<template>
  <nav class="gnb-nav">
    <ul class="nav-item">
      <li
        v-for="nav in g_navigators"
        :key="nav.name"
        :to="nav.href"
        class="nav-link Rectangle"
        :class="{ active: nav.name == '협력사' }"
      >
        <span>{{ nav.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      g_navigators: [
        // {
        //   name: "오스템",
        //   href: "#",
        // },
        {
          name: "협력사",
          href: "#",
        },
      ],
    };
  },
};
</script>

<style scoped>
.nav-item {
  display: flex;
}

.nav-item li {
  margin-right: 1px;
}

.nav-item span {
  display: block;
  font-size: 13px;
  font-weight: bold;
}

.gnb-nav {
  display: flex;
}

.Rectangle {
  height: 26px;
  padding: 4px 16px 5px;
  border-radius: 4px 4px 0 0;
  background-color: #fff;
  white-space: nowrap;
  box-sizing: border-box;
}

.nav-item li:active, .active {
  color: #fff;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5); */
  border: solid 1px #404854;
  border-bottom: none;
  background-color: #677180;
}
</style>
