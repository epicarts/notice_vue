<template>
  <div class="lnb-nav">
    <ul v-for="nav in l_navigators" :key="nav.name" class="nav-item">
      <li :to="nav.href" active-class="active" class="nav-link Rectangle">
        <span> {{ nav.name }} </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      l_navigators: [
        {
          name: "주문목록",
          href: "#",
        },
        {
          name: "주문",
          href: "#",
        },
        {
          name: "피킹",
          href: "#",
        },
        {
          name: "출하검수",
          href: "#",
        },
        {
          name: "출하",
          href: "#",
        },
        {
          name: "공지사항",
          href: "#",
        },
      ],
    };
  },
};
</script>

<style scoped>
.lnb-nav {
  display: flex;
}

.nav-item li {
  margin-right: 1px;
}

.nav-item li:active {
  color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #1359b8;
  background-color: #2f7eec;
}

.nav-item span {
  display: block;
  font-size: 13px;
  font-weight: bold;
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
