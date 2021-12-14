<template>
  <nav class="gnb-nav">
    <ul v-for="nav in g_navigators" :key="nav.name" class="nav-item">
      <li :to="nav.href" active-class="active" class="nav-link Rectangle">
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
        {
          name: "오스템",
          href: "#",
        },
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

.nav-item li:active {
  color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #404854;
  background-color: #677180;
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
</style>
