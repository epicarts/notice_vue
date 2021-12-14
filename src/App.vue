<template>
  <div>
    <TheHeader />
    <router-view />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: { TheHeader },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: "Malgun Gothic", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  --header-bg-color: #3765a4;
  --black-24-12: rgba(0, 0, 0, 0.12);
}

body {
  background-color: #cad1da;
}

h1 {
  font-size: 15pt;
}

h2 {
  font-size: 14pt;
}

h3 {
  font-size: 13pt;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  letter-spacing: -1px;
}

ol, ul {
  list-style: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

.blind {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
}
</style>
