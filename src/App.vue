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
  font-family: "MalgunGothic", "Malgun Gothic", "맑은고딕", 돋움, dotum,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

:root {
  --header-bg-color: #3765a4;
  --black-24-12: rgba(0, 0, 0, 0.12);
  --pale-grey: #e2e6ec;
}

.btn_init {
  position: relative;
  border: none;
  margin: 0;
  text-align: center;
  text-decoration: none;
  background: none;
}

.btn-type4 {
  vertical-align: middle;
  min-width: 32px;
  height: 20px;
  padding: 1px 6px 4px;
  border: solid 1px #b1b5bb;
  background-color: #ffffff;
  font-size: 11px;
  font-weight: bold;
  color: #525c68;
  margin-left: 2px;
  color: var(--slate-grey);
}

.btn-type4:hover {
  height: 20px;
  border: solid 1px #506574;
  background-color: #5d7b92;
  font-size: 11px;
  line-height: 1;
  font-weight: bold;
  letter-spacing: -1px;
  color: #ffffff;
}

.btn-type4:disabled {
  color: #b9bdc2;
  cursor: text;
  border-radius: 2px;
  border: solid 1px #b9bdc2;
  background-color: #e8e8e8;
}

body {
  overflow: hidden;
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

html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}

textarea:focus {
  outline: none;
}

textarea::placeholder {
  color: #999;
}

ol,
ul {
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

.tbl-type {
  width: 100%;
  border: solid 1px #e2e6ec;
  background-color: #ffffff;
  border-collapse: collapse;
}

.tbl-type th {
  width: 120px;
  text-align: center;
  background-color: #f1f5f9;
  font-size: 12px;
  font-weight: bold;
  color: #333333;
  height: 34px;
  border-bottom: solid 1px #e2e6ec;
}

.tbl-type td {
  text-align: left;
  padding: 8px;
  font-size: 12px;
  font-weight: normal;
  color: #333333;
  border: solid 1px #e2e6ec;
  word-break: break-all;
}

.tbl-type a {
  margin-right: 10px;
}

.tbl-type .text-area {
  white-space: pre-wrap;
}
</style>
