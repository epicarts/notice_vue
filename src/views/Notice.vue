<template>
  <div class="notice-warp">
    <GnbNav />
    <div class="gnb-layer">
      <LnbNav />
    </div>
  </div>
</template>

<script>
import GnbNav from "@/components/GnbNav.vue";
import LnbNav from "@/components/LnbNav.vue";

export default {
  components: { GnbNav, LnbNav },
  data() {
    return {};
  },
};
</script>

<style scoped>
.gnb-layer {
  height: 120px;
  margin: 1px 0 0;
  background-color: #e4e8ec;
  min-height: 900px;
  box-shadow: 0 0 6px 0 var(--black-24-12);
}

.notice-warp {
  max-width: 1920px;
  margin: auto;
  padding: 0 8px;
}
</style>
