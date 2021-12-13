<template>
  <div class="Header-depth-wrapper">
    <div class="depth1">
      <span>입출고 관리</span>
      <img
        src="@/assets/header-header-bullet.svg"
        class="Header-header_bullet"
      />
    </div>
    <div class="depth2">
      <span>공지사항</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.Header-depth-wrapper {
  display: flex;
  align-items: center;
}

.depth1 {
  width: 94px;
  height: 40px;
  margin: 0 14px;
  padding: 9px 0 11px;
  display: flex;
}

.depth1 span {
  font-size: 15px;
  font-weight: bold;
  color: #fff;
}

.depth2 {
    display: flex;
    width: 44px;
    height: 16px;
}

.depth2 span {
  font-size: 12px;
  font-weight: bold;
  color: #53fffd;
}

img.Header-header_bullet {
  width: 4px;
  height: 7px;
  margin: 8px 0 5px 15px;
  object-fit: contain;
}
</style>
