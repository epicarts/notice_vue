<template>
  <div class="notice-warp">
    <GnbNav />
    <div class="gnb-layer">
      <LnbNav />
      <div class="lnb-layer">
        <!-- 콘텐츠 영역, todo: 별도 컴포넌트 분리 -->
        <div class="content-area">
          <NoticeGrid />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GnbNav from "@/components/GnbNav.vue";
import LnbNav from "@/components/LnbNav.vue";
import NoticeGrid from "@/components/notice/NoticeGrid.vue";

export default {
  components: { GnbNav, LnbNav, NoticeGrid },
  data() {
    return {};
  },
};
</script>

<style scoped>
.gnb-layer {
  margin: 1px 0 0;
  background-color: #e4e8ec;
  box-shadow: 0 0 6px 0 var(--black-24-12);
  padding-top: 6px;
  height: calc(100vh - 85px);
}

.lnb-layer {
  box-shadow: 0 0 6px 0 var(--black-24-12);
  border: solid 2px #6980af;
  background-color: #fff;
  height: 98%;
  overflow-y: auto;
}

.notice-warp {
  min-width: 1024px;
  margin: auto;
  padding: 0 8px;
}
</style>
